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
var elk_api_1 = require("elkjs/lib/elk-api");
var elkFactory = function () { return new elk_api_1.default({
    workerUrl: 'elk/elk-worker.min.js',
    algorithms: ['layered']
}); };
exports.default = elkFactory;
//# sourceMappingURL=elk-webworker.js.map