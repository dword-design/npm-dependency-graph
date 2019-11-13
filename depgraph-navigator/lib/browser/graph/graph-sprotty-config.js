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
var sprotty_1 = require("sprotty");
var sprotty_elk_1 = require("sprotty-elk");
var graph_model_1 = require("./graph-model");
var graph_generator_1 = require("./graph-generator");
var model_source_1 = require("./model-source");
var npm_dependencies_1 = require("./npm-dependencies");
var graph_views_1 = require("./graph-views");
var popup_info_1 = require("./popup-info");
var graph_layout_1 = require("./graph-layout");
var graph_filter_1 = require("./graph-filter");
exports.default = (function (additionalBindings) {
    var depGraphModule = new inversify_1.ContainerModule(function (bind, unbind, isBound, rebind) {
        bind(graph_filter_1.DependencyGraphFilter).toSelf();
        bind(graph_generator_1.IGraphGenerator).to(npm_dependencies_1.NpmDependencyGraphGenerator).inSingletonScope();
        bind(sprotty_1.TYPES.ModelSource).to(model_source_1.DepGraphModelSource).inSingletonScope();
        rebind(sprotty_elk_1.ILayoutConfigurator).to(graph_layout_1.DepGraphLayoutConfigurator);
        bind(sprotty_1.TYPES.IPopupModelProvider).to(popup_info_1.PopupModelProvider);
        rebind(sprotty_1.TYPES.ILogger).to(sprotty_1.ConsoleLogger).inSingletonScope();
        rebind(sprotty_1.TYPES.LogLevel).toConstantValue(sprotty_1.LogLevel.warn);
        rebind(sprotty_1.TYPES.IModelFactory).to(sprotty_1.SGraphFactory).inSingletonScope();
        var context = { bind: bind, unbind: unbind, isBound: isBound, rebind: rebind };
        sprotty_1.configureModelElement(context, 'graph', sprotty_1.SGraph, sprotty_1.SGraphView);
        sprotty_1.configureModelElement(context, 'node', graph_model_1.DependencyGraphNode, graph_views_1.DependencyNodeView, {
            disable: [sprotty_1.moveFeature]
        });
        sprotty_1.configureModelElement(context, 'edge', graph_model_1.DependencyGraphEdge, graph_views_1.DependencyEdgeView, {
            disable: [sprotty_1.editFeature]
        });
        sprotty_1.configureModelElement(context, 'label', sprotty_1.SLabel, sprotty_1.SLabelView);
        sprotty_1.configureModelElement(context, 'compartment', sprotty_1.SCompartment, sprotty_1.SCompartmentView);
        sprotty_1.configureModelElement(context, 'html', sprotty_1.HtmlRoot, sprotty_1.HtmlRootView);
        sprotty_1.configureModelElement(context, 'pre-rendered', sprotty_1.PreRenderedElement, sprotty_1.PreRenderedView);
        if (additionalBindings) {
            additionalBindings(bind, unbind, isBound, rebind);
        }
    });
    var container = new inversify_1.Container();
    sprotty_1.loadDefaultModules(container);
    container.load(sprotty_elk_1.elkLayoutModule, depGraphModule);
    return container;
});
//# sourceMappingURL=graph-sprotty-config.js.map