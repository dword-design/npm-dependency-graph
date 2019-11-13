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
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var h_1 = require("snabbdom/h");
var sprotty_1 = require("sprotty");
var DependencyNodeView = /** @class */ (function () {
    function DependencyNodeView() {
        this.cornerRadius = 5;
    }
    DependencyNodeView.prototype.render = function (node, context) {
        var _a;
        var vnode = h_1.h('g', [
            h_1.h('rect.sprotty-node', {
                class: {
                    mouseover: node.hoverFeedback,
                    selected: node.selected,
                    resolved: node.resolved,
                    error: node.error !== undefined
                },
                attrs: {
                    x: '0', y: '0',
                    rx: this.cornerRadius, ry: this.cornerRadius,
                    width: Math.max(node.size.width, 0), height: Math.max(node.size.height, 0)
                }
            })
        ]);
        (_a = vnode.children).push.apply(_a, context.renderChildren(node));
        addNS(vnode);
        return vnode;
    };
    DependencyNodeView = __decorate([
        inversify_1.injectable()
    ], DependencyNodeView);
    return DependencyNodeView;
}());
exports.DependencyNodeView = DependencyNodeView;
var DependencyEdgeView = /** @class */ (function (_super) {
    __extends(DependencyEdgeView, _super);
    function DependencyEdgeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.arrowLength = 10;
        _this.arrowWidth = 8;
        return _this;
    }
    DependencyEdgeView.prototype.render = function (edge, context) {
        var _a, _b;
        var router = this.edgeRouterRegistry.get(edge.routerKind);
        var route = router.route(edge);
        if (route.length === 0)
            return this.renderDanglingEdge('Cannot compute route', edge, context);
        var vnode = h_1.h('g.sprotty-edge', {
            class: {
                mouseover: edge.hoverFeedback,
                optional: edge.optional
            }
        }, [
            this.renderLine(edge, route, context)
        ]);
        (_a = vnode.children).push.apply(_a, this.renderAdditionals(edge, route, context));
        (_b = vnode.children).push.apply(_b, context.renderChildren(edge, { route: route }));
        addNS(vnode);
        return vnode;
    };
    DependencyEdgeView.prototype.renderAdditionals = function (edge, segments, context) {
        var p2 = segments[segments.length - 1];
        var p1;
        var index = segments.length - 2;
        do {
            p1 = segments[index];
            index--;
        } while (index >= 0 && sprotty_1.maxDistance(p1, p2) < this.arrowLength);
        var vnode = h_1.h('path.arrow', {
            attrs: {
                d: "M -1.5,0 L " + this.arrowLength + ",-" + this.arrowWidth / 2 + " L " + this.arrowLength + "," + this.arrowWidth / 2 + " Z",
                transform: "rotate(" + sprotty_1.toDegrees(sprotty_1.angleOfPoint({ x: p1.x - p2.x, y: p1.y - p2.y })) + " " + p2.x + " " + p2.y + ") translate(" + p2.x + " " + p2.y + ")"
            }
        });
        return [vnode];
    };
    DependencyEdgeView = __decorate([
        inversify_1.injectable()
    ], DependencyEdgeView);
    return DependencyEdgeView;
}(sprotty_1.PolylineEdgeView));
exports.DependencyEdgeView = DependencyEdgeView;
function addNS(vnode) {
    if (vnode.data === undefined) {
        vnode.data = {};
    }
    vnode.data.ns = 'http://www.w3.org/2000/svg';
    if (vnode.children !== undefined) {
        for (var i = 0; i < vnode.children.length; i++) {
            var child = vnode.children[i];
            if (typeof child === 'object') {
                addNS(child);
            }
        }
    }
}
//# sourceMappingURL=graph-views.js.map