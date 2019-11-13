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
var http = require("http");
var inversify_1 = require("inversify");
var RegistryProxy = /** @class */ (function () {
    function RegistryProxy() {
        this.registryPath = 'npm-registry';
    }
    /**
     * Set up a proxy to the npm registry to avoid CORS.
     */
    RegistryProxy.prototype.configure = function (app) {
        var _this = this;
        app.get("/" + this.registryPath + "/*", function (inReq, inRes) {
            var outReq = http.request({ host: 'registry.npmjs.org', path: _this.getPath(inReq) }, function (outRes) {
                inRes.contentType(outRes.headers['content-type'] || 'application/json');
                inRes.status(outRes.statusCode || 200);
                outRes.on('data', function (chunk) {
                    inRes.write(chunk);
                });
                outRes.on('end', function () {
                    inRes.end();
                });
            });
            outReq.on('error', function (error) {
                inRes.status(500).send(error.toString());
            });
            outReq.end();
        });
    };
    RegistryProxy.prototype.getPath = function (request) {
        var path = request.path.substring(this.registryPath.length + 1);
        var paramCount = 0;
        for (var param in request.query) {
            if (paramCount === 0)
                path += '?';
            else
                path += '&';
            path += encodeURIComponent(param) + '=' + encodeURIComponent(request.query[param]);
            paramCount++;
        }
        return path;
    };
    RegistryProxy = __decorate([
        inversify_1.injectable()
    ], RegistryProxy);
    return RegistryProxy;
}());
exports.RegistryProxy = RegistryProxy;
//# sourceMappingURL=proxy.js.map