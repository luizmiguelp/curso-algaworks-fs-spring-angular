"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var environment_1 = require("./../../environments/environment");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var AuthService = /** @class */ (function () {
    function AuthService(http, jwtHelper) {
        this.http = http;
        this.jwtHelper = jwtHelper;
        this.oauthTokenUrl = environment_1.environment.apiUrl + "/oauth/token";
        this.carregarToken();
    }
    AuthService.prototype.login = function (usuario, senha) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
        var body = "username=" + usuario + "&password=" + senha + "&grant_type=password";
        return this.http.post(this.oauthTokenUrl, body, { headers: headers })
            .toPromise()
            .then(function (response) {
            _this.armazenarToken(response.json().access_token);
        })["catch"](function (response) {
            if (response.status === 400) {
                var responseJson = response.json();
                if (responseJson.error === 'invalid_grant') {
                    return Promise.reject('Usuário ou senha inválidos!');
                }
            }
            return Promise.reject(response);
        });
    };
    AuthService.prototype.obterNovoAccessToken = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
        var body = 'grant_type=refresh_token';
        return this.http.post(this.oauthTokenUrl, body, { headers: headers, withCredentials: true })
            .toPromise()
            .then(function (response) {
            _this.armazenarToken(response.json().access_token);
            return Promise.resolve(null);
        })["catch"](function (response) {
            return Promise.resolve(null);
        });
    };
    AuthService.prototype.limpartAccessToken = function () {
        localStorage.removeItem('token');
        this.jwtPayload = null;
    };
    AuthService.prototype.isAccessTokenInvalid = function () {
        var token = localStorage.getItem('token');
        return !token || this.jwtHelper.isTokenExpired(token);
    };
    AuthService.prototype.temPermissao = function (permissao) {
        return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
    };
    AuthService.prototype.temQualquerPermissao = function (roles) {
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var role = roles_1[_i];
            if (this.temPermissao(role)) {
                return true;
            }
        }
        return false;
    };
    AuthService.prototype.armazenarToken = function (token) {
        this.jwtPayload = this.jwtHelper.decodeToken(token);
        localStorage.setItem('token', token);
    };
    AuthService.prototype.carregarToken = function () {
        var token = localStorage.getItem('token');
        if (token) {
            this.armazenarToken(token);
        }
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
