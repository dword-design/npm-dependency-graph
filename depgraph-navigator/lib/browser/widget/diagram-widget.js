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
var widgets_1 = require("@phosphor/widgets");
var sprotty_1 = require("sprotty");
var sprotty_theia_1 = require("sprotty-theia");
var promise_util_1 = require("@theia/core/lib/common/promise-util");
var DepGraphWidget = /** @class */ (function (_super) {
    __extends(DepGraphWidget, _super);
    function DepGraphWidget(options, searchBoxFactory, id, diContainer, connector) {
        var _this = _super.call(this, options, id, diContainer, connector) || this;
        _this.attached = new promise_util_1.Deferred();
        _this.searchBox = searchBoxFactory({ delay: 300 });
        _this.toDispose.pushAll([
            _this.searchBox,
            _this.searchBox.onTextChange(function (data) { return (_this.modelSource).filter(data || ''); }),
            _this.searchBox.onClose(function () { return (_this.modelSource).filter(''); })
        ]);
        return _this;
    }
    Object.defineProperty(DepGraphWidget.prototype, "modelSource", {
        get: function () {
            return this.diContainer.get(sprotty_1.TYPES.ModelSource);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepGraphWidget.prototype, "diagramType", {
        get: function () {
            return this.options.diagramType;
        },
        enumerable: true,
        configurable: true
    });
    DepGraphWidget.prototype.onAfterAttach = function (msg) {
        _super.prototype.onAfterAttach.call(this, msg);
        if (this.searchBox.isAttached) {
            widgets_1.Widget.detach(this.searchBox);
        }
        widgets_1.Widget.attach(this.searchBox, this.node.parentElement);
        this.addKeyListener(this.node, this.searchBox.keyCodePredicate.bind(this.searchBox), this.searchBox.handle.bind(this.searchBox));
        this.attached.resolve();
    };
    DepGraphWidget.prototype.onBeforeDetach = function (msg) {
        this.attached = new promise_util_1.Deferred();
        _super.prototype.onBeforeDetach.call(this, msg);
    };
    return DepGraphWidget;
}(sprotty_theia_1.DiagramWidget));
exports.DepGraphWidget = DepGraphWidget;
//# sourceMappingURL=diagram-widget.js.map