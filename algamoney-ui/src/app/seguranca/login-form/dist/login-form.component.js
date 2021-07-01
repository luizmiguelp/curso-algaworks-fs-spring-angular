"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginFormComponent = void 0;
var core_1 = require("@angular/core");
var LoginFormComponent = /** @class */ (function () {
    function LoginFormComponent(auth, errorHandler, router) {
        this.auth = auth;
        this.errorHandler = errorHandler;
        this.router = router;
    }
    LoginFormComponent.prototype.ngOnInit = function () {
    };
    LoginFormComponent.prototype.login = function (usuario, senha) {
        var _this = this;
        this.auth.login(usuario, senha)
            .then(function () {
            _this.router.navigate(['/lancamentos']);
        })["catch"](function (error) {
            _this.errorHandler.handle(error);
        });
    };
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.css']
        })
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
