"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SegurancaModule = exports.authHttpServiceFactory = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var button_1 = require("primeng/components/button/button");
var inputtext_1 = require("primeng/components/inputtext/inputtext");
var common_1 = require("@angular/common");
var auth_guard_1 = require("./auth.guard");
var auth_service_1 = require("./auth.service");
var money_http_1 = require("./money-http");
var logout_service_1 = require("./logout.service");
var login_form_component_1 = require("./login-form/login-form.component");
var seguranca_routing_module_1 = require("./seguranca-routing.module");
var angular2_jwt_1 = require("angular2-jwt");
var http_1 = require("@angular/http");
function authHttpServiceFactory(auth, http, option) {
    var config = new angular2_jwt_1.AuthConfig({
        globalHeaders: [
            {
                'Content-Type': 'application/json'
            }
        ]
    });
    return new money_http_1.MoneyHttp(auth, config, http, option);
}
exports.authHttpServiceFactory = authHttpServiceFactory;
var SegurancaModule = /** @class */ (function () {
    function SegurancaModule() {
    }
    SegurancaModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                inputtext_1.InputTextModule,
                button_1.ButtonModule,
                forms_1.FormsModule,
                seguranca_routing_module_1.SegurancaRoutingModule,
            ],
            declarations: [login_form_component_1.LoginFormComponent],
            providers: [
                {
                    provide: angular2_jwt_1.AuthHttp,
                    useFactory: authHttpServiceFactory,
                    deps: [auth_service_1.AuthService, http_1.Http, http_1.RequestOptions]
                },
                auth_guard_1.AuthGuard,
                logout_service_1.LogoutService
            ]
        })
    ], SegurancaModule);
    return SegurancaModule;
}());
exports.SegurancaModule = SegurancaModule;
