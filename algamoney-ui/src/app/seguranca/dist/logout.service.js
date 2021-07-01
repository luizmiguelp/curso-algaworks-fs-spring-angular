"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LogoutService = void 0;
var environment_1 = require("./../../environments/environment");
var core_1 = require("@angular/core");
var LogoutService = /** @class */ (function () {
    function LogoutService(http, auth) {
        this.http = http;
        this.auth = auth;
        this.tokensRevokeUrl = environment_1.environment.apiUrl + "/tokens/revoke";
    }
    LogoutService.prototype.logout = function () {
        var _this = this;
        return this.http["delete"](this.tokensRevokeUrl, { withCredentials: true })
            .toPromise()
            .then(function () {
            _this.auth.limpartAccessToken();
        });
    };
    LogoutService = __decorate([
        core_1.Injectable()
    ], LogoutService);
    return LogoutService;
}());
exports.LogoutService = LogoutService;
