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
var inversify_1 = require("inversify");
var common_1 = require("@theia/core/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var search_box_1 = require("@theia/core/lib/browser/tree/search-box");
var search_box_debounce_1 = require("@theia/core/lib/browser/tree/search-box-debounce");
var sprotty_theia_1 = require("sprotty-theia");
var diagram_config_1 = require("./widget/diagram-config");
var diagram_manager_1 = require("./widget/diagram-manager");
var diagram_commands_1 = require("./widget/diagram-commands");
var diagram_widget_1 = require("./widget/diagram-widget");
require("sprotty/css/sprotty.css");
require("sprotty-theia/css/theia-sprotty.css");
require("../../src/browser/style/depgraph.css");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(sprotty_theia_1.DiagramConfiguration).to(diagram_config_1.DepGraphDiagramConfiguration).inSingletonScope();
    bind(diagram_manager_1.DepGraphDiagramManager).toDynamicValue(function (context) {
        var childContainer = new inversify_1.Container();
        childContainer.parent = context.container;
        childContainer.bind(sprotty_theia_1.DiagramWidgetFactory).toFactory(function (_) {
            return function (options, widgetId, diContainer, connector) {
                return new diagram_widget_1.DepGraphWidget(options, exports.createSearchBox, widgetId, diContainer, connector);
            };
        });
        return childContainer.resolve(diagram_manager_1.DepGraphDiagramManager);
    }).inSingletonScope();
    bind(sprotty_theia_1.DiagramManagerProvider).toProvider(function (context) {
        return function () { return Promise.resolve(context.container.get(diagram_manager_1.DepGraphDiagramManager)); };
    }).whenTargetNamed('dependency-graph');
    bind(browser_1.FrontendApplicationContribution).toService(diagram_manager_1.DepGraphDiagramManager);
    bind(browser_1.OpenHandler).toService(diagram_manager_1.DepGraphDiagramManager);
    bind(browser_1.WidgetFactory).toService(diagram_manager_1.DepGraphDiagramManager);
    bind(diagram_commands_1.DepgraphKeybindingContext).toSelf().inSingletonScope();
    bind(browser_1.KeybindingContext).toService(diagram_commands_1.DepgraphKeybindingContext);
    bind(diagram_commands_1.DiagramCommandContribution).toSelf().inSingletonScope();
    bind(common_1.CommandContribution).toService(diagram_commands_1.DiagramCommandContribution);
    bind(browser_1.KeybindingContribution).toService(diagram_commands_1.DiagramCommandContribution);
    bind(common_1.MenuContribution).toService(diagram_commands_1.DiagramCommandContribution);
});
exports.createSearchBox = function (props) {
    var debounce = new search_box_debounce_1.SearchBoxDebounce({ delay: 300 });
    return new search_box_1.SearchBox(props, debounce);
};
//# sourceMappingURL=frontend-extension.js.map