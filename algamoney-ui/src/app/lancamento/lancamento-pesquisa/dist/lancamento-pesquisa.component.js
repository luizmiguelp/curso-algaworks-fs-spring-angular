"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LancamentoPesquisaComponent = void 0;
var core_1 = require("@angular/core");
var lancamento_service_1 = require("../lancamento.service");
var LancamentoPesquisaComponent = /** @class */ (function () {
    function LancamentoPesquisaComponent(lancamentosService, auth, toasty, errorHandler, confirmation, title) {
        this.lancamentosService = lancamentosService;
        this.auth = auth;
        this.toasty = toasty;
        this.errorHandler = errorHandler;
        this.confirmation = confirmation;
        this.title = title;
        this.totalRegistros = 0;
        this.lancamentos = [];
        this.filtro = new lancamento_service_1.LancamentoFiltro();
    }
    LancamentoPesquisaComponent.prototype.ngOnInit = function () {
        this.title.setTitle('Algamoney - Pesquisa de Lançamento');
    };
    LancamentoPesquisaComponent.prototype.pesquisar = function (pagina) {
        var _this = this;
        if (pagina === void 0) { pagina = 0; }
        this.filtro.pagina = pagina;
        this.lancamentosService.pesquisar(this.filtro)
            .then(function (resultado) {
            _this.totalRegistros = resultado.total;
            _this.lancamentos = resultado.lancamentos;
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    LancamentoPesquisaComponent.prototype.aoMudarPagina = function (event) {
        var pagina = event.first / event.rows;
        this.pesquisar(pagina);
    };
    LancamentoPesquisaComponent.prototype.confirmarExclusao = function (lancamento) {
        var _this = this;
        this.confirmation.confirm({
            message: 'Confirma a Exclusão ?',
            accept: function () {
                _this.excluir(lancamento);
            }
        });
    };
    LancamentoPesquisaComponent.prototype.excluir = function (lancamento) {
        var _this = this;
        this.lancamentosService.excluir(lancamento.codigo)
            .then(function () {
            _this.grid.reset();
            _this.toasty.success('Pessoa excluída com sucesso !  ');
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    __decorate([
        core_1.ViewChild("tabela")
    ], LancamentoPesquisaComponent.prototype, "grid");
    LancamentoPesquisaComponent = __decorate([
        core_1.Component({
            selector: 'app-lancamento-pesquisa',
            templateUrl: './lancamento-pesquisa.component.html',
            styleUrls: ['./lancamento-pesquisa.component.css']
        })
    ], LancamentoPesquisaComponent);
    return LancamentoPesquisaComponent;
}());
exports.LancamentoPesquisaComponent = LancamentoPesquisaComponent;
