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
var sprotty_elk_1 = require("sprotty-elk");
var DepGraphLayoutConfigurator = /** @class */ (function (_super) {
    __extends(DepGraphLayoutConfigurator, _super);
    function DepGraphLayoutConfigurator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DepGraphLayoutConfigurator.prototype.graphOptions = function (sgraph, index) {
        return {
            'elk.algorithm': 'layered',
            'elk.direction': 'LEFT',
            'elk.edgeRouting': 'POLYLINE'
        };
    };
    DepGraphLayoutConfigurator = __decorate([
        inversify_1.injectable()
    ], DepGraphLayoutConfigurator);
    return DepGraphLayoutConfigurator;
}(sprotty_elk_1.DefaultLayoutConfigurator));
exports.DepGraphLayoutConfigurator = DepGraphLayoutConfigurator;
//# sourceMappingURL=graph-layout.js.map