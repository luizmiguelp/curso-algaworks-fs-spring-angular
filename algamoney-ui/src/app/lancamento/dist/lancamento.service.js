"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LancamentoService = exports.LancamentoFiltro = void 0;
var environment_1 = require("./../../environments/environment");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var moment = require("moment");
var LancamentoFiltro = /** @class */ (function () {
    function LancamentoFiltro() {
        this.pagina = 0;
        this.itensPorPagina = 5;
    }
    return LancamentoFiltro;
}());
exports.LancamentoFiltro = LancamentoFiltro;
var LancamentoService = /** @class */ (function () {
    function LancamentoService(http) {
        this.http = http;
        this.lancamentoUrl = environment_1.environment.apiUrl + "/lancamentos";
    }
    LancamentoService.prototype.pesquisar = function (filtro) {
        var params = new http_1.URLSearchParams();
        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.itensPorPagina.toString());
        if (filtro.descricao) {
            params.set('descricao', filtro.descricao);
        }
        if (filtro.dataVencimentoInicio) {
            params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
        }
        if (filtro.dataVencimentoFim) {
            params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
        }
        return this.http.get(this.lancamentoUrl + "?resumo", { search: params })
            .toPromise()
            .then(function (response) {
            var responseJson = response.json();
            var lancamentos = responseJson.content;
            var resultado = {
                lancamentos: lancamentos,
                total: responseJson.totalElements
            };
            return resultado;
        });
    };
    LancamentoService.prototype.excluir = function (codigo) {
        return this.http["delete"](this.lancamentoUrl + "/" + codigo)
            .toPromise()
            .then(function () { return null; });
    };
    LancamentoService.prototype.adicionar = function (lancamento) {
        return this.http.post(this.lancamentoUrl, JSON.stringify(lancamento))
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    LancamentoService.prototype.atualizar = function (lancamento) {
        var _this = this;
        var codigo = lancamento.codigo;
        return this.http.put(this.lancamentoUrl + "/" + codigo, JSON.stringify(lancamento))
            .toPromise()
            .then(function (response) {
            var lanc = response.json();
            _this.converterStringsParaData([lanc]);
            return lanc;
        });
    };
    LancamentoService.prototype.buscarPorCodigo = function (codigo) {
        var _this = this;
        return this.http.get(this.lancamentoUrl + "/" + codigo)
            .toPromise()
            .then(function (response) {
            var lancamento = response.json();
            _this.converterStringsParaData([lancamento]);
            return lancamento;
        });
    };
    LancamentoService.prototype.converterStringsParaData = function (lancamento) {
        lancamento.forEach(function (element) {
            if (element.dataPagamento) {
                element.dataPagamento = moment(element.dataPagamento, 'YYYY-MM-DD').toDate();
            }
            if (element.dataVencimento) {
                element.dataVencimento = moment(element.dataVencimento, 'YYYY-MM-DD').toDate();
            }
        });
    };
    LancamentoService = __decorate([
        core_1.Injectable()
    ], LancamentoService);
    return LancamentoService;
}());
exports.LancamentoService = LancamentoService;
