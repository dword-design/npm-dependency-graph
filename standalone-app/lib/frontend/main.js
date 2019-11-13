"use strict";
/*
 * Copyright (C) 2018 TypeFox
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("bootstrap");
require("devbridge-autocomplete");
var jQuery = require("jquery");
var faSpinner = require("@fortawesome/fontawesome-free-solid/faSpinner");
var faExclamationCircle = require("@fortawesome/fontawesome-free-solid/faExclamationCircle");
var faGithub = require("@fortawesome/fontawesome-free-brands/faGithub");
var faBars = require("@fortawesome/fontawesome-free-solid/faBars");
var fontawesome_1 = require("@fortawesome/fontawesome");
var sprotty_1 = require("sprotty");
var sprotty_elk_1 = require("sprotty-elk");
var browser_1 = require("depgraph-navigator/lib/browser");
var elk_webworker_1 = require("depgraph-navigator/lib/browser/graph/elk-webworker");
var axios_1 = require("axios");
var ts_debounce_1 = require("ts-debounce");
fontawesome_1.default.library.add(faSpinner, faExclamationCircle, faGithub, faBars);
jQuery(function () {
    var packageInput = jQuery('#package-input');
    var maintainerInput = jQuery('#maintainer-input');
    var loadingIndicator = jQuery('#loading-indicator');
    var errorIndicator = jQuery('#error-indicator');
    //---------------------------------------------------------
    // Create sprotty container and initialize model source
    var container = browser_1.containerFactory(function (bind, unbind, isBound, rebind) {
        bind(sprotty_elk_1.ElkFactory).toConstantValue(elk_webworker_1.default);
    });
    var modelSource = container.get(sprotty_1.TYPES.ModelSource);
    modelSource.loadIndicator = function (loading) {
        loadingIndicator.css({ visibility: loading ? 'visible' : 'hidden' });
    };
    var createNode = function (name) {
        modelSource.createNode(name);
        jQuery('#sprotty>svg').focus();
    };
    // Configure the npm dependency graph generator to use the local proxy
    container.get(browser_1.IGraphGenerator).registryUrl = 'registry';
    //---------------------------------------------------------
    // Set up the package input field with autocomplete
    var SEARCH_SIZE = 12;
    packageInput.autocomplete({
        serviceUrl: browser_1.REGISTRY_URL + '/-/v1/search',
        paramName: 'text',
        params: { size: SEARCH_SIZE },
        dataType: 'json',
        autoSelectFirst: true,
        triggerSelectOnValidInput: false,
        preventBadQueries: false,
        maxHeight: 500,
        minChars: 2,
        deferRequestBy: 50,
        transformResult: function (response, query) {
            var suggestions = response.objects.map(function (entry) {
                return {
                    value: entry.package.name,
                    data: entry
                };
            });
            return { suggestions: suggestions };
        },
        onSearchComplete: function (query, suggestions) {
            if (suggestions.length === 0)
                setErrorMessage("No package found for search query: " + query);
        },
        onSearchError: function (query, jqXHR, textStatus, errorThrown) {
            if (textStatus !== 'abort') {
                var message = 'Search request to package registry failed';
                if (textStatus)
                    message += " (" + textStatus + ")";
                setErrorMessage(message);
            }
        },
        onSelect: function (suggestion) { return createNode(suggestion.value); }
    });
    packageInput.keyup(function (event) {
        clearErrorMessage();
        // Create a node for the input text even when there are no suggestions
        if (event.keyCode === 13)
            createNode(packageInput.val());
    });
    packageInput.focus();
    //---------------------------------------------------------
    // Maintainer input
    maintainerInput.keyup(ts_debounce_1.debounce(function (_a) {
        var keyCode = _a.keyCode;
        if (keyCode !== 13) {
            var maintainerName = maintainerInput.val();
            axios_1.default.get(browser_1.API_URL + "/search?q=maintainer:" + maintainerName)
                .then(function (_a) {
                var total = _a.data.total;
                maintainerInput.toggleClass('is-valid', total > 0);
                maintainerInput.toggleClass('is-invalid', total === 0);
            });
        }
    }, 200));
    maintainerInput.keyup(function (_a) {
        var keyCode = _a.keyCode;
        var maintainerName = maintainerInput.val();
        if (keyCode === 13) {
            axios_1.default.get(browser_1.API_URL + "/search?q=maintainer:" + maintainerName + "+not:deprecated")
                .then(function (_a) {
                var results = _a.data.results;
                return results.forEach(function (result) { return createNode(result.package.name); });
            });
        }
    });
    maintainerInput.popover({
        trigger: 'hover',
        placement: 'top'
    });
    //---------------------------------------------------------
    // Manage the error indicator icon and its popup box
    var errorMessageTimeout;
    var errorVisible = false;
    var setErrorMessage = function (message) {
        if (errorMessageTimeout)
            window.clearTimeout(errorMessageTimeout);
        errorMessageTimeout = window.setTimeout(function () {
            errorIndicator.attr({ 'data-content': message }).css({ visibility: 'visible' });
            errorVisible = true;
        }, 300);
    };
    var clearErrorMessage = function () {
        if (errorMessageTimeout)
            window.clearTimeout(errorMessageTimeout);
        if (errorVisible) {
            errorIndicator.css({ visibility: 'hidden' });
            errorIndicator.popover('hide');
            errorVisible = false;
        }
    };
    errorIndicator.popover({
        trigger: 'hover',
        placement: 'bottom'
    });
    //---------------------------------------------------------
    // Set up the dependencies filter
    var filterInput = jQuery('#filter-input');
    var lastFilterValue = '';
    var filterTimeout;
    filterInput.keyup(function (event) {
        if (filterTimeout)
            window.clearTimeout(filterTimeout);
        filterTimeout = window.setTimeout(function () {
            var newValue = filterInput.val();
            if (newValue !== lastFilterValue) {
                modelSource.filter(newValue);
                lastFilterValue = newValue;
            }
        }, 300);
    });
    filterInput.popover({
        trigger: 'hover',
        placement: 'top'
    });
    //---------------------------------------------------------
    // Buttons
    jQuery('#sidebar-toggle-button').click(function () { return jQuery('body').toggleClass('sidebar-minimized'); });
    jQuery('#button-clear').click(function (event) {
        modelSource.clear();
        filterInput.val('');
    }).popover({
        trigger: 'hover',
        placement: 'top'
    });
    jQuery('#button-resolve-all').click(function (event) {
        modelSource.resolveGraph();
    }).popover({
        trigger: 'hover',
        placement: 'top'
    });
    //---------------------------------------------------------
    // Layout: position the indicator icons onto the input field
    var updateIndicatorBounds = function () {
        var verticalOffset = 3;
        var horizontalOffset = -12;
        loadingIndicator.offset({
            top: packageInput.offset().top + verticalOffset,
            left: packageInput.offset().left + packageInput.width() + horizontalOffset
        });
        errorIndicator.offset({
            top: packageInput.offset().top + verticalOffset,
            left: packageInput.offset().left + packageInput.width() + horizontalOffset
        });
    };
    jQuery(window).resize(updateIndicatorBounds);
    //---------------------------------------------------------
    // Initialize the layout
    function animationFrames(number) {
        return new Promise(function (resolve) {
            function recurse(n) {
                if (n === 0)
                    resolve();
                else
                    window.requestAnimationFrame(function () { return recurse(n - 1); });
            }
            recurse(number);
        });
    }
    animationFrames(2).then(function () { return updateIndicatorBounds(); });
});
//# sourceMappingURL=main.js.map