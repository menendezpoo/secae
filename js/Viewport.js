"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Viewport = (function () {
    function Viewport(canvas) {
        this.canvas = canvas;
        if (!canvas) {
            throw "Invalid canvas";
        }
        this.context = this.canvas.getContext('2d');
    }
    return Viewport;
}());
exports.Viewport = Viewport;
//# sourceMappingURL=Viewport.js.map