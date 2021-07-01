"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CoreModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var ng2_toasty_1 = require("ng2-toasty");
var confirmdialog_1 = require("primeng/components/confirmdialog/confirmdialog");
var api_1 = require("primeng/components/common/api");
var auth_service_1 = require("./../seguranca/auth.service");
var navbar_component_1 = require("./navbar/navbar.component");
var pessoa_service_1 = require("./../pessoa/pessoa.service");
var lancamento_service_1 = require("./../lancamento/lancamento.service");
var error_handler_service_1 = require("./error-handler.service");
var categoria_service_1 = require("./../categoria/categoria.service");
var pagina_nao_encontrada_component_1 = require("./pagina-nao-encontrada.component");
var angular2_jwt_1 = require("angular2-jwt");
var nao_autorizado_component_1 = require("./nao-autorizado.component");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                ng2_toasty_1.ToastyModule.forRoot(),
                confirmdialog_1.ConfirmDialogModule,
            ],
            declarations: [navbar_component_1.NavbarComponent, pagina_nao_encontrada_component_1.PaginaNaoEncontradaComponent, nao_autorizado_component_1.NaoAutorizadoComponent],
            exports: [
                navbar_component_1.NavbarComponent,
                ng2_toasty_1.ToastyModule,
                confirmdialog_1.ConfirmDialogModule,
            ],
            providers: [
                lancamento_service_1.LancamentoService,
                pessoa_service_1.PessoaService,
                categoria_service_1.CategoriaService,
                auth_service_1.AuthService,
                platform_browser_1.Title,
                api_1.ConfirmationService,
                angular2_jwt_1.JwtHelper,
                error_handler_service_1.ErrorHandlerService,
                { provide: core_1.LOCALE_ID, useValue: 'pt-BR' }
            ]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
