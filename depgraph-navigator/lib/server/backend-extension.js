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
var node_1 = require("@theia/core/lib/node");
var proxy_1 = require("./proxy");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(proxy_1.RegistryProxy).toSelf().inSingletonScope();
    bind(node_1.BackendApplicationContribution).toDynamicValue(function (ctx) { return ctx.container.get(proxy_1.RegistryProxy); }).inSingletonScope();
});
//# sourceMappingURL=backend-extension.js.map