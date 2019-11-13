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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var semver_1 = require("semver");
var sprotty_1 = require("sprotty");
exports.REGISTRY_URL = 'https://registry.npmjs.org';
exports.API_URL = 'https://api.npms.io/v2';
exports.WEBSITE_URL = 'https://www.npmjs.com';
var NpmDependencyGraphGenerator = /** @class */ (function () {
    function NpmDependencyGraphGenerator() {
        this.registryUrl = exports.REGISTRY_URL;
        this.websiteUrl = exports.WEBSITE_URL;
        this.nodes = [];
        this.edges = [];
        this.index = new sprotty_1.SModelIndex();
    }
    NpmDependencyGraphGenerator.prototype.generateNode = function (name, requiredVersion) {
        var node = this.index.getById(name);
        if (node === undefined) {
            node = this.createNode(name);
            this.nodes.push(node);
            this.index.add(node);
        }
        if (requiredVersion && node.requiredVersions.indexOf(requiredVersion) < 0) {
            node.requiredVersions.push(requiredVersion);
        }
        return node;
    };
    NpmDependencyGraphGenerator.prototype.createNode = function (name) {
        return {
            type: 'node',
            id: name,
            name: name,
            requiredVersions: [],
            layout: 'vbox',
            children: [
                {
                    type: 'label',
                    id: name + "/label",
                    text: name
                }
            ]
        };
    };
    NpmDependencyGraphGenerator.prototype.toggleResolveNode = function (node) {
        if (node.resolved) {
            this.unresolveNode(node);
            return Promise.resolve([]);
        }
        else {
            return this.resolveNode(node);
        }
    };
    NpmDependencyGraphGenerator.prototype.unresolveNode = function (node) {
        var _this = this;
        var removeEdges = function (nodeId) {
            _this.edges
                .filter(function (_a) {
                var sourceId = _a.sourceId;
                return sourceId === nodeId;
            })
                .map(function (_a) {
                var targetId = _a.targetId;
                return targetId;
            })
                .forEach(removeEdges);
            for (var i = 0; i < _this.edges.length;) {
                if (_this.edges[i].sourceId === nodeId) {
                    _this.index.remove(_this.edges[i]);
                    _this.edges.splice(i, 1);
                }
                else {
                    ++i;
                }
            }
        };
        removeEdges(node.id);
        var nodeIdsWithEdges = __spreadArrays(this.edges.map(function (_a) {
            var sourceId = _a.sourceId;
            return sourceId;
        }), this.edges.map(function (_a) {
            var targetId = _a.targetId;
            return targetId;
        }));
        for (var i = 0; i < this.nodes.length;) {
            if (!nodeIdsWithEdges.includes(this.nodes[i].id)) {
                this.index.remove(this.nodes[i]);
                this.nodes.splice(i, 1);
            }
            else {
                ++i;
            }
        }
        node.resolved = false;
    };
    NpmDependencyGraphGenerator.prototype.resolveNode = function (node) {
        var _this = this;
        return this.getMetadata(node).then(function (versionData) {
            var result = [];
            if (versionData) {
                node.version = versionData.version;
                node.description = versionData.description;
                node.url = _this.websiteUrl + "/package/" + node.name;
                if (versionData.dependencies)
                    result.push.apply(result, _this.addDependencies(node, versionData.dependencies));
                if (versionData.optionalDependencies)
                    result.push.apply(result, _this.addDependencies(node, versionData.optionalDependencies, true));
                if (versionData.peerDependencies)
                    result.push.apply(result, _this.addDependencies(node, versionData.peerDependencies, true));
                node.resolved = true;
            }
            return result;
        });
    };
    NpmDependencyGraphGenerator.prototype.getMetadata = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var nameUrlComponent, path, data, versionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nameUrlComponent = node.name.replace(/\//g, '%2F');
                        path = this.registryUrl + "/" + nameUrlComponent;
                        return [4 /*yield*/, this.request(path)];
                    case 1:
                        data = _a.sent();
                        versionData = this.findVersion(node, data);
                        if (versionData)
                            return [2 /*return*/, versionData];
                        else
                            return [2 /*return*/, Promise.reject(new Error("No matching versions found for " + node.name + ": " + node.requiredVersions))];
                        return [2 /*return*/];
                }
            });
        });
    };
    NpmDependencyGraphGenerator.prototype.request = function (url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            var errorHandler = function () {
                var message = "Could not load package metadata from " + url;
                if (xhr.statusText)
                    message += " (" + xhr.statusText + ")";
                reject(new Error(message));
            };
            xhr.addEventListener('load', function () {
                if (xhr.status === 200)
                    resolve(JSON.parse(xhr.responseText));
                else
                    errorHandler();
            });
            xhr.addEventListener('error', errorHandler);
            xhr.send();
        });
    };
    NpmDependencyGraphGenerator.prototype.findVersion = function (node, data) {
        for (var i = 0; i < node.requiredVersions.length; i++) {
            var match = semver_1.maxSatisfying(Object.keys(data.versions), node.requiredVersions[i]);
            if (match)
                return data.versions[match];
        }
        var latest = data['dist-tags']['latest'];
        if (latest)
            return data.versions[latest];
        return undefined;
    };
    NpmDependencyGraphGenerator.prototype.addDependencies = function (node, dependencies, optional) {
        var targetNodes = [];
        for (var dep in dependencies) {
            var depNode = this.generateNode(dep, dependencies[dep]);
            var depEdge = {
                type: 'edge',
                id: "dependency:" + node.name + ">" + dep,
                optional: optional,
                sourceId: node.id,
                targetId: depNode.id,
                children: [
                    {
                        type: 'label',
                        id: "dependency_version:" + node.name + ">" + dep,
                        text: dependencies[dep],
                        edgePlacement: {
                            position: 1,
                            offset: 4,
                            side: 'bottom',
                            rotate: true
                        }
                    }
                ]
            };
            if (!this.index.contains(depEdge)) {
                this.edges.push(depEdge);
                this.index.add(depEdge);
                targetNodes.push(depNode);
            }
        }
        return targetNodes;
    };
    NpmDependencyGraphGenerator = __decorate([
        inversify_1.injectable()
    ], NpmDependencyGraphGenerator);
    return NpmDependencyGraphGenerator;
}());
exports.NpmDependencyGraphGenerator = NpmDependencyGraphGenerator;
//# sourceMappingURL=npm-dependencies.js.map