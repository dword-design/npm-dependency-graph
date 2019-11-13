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
var http = require("http");
var express = require("express");
//---------------------------------------------------------
// Set up static resources from the app directory
var app = express();
app.use(express.static('app'));
//---------------------------------------------------------
// Set up a proxy to the npm registry to avoid CORS
app.get('/registry/*', function (inReq, inRes) {
    var outReq = http.request({ host: 'registry.npmjs.org', path: getPath(inReq) }, function (outRes) {
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
var getPath = function (request) {
    var path = request.path.substring('/registry'.length);
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
//---------------------------------------------------------
// Start the server
var port = 3001;
app.listen(port, function () { return console.log("Server listening on port " + port + "."); });
//# sourceMappingURL=server.js.map