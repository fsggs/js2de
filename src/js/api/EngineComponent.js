if (global === undefined) var global = window || this;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('api/EngineComponent', ['api/PrototypeObject', 'api/interfaces/IEngineComponent'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(require('api/PrototypeObject'), require('api/interfaces/IEngineComponent'));
    } else {
        factory(root.j2d.api.PrototypeObject, root.j2d.api.interfaces.IEngineComponent);
    }
}(typeof window !== 'undefined' ? window : global, function (PrototypeObject, IEngineComponent) {
    "use strict";

    /**
     * EngineComponent
     * @constructor
     */
    var EngineComponent = function () {
    };

    EngineComponent.prototype = Object.create(PrototypeObject.prototype);
    EngineComponent.prototype.constructor = EngineComponent;

    EngineComponent.interfaces = [IEngineComponent];

    if (typeof module === 'object' && typeof module.exports === 'object') module.exports.EngineComponent = EngineComponent;
    if (global.j2d !== undefined) global.j2d.api.EngineComponent = EngineComponent;
    return EngineComponent;
}));