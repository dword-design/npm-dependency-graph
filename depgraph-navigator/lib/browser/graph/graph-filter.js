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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var graph_model_1 = require("./graph-model");
var DependencyGraphFilter = /** @class */ (function () {
    function DependencyGraphFilter() {
        this.nameFilter = function (node) { return true; };
    }
    DependencyGraphFilter.prototype.setFilter = function (text) {
        var textTrim = text.trim();
        if (textTrim.length === 0)
            this.nameFilter = function (name) { return true; };
        else if (text.startsWith(' ') && text.endsWith(' '))
            this.nameFilter = function (name) { return name === textTrim; };
        else if (text.startsWith(' '))
            this.nameFilter = function (name) { return name.startsWith(textTrim); };
        else if (text.endsWith(' '))
            this.nameFilter = function (name) { return name.endsWith(textTrim); };
        else
            this.nameFilter = function (name) { return name.indexOf(textTrim) >= 0; };
    };
    DependencyGraphFilter.prototype.refresh = function (generator) {
        var nodeCount = 0;
        var visibleCount = 0;
        // Count the nodes and apply the name filter
        for (var _i = 0, _a = generator.nodes; _i < _a.length; _i++) {
            var node = _a[_i];
            var visible = this.nameFilter(node.name);
            node.hidden = !visible;
            nodeCount++;
            if (visible)
                visibleCount++;
        }
        if (visibleCount === nodeCount)
            return;
        // Construct a map of incoming edges
        var incoming = this.createIncomingMap(generator.edges, generator.index);
        var dfsMark = {};
        // Perform a depth-first-search to find the nodes from which the name-filtered nodes are reachable
        for (var _b = 0, _c = generator.nodes; _b < _c.length; _b++) {
            var node = _c[_b];
            if (!node.hidden) {
                this.dfs(node, incoming, dfsMark, generator.index);
            }
        }
    };
    DependencyGraphFilter.prototype.createIncomingMap = function (edges, index) {
        var incoming = new Map();
        for (var _i = 0, edges_1 = edges; _i < edges_1.length; _i++) {
            var edge = edges_1[_i];
            var target = index.getById(edge.targetId);
            if (graph_model_1.isNode(target)) {
                var arr = incoming.get(target);
                if (arr) {
                    arr.push(edge);
                }
                else {
                    arr = [edge];
                    incoming.set(target, arr);
                }
            }
        }
        return incoming;
    };
    DependencyGraphFilter.prototype.dfs = function (node, incoming, mark, index) {
        if (mark[node.id])
            return;
        mark[node.id] = true;
        for (var _i = 0, _a = incoming.get(node) || []; _i < _a.length; _i++) {
            var edge = _a[_i];
            var source = index.getById(edge.sourceId);
            if (graph_model_1.isNode(source)) {
                source.hidden = false;
                this.dfs(source, incoming, mark, index);
            }
        }
    };
    DependencyGraphFilter = __decorate([
        inversify_1.injectable()
    ], DependencyGraphFilter);
    return DependencyGraphFilter;
}());
exports.DependencyGraphFilter = DependencyGraphFilter;
//# sourceMappingURL=graph-filter.js.map