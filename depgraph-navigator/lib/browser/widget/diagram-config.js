"use strict";
/*
 * Copyright (C) 2018 TypeFox
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var common_1 = require("@theia/filesystem/lib/common");
var browser_1 = require("@theia/core/lib/browser");
var sprotty_1 = require("sprotty");
var sprotty_theia_1 = require("sprotty-theia");
var sprotty_elk_1 = require("sprotty-elk");
var graph_generator_1 = require("../graph/graph-generator");
var node_modules_1 = require("./node-modules");
var graph_sprotty_config_1 = require("../graph/graph-sprotty-config");
var elk_bundled_1 = require("../graph/elk-bundled");
var DepGraphDiagramConfiguration = /** @class */ (function () {
    function DepGraphDiagramConfiguration() {
        this.diagramType = 'dependency-graph';
    }
    DepGraphDiagramConfiguration.prototype.createContainer = function (widgetId) {
        var _this = this;
        var container = graph_sprotty_config_1.default(function (bind, unbind, isBound, rebind) {
            bind(sprotty_elk_1.ElkFactory).toConstantValue(elk_bundled_1.default);
            rebind(graph_generator_1.IGraphGenerator).to(node_modules_1.NodeModulesGraphGenerator).inSingletonScope();
        });
        container.rebind(sprotty_1.KeyTool).to(sprotty_theia_1.TheiaKeyTool).inSingletonScope();
        sprotty_1.overrideViewerOptions(container, {
            baseDiv: widgetId
        });
        var graphGenerator = container.get(graph_generator_1.IGraphGenerator);
        graphGenerator.fileSystem = this.fileSystem;
        graphGenerator.registryUrl = 'npm-registry';
        var modelSource = container.get(sprotty_1.TYPES.ModelSource);
        modelSource.loadIndicator = function (loading) {
            if (loading) {
                _this.statusBar.setElement(widgetId + '_loadIndicator', {
                    text: 'Loading $(spinner~spin)',
                    tooltip: 'Loading package dependencies...',
                    alignment: browser_1.StatusBarAlignment.RIGHT
                });
            }
            else {
                _this.statusBar.removeElement(widgetId + '_loadIndicator');
            }
        };
        return container;
    };
    __decorate([
        inversify_1.inject(common_1.FileSystem),
        __metadata("design:type", Object)
    ], DepGraphDiagramConfiguration.prototype, "fileSystem", void 0);
    __decorate([
        inversify_1.inject(browser_1.StatusBar),
        __metadata("design:type", Object)
    ], DepGraphDiagramConfiguration.prototype, "statusBar", void 0);
    DepGraphDiagramConfiguration = __decorate([
        inversify_1.injectable()
    ], DepGraphDiagramConfiguration);
    return DepGraphDiagramConfiguration;
}());
exports.DepGraphDiagramConfiguration = DepGraphDiagramConfiguration;
//# sourceMappingURL=diagram-config.js.map