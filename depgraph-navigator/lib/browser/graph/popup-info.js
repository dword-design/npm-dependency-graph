"use strict";
/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var PopupModelProvider = /** @class */ (function () {
    function PopupModelProvider() {
    }
    PopupModelProvider.prototype.getPopupModel = function (request, element) {
        if (element && element.type === 'node') {
            var node = element;
            var titleClass = 'sprotty-popup-title';
            var version = '';
            if (node.version)
                version = "<span class=\"popup-info-version\">" + node.version + "</span>";
            var title = void 0;
            if (node.url)
                title = "<a href=\"" + node.url + "\">" + node.name + "</a>" + version;
            else
                title = "" + node.name + version;
            var bodyClass = 'sprotty-popup-body';
            if (node.error)
                bodyClass += ' error';
            else if (!node.resolved)
                bodyClass += ' unresolved';
            var body = '';
            if (node.error)
                body = escapeHTML(node.error);
            else if (node.description)
                body = escapeHTML(node.description);
            else if (!node.resolved)
                body = 'This package has not been resolved yet. Select it to trigger resolution of package metadata.';
            return {
                type: 'html',
                id: 'popup',
                children: [
                    {
                        type: 'pre-rendered',
                        id: 'popup-title',
                        code: "<div class=\"" + titleClass + "\">" + title + "</div>"
                    },
                    {
                        type: 'pre-rendered',
                        id: 'popup-body',
                        code: "<div class=\"" + bodyClass + "\">" + body + "</div>"
                    }
                ]
            };
        }
        return undefined;
    };
    PopupModelProvider = __decorate([
        inversify_1.injectable()
    ], PopupModelProvider);
    return PopupModelProvider;
}());
exports.PopupModelProvider = PopupModelProvider;
function escapeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
//# sourceMappingURL=popup-info.js.map