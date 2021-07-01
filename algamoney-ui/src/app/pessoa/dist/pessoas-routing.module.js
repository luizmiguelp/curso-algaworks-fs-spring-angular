"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PessoasRoutingModule = void 0;
var pessoa_cadastro_component_1 = require("./pessoa-cadastro/pessoa-cadastro.component");
var pessoa_pesquisa_component_1 = require("./pessoa-pesquisa/pessoa-pesquisa.component");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var routes = [
    { path: 'pessoas', component: pessoa_pesquisa_component_1.PessoaPesquisaComponent },
    { path: 'pessoas/nova', component: pessoa_cadastro_component_1.PessoaCadastroComponent },
    { path: 'pessoas/:codigo', component: pessoa_cadastro_component_1.PessoaCadastroComponent },
];
var PessoasRoutingModule = /** @class */ (function () {
    function PessoasRoutingModule() {
    }
    PessoasRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes),
            ],
            exports: [router_1.RouterModule]
        })
    ], PessoasRoutingModule);
    return PessoasRoutingModule;
}());
exports.PessoasRoutingModule = PessoasRoutingModule;
