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
Object.defineProperty(exports, "__esModule", { value: true });
var sprotty_1 = require("sprotty");
function isNode(element) {
    return element !== undefined && element.type === 'node';
}
exports.isNode = isNode;
var DependencyGraphNode = /** @class */ (function (_super) {
    __extends(DependencyGraphNode, _super);
    function DependencyGraphNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '';
        _this.versions = [];
        _this.resolved = false;
        _this.hidden = false;
        return _this;
    }
    return DependencyGraphNode;
}(sprotty_1.RectangularNode));
exports.DependencyGraphNode = DependencyGraphNode;
function isEdge(element) {
    return element !== undefined && element.type === 'edge';
}
exports.isEdge = isEdge;
var DependencyGraphEdge = /** @class */ (function (_super) {
    __extends(DependencyGraphEdge, _super);
    function DependencyGraphEdge() {
        var _this = _super.call(this) || this;
        _this.optional = false;
        _this.sourceAnchorCorrection = 1;
        _this.targetAnchorCorrection = 1.5;
        return _this;
    }
    return DependencyGraphEdge;
}(sprotty_1.SEdge));
exports.DependencyGraphEdge = DependencyGraphEdge;
//# sourceMappingURL=graph-model.js.map