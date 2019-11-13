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
var browser_1 = require("@theia/core/lib/browser");
var sprotty_theia_1 = require("sprotty-theia");
var diagram_widget_1 = require("./diagram-widget");
exports.RESOLVE_GRAPH = 'diagram.resolveGraph';
var DepgraphKeybindingContext = /** @class */ (function () {
    function DepgraphKeybindingContext() {
        this.id = 'depgraph-navigator.keybinding.context';
    }
    DepgraphKeybindingContext.prototype.isEnabled = function (arg) {
        var widget = this.shell.currentWidget;
        return widget instanceof diagram_widget_1.DepGraphWidget && widget.diagramType === 'dependency-graph';
    };
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], DepgraphKeybindingContext.prototype, "shell", void 0);
    DepgraphKeybindingContext = __decorate([
        inversify_1.injectable()
    ], DepgraphKeybindingContext);
    return DepgraphKeybindingContext;
}());
exports.DepgraphKeybindingContext = DepgraphKeybindingContext;
var DiagramCommandContribution = /** @class */ (function () {
    function DiagramCommandContribution() {
    }
    DiagramCommandContribution.prototype.registerCommands = function (registry) {
        var _this = this;
        var checkCurrentWidget = function () {
            var widget = _this.shell.currentWidget;
            return widget instanceof diagram_widget_1.DepGraphWidget && widget.diagramType === 'dependency-graph';
        };
        registry.registerCommand({
            id: exports.RESOLVE_GRAPH,
            label: 'Resolve All Dependencies'
        }, {
            execute: function () {
                var widget = _this.shell.currentWidget;
                var modelSource = widget.modelSource;
                modelSource.resolveGraph();
            },
            isEnabled: checkCurrentWidget,
            isVisible: checkCurrentWidget
        });
    };
    DiagramCommandContribution.prototype.registerKeybindings = function (registry) {
        registry.registerKeybinding({
            command: exports.RESOLVE_GRAPH,
            context: this.keybindingContext.id,
            keybinding: 'ctrlcmd+shift+a'
        });
    };
    DiagramCommandContribution.prototype.registerMenus = function (registry) {
        registry.registerMenuAction(sprotty_theia_1.DiagramMenus.DIAGRAM, {
            commandId: exports.RESOLVE_GRAPH
        });
    };
    __decorate([
        inversify_1.inject(browser_1.ApplicationShell),
        __metadata("design:type", browser_1.ApplicationShell)
    ], DiagramCommandContribution.prototype, "shell", void 0);
    __decorate([
        inversify_1.inject(DepgraphKeybindingContext),
        __metadata("design:type", DepgraphKeybindingContext)
    ], DiagramCommandContribution.prototype, "keybindingContext", void 0);
    DiagramCommandContribution = __decorate([
        inversify_1.injectable()
    ], DiagramCommandContribution);
    return DiagramCommandContribution;
}());
exports.DiagramCommandContribution = DiagramCommandContribution;
//# sourceMappingURL=diagram-commands.js.map