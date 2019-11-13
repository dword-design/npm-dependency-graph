"use strict";
/*
 * Copyright (C) 2018 TypeFox
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var sprotty_1 = require("sprotty");
var graph_generator_1 = require("./graph-generator");
var graph_model_1 = require("./graph-model");
var graph_filter_1 = require("./graph-filter");
var DepGraphModelSource = /** @class */ (function (_super) {
    __extends(DepGraphModelSource, _super);
    function DepGraphModelSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadIndicator = function () { };
        return _this;
    }
    DepGraphModelSource.prototype.postConstruct = function () {
        this.currentRoot = {
            type: 'graph',
            id: 'npm-dependency-graph',
            children: []
        };
    };
    DepGraphModelSource.prototype.initialize = function (registry) {
        _super.prototype.initialize.call(this, registry);
        registry.register(sprotty_1.SelectAction.KIND, this);
        registry.register(sprotty_1.SelectAllAction.KIND, this);
    };
    DepGraphModelSource.prototype.select = function (elementIds) {
        var _this = this;
        if (elementIds.length > 0) {
            return this.actionDispatcher.dispatch(new sprotty_1.SelectAction(elementIds.filter(function (id) {
                var element = _this.graphGenerator.index.getById(id);
                return graph_model_1.isNode(element) && !element.hidden;
            })));
        }
        else {
            return Promise.resolve();
        }
    };
    DepGraphModelSource.prototype.center = function (elementIds) {
        var _this = this;
        if (elementIds.length > 0) {
            return this.actionDispatcher.dispatch({
                kind: 'fit',
                elementIds: elementIds.filter(function (id) {
                    var element = _this.graphGenerator.index.getById(id);
                    return graph_model_1.isNode(element) && !element.hidden;
                }),
                padding: 20,
                maxZoom: 1,
                animate: true
            });
        }
        else {
            return Promise.resolve();
        }
    };
    DepGraphModelSource.prototype.filter = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var center;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loadIndicator(true);
                        this.graphFilter.setFilter(text);
                        this.graphFilter.refresh(this.graphGenerator);
                        this.actionDispatcher.dispatch(new sprotty_1.SelectAllAction(false));
                        center = this.graphGenerator.nodes.filter(function (n) { return !n.hidden; }).map(function (c) { return c.id; });
                        return [4 /*yield*/, this.updateModel()];
                    case 1:
                        _a.sent();
                        this.loadIndicator(false);
                        this.center(center);
                        return [2 /*return*/];
                }
            });
        });
    };
    DepGraphModelSource.prototype.createNode = function (name, version) {
        return __awaiter(this, void 0, void 0, function () {
            var isNew, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isNew = this.graphGenerator.index.getById(name) === undefined;
                        node = this.graphGenerator.generateNode(name, version);
                        if (!isNew) return [3 /*break*/, 2];
                        this.loadIndicator(true);
                        return [4 /*yield*/, this.updateModel()];
                    case 1:
                        _a.sent();
                        this.loadIndicator(false);
                        _a.label = 2;
                    case 2:
                        this.select([node.id]);
                        return [2 /*return*/];
                }
            });
        });
    };
    DepGraphModelSource.prototype.resolveNodes = function (nodes, toggle) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, center, _i, nodes_1, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (nodes.every(function (n) { return !!n.hidden; })) {
                            this.center(nodes.map(function (n) { return n.id; }));
                            return [2 /*return*/];
                        }
                        this.loadIndicator(true);
                        promises = [];
                        center = [];
                        for (_i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                            node = nodes_1[_i];
                            if (!node.hidden) {
                                try {
                                    if (toggle)
                                        promises.push(this.graphGenerator.toggleResolveNode(node));
                                    else
                                        promises.push(this.graphGenerator.resolveNode(node));
                                }
                                catch (error) {
                                    node.error = error.toString();
                                }
                                center.push(node.id);
                            }
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        this.graphFilter.refresh(this.graphGenerator);
                        return [4 /*yield*/, this.updateModel()];
                    case 2:
                        _a.sent();
                        this.loadIndicator(false);
                        this.center(center);
                        return [2 /*return*/];
                }
            });
        });
    };
    DepGraphModelSource.prototype.resolveGraph = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nodes, _loop_1, this_1, center;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loadIndicator(true);
                        nodes = this.graphGenerator.nodes.filter(function (n) { return !n.hidden && !n.resolved; });
                        _loop_1 = function () {
                            var newNodes, promises, _i, nodes_2, node;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        newNodes = [];
                                        promises = [];
                                        for (_i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
                                            node = nodes_2[_i];
                                            try {
                                                promises.push(this_1.graphGenerator.resolveNode(node).then(function (result) {
                                                    newNodes.push.apply(newNodes, result);
                                                }));
                                            }
                                            catch (error) {
                                                node.error = error.toString();
                                            }
                                        }
                                        return [4 /*yield*/, Promise.all(promises)];
                                    case 1:
                                        _a.sent();
                                        nodes = newNodes;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a.label = 1;
                    case 1:
                        if (!(nodes.length > 0)) return [3 /*break*/, 3];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        this.graphFilter.refresh(this.graphGenerator);
                        center = this.graphGenerator.nodes.filter(function (n) { return !n.hidden; }).map(function (c) { return c.id; });
                        return [4 /*yield*/, this.updateModel()];
                    case 4:
                        _a.sent();
                        this.loadIndicator(false);
                        this.center(center);
                        return [2 /*return*/];
                }
            });
        });
    };
    DepGraphModelSource.prototype.clear = function () {
        var gen = this.graphGenerator;
        gen.nodes.forEach(function (n) { return gen.index.remove(n); });
        gen.nodes.splice(0, gen.nodes.length);
        gen.edges.forEach(function (e) { return gen.index.remove(e); });
        gen.edges.splice(0, gen.edges.length);
        this.graphFilter.setFilter('');
        return this.updateModel();
    };
    DepGraphModelSource.prototype.updateModel = function () {
        var gen = this.graphGenerator;
        var nodes = gen.nodes.filter(function (n) { return !n.hidden; });
        var edges = gen.edges.filter(function (e) {
            var source = gen.index.getById(e.sourceId);
            if (graph_model_1.isNode(source) && source.hidden)
                return false;
            var target = gen.index.getById(e.targetId);
            if (graph_model_1.isNode(target) && target.hidden)
                return false;
            return true;
        });
        this.currentRoot.children = nodes.concat(edges);
        return _super.prototype.updateModel.call(this);
    };
    DepGraphModelSource.prototype.handle = function (action) {
        switch (action.kind) {
            case sprotty_1.SelectAction.KIND:
                this.handleSelect(action);
                break;
            case sprotty_1.SelectAllAction.KIND:
                this.handleSelectAll(action);
                break;
            default:
                _super.prototype.handle.call(this, action);
        }
    };
    DepGraphModelSource.prototype.handleSelect = function (action) {
        var _this = this;
        var nodes = [];
        action.selectedElementsIDs.forEach(function (id) {
            var element = _this.graphGenerator.index.getById(id);
            if (element && element.type === 'node')
                nodes.push(element);
        });
        if (nodes.length > 0) {
            this.resolveNodes(nodes, nodes.length === 1);
        }
    };
    DepGraphModelSource.prototype.handleSelectAll = function (action) {
        if (action.select) {
            var nodes_3 = [];
            this.graphGenerator.index.all().forEach(function (element) {
                if (element.type === 'node')
                    nodes_3.push(element);
            });
            if (nodes_3.length > 0) {
                this.resolveNodes(nodes_3, false);
            }
        }
    };
    __decorate([
        inversify_1.inject(graph_generator_1.IGraphGenerator),
        __metadata("design:type", Object)
    ], DepGraphModelSource.prototype, "graphGenerator", void 0);
    __decorate([
        inversify_1.inject(graph_filter_1.DependencyGraphFilter),
        __metadata("design:type", graph_filter_1.DependencyGraphFilter)
    ], DepGraphModelSource.prototype, "graphFilter", void 0);
    __decorate([
        inversify_1.postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DepGraphModelSource.prototype, "postConstruct", null);
    DepGraphModelSource = __decorate([
        inversify_1.injectable()
    ], DepGraphModelSource);
    return DepGraphModelSource;
}(sprotty_1.LocalModelSource));
exports.DepGraphModelSource = DepGraphModelSource;
//# sourceMappingURL=model-source.js.map