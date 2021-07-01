"use strict";
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
exports.__esModule = true;
exports.MoneyHttp = exports.NotAuthenticateError = void 0;
var core_1 = require("@angular/core");
var angular2_jwt_1 = require("angular2-jwt");
var Observable_1 = require("rxjs/Observable");
var NotAuthenticateError = /** @class */ (function () {
    function NotAuthenticateError() {
    }
    return NotAuthenticateError;
}());
exports.NotAuthenticateError = NotAuthenticateError;
var MoneyHttp = /** @class */ (function (_super) {
    __extends(MoneyHttp, _super);
    function MoneyHttp(auth, options, http, defOpts) {
        var _this = _super.call(this, options, http, defOpts) || this;
        _this.auth = auth;
        return _this;
    }
    MoneyHttp.prototype["delete"] = function (url, options) {
        var _this = this;
        return this.fazerRequisicao(function () { return _super.prototype["delete"].call(_this, url, options); });
    };
    MoneyHttp.prototype.patch = function (url, body, options) {
        var _this = this;
        return this.fazerRequisicao(function () { return _super.prototype.patch.call(_this, url, options); });
    };
    MoneyHttp.prototype.head = function (url, options) {
        var _this = this;
        return this.fazerRequisicao(function () { return _super.prototype.head.call(_this, url, options); });
    };
    MoneyHttp.prototype.options = function (url, options) {
        var _this = this;
        return this.fazerRequisicao(function () { return _super.prototype.options.call(_this, url, options); });
    };
    MoneyHttp.prototype.get = function (url, options) {
        var _this = this;
        return this.fazerRequisicao(function () { return _super.prototype.get.call(_this, url, options); });
    };
    MoneyHttp.prototype.post = function (url, body, options) {
        var _this = this;
        return this.fazerRequisicao(function () { return _super.prototype.post.call(_this, url, body, options); });
    };
    MoneyHttp.prototype.put = function (url, body, options) {
        var _this = this;
        return this.fazerRequisicao(function () { return _super.prototype.put.call(_this, url, body, options); });
    };
    MoneyHttp.prototype.fazerRequisicao = function (fn) {
        var _this = this;
        if (this.auth.isAccessTokenInvalid()) {
            console.log('Requisição HTTP com access token inválido. Obtendo novo token...');
            var chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
                .then(function () {
                if (_this.auth.isAccessTokenInvalid()) {
                    throw new NotAuthenticateError();
                }
                return fn().toPromise();
            });
            return Observable_1.Observable.fromPromise(chamadaNovoAccessToken);
        }
        else {
            return fn();
        }
    };
    MoneyHttp = __decorate([
        core_1.Injectable()
    ], MoneyHttp);
    return MoneyHttp;
}(angular2_jwt_1.AuthHttp));
exports.MoneyHttp = MoneyHttp;
