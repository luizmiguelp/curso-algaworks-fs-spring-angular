"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PessoaService = exports.PessoaFilter = void 0;
var environment_1 = require("./../../environments/environment");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var PessoaFilter = /** @class */ (function () {
    function PessoaFilter() {
        this.pagina = 0;
        this.itensPorPagina = 5;
    }
    return PessoaFilter;
}());
exports.PessoaFilter = PessoaFilter;
var PessoaService = /** @class */ (function () {
    function PessoaService(http) {
        this.http = http;
        this.pessoaUrl = environment_1.environment.apiUrl + "/pessoas";
    }
    // tslint:disable-next-line: one-line
    PessoaService.prototype.pesquisar = function (filtro) {
        var params = new http_1.URLSearchParams();
        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.itensPorPagina.toString());
        if (filtro.nome) {
            params.set('nome', filtro.nome);
        }
        return this.http.get("" + this.pessoaUrl, { search: params })
            .toPromise()
            .then(function (response) {
            var responseJson = response.json();
            var pessoas = responseJson.content;
            var resultado = {
                pessoas: pessoas,
                total: responseJson.totalElements
            };
            return resultado;
        });
    };
    PessoaService.prototype.listarTodas = function () {
        return this.http.get("" + this.pessoaUrl)
            .toPromise()
            .then(function (response) {
            var responseJson = response.json();
            var lista = responseJson.content;
            var resultado = {
                lista: lista,
                total: responseJson.totalElements
            };
            return resultado;
        });
    };
    // tslint:disable-next-line: one-line
    PessoaService.prototype.excluir = function (codigo) {
        return this.http["delete"](this.pessoaUrl + "/" + codigo)
            .toPromise()
            .then(function () { return null; });
    };
    PessoaService.prototype.mudarStatus = function (codigo, ativo) {
        return this.http.put(this.pessoaUrl + "/" + codigo + "/ativo", ativo)
            .toPromise()
            .then(function () { return null; });
    };
    PessoaService.prototype.adicionar = function (pessoa) {
        return this.http.post(this.pessoaUrl, JSON.stringify(pessoa))
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    PessoaService.prototype.atualizar = function (pessoa) {
        var codigo = pessoa.codigo;
        return this.http.put(this.pessoaUrl + "/" + codigo, JSON.stringify(pessoa))
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    // tslint:disable-next-line: one-line
    PessoaService.prototype.buscarPorCodigo = function (codigo) {
        return this.http.get(this.pessoaUrl + "/" + codigo)
            .toPromise()
            .then(function (response) {
            var pessoa = response.json();
            return pessoa;
        });
    };
    PessoaService = __decorate([
        core_1.Injectable()
    ], PessoaService);
    return PessoaService;
}());
exports.PessoaService = PessoaService;
