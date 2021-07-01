"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PessoaPesquisaComponent = void 0;
var core_1 = require("@angular/core");
var pessoa_service_1 = require("./../pessoa.service");
var PessoaPesquisaComponent = /** @class */ (function () {
    function PessoaPesquisaComponent(pessoaService, errorHandler, toasty, confirmation, title) {
        this.pessoaService = pessoaService;
        this.errorHandler = errorHandler;
        this.toasty = toasty;
        this.confirmation = confirmation;
        this.title = title;
        this.totalRegistros = 0;
        this.pessoas = [];
        this.filtro = new pessoa_service_1.PessoaFilter();
    }
    // tslint:disable-next-line: use-life-cycle-interface
    PessoaPesquisaComponent.prototype.ngOnInit = function () {
        this.title.setTitle('Algamoney - Pesquisa Pessoas');
    };
    // tslint:disable-next-line: one-line
    PessoaPesquisaComponent.prototype.pesquisar = function (pagina) {
        var _this = this;
        if (pagina === void 0) { pagina = 0; }
        this.filtro.pagina = pagina;
        this.pessoaService.pesquisar(this.filtro)
            .then(function (response) {
            _this.totalRegistros = response.total;
            _this.pessoas = response.pessoas;
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    // tslint:disable-next-line: one-line
    PessoaPesquisaComponent.prototype.aoMudarPagina = function (event) {
        var pagina = event.first / event.rows;
        this.pesquisar(pagina);
    };
    PessoaPesquisaComponent.prototype.confirmarExclusao = function (pessoa) {
        var _this = this;
        this.confirmation.confirm({
            message: 'Confirma a Exclusão ?',
            accept: function () {
                _this.excluir(pessoa);
            }
        });
    };
    PessoaPesquisaComponent.prototype.excluir = function (pessoa) {
        var _this = this;
        this.pessoaService.excluir(pessoa.codigo)
            .then(function () {
            _this.grid.reset();
            _this.toasty.success('Lançamento excluído com sucesso !  ');
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    PessoaPesquisaComponent.prototype.alternarStatus = function (pessoa) {
        var _this = this;
        var novoStatus = !pessoa.ativo;
        this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
            .then(function () {
            var acao = novoStatus ? 'ativada' : 'desativada';
            pessoa.ativo = novoStatus;
            _this.toasty.success("Pessoa " + acao + " com sucesso!");
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    __decorate([
        core_1.ViewChild('tabela')
    ], PessoaPesquisaComponent.prototype, "grid");
    PessoaPesquisaComponent = __decorate([
        core_1.Component({
            selector: 'app-pessoa-pesquisa',
            templateUrl: './pessoa-pesquisa.component.html',
            styleUrls: ['./pessoa-pesquisa.component.css']
        })
    ], PessoaPesquisaComponent);
    return PessoaPesquisaComponent;
}());
exports.PessoaPesquisaComponent = PessoaPesquisaComponent;
