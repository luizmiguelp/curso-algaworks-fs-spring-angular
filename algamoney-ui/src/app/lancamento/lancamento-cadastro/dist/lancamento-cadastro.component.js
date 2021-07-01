"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LancamentoCadastroComponent = void 0;
var core_1 = require("@angular/core");
var model_1 = require("./../../core/model");
var LancamentoCadastroComponent = /** @class */ (function () {
    function LancamentoCadastroComponent(categoriaService, pessoasService, lancamentoService, toasty, errorHandler, route, router, title) {
        this.categoriaService = categoriaService;
        this.pessoasService = pessoasService;
        this.lancamentoService = lancamentoService;
        this.toasty = toasty;
        this.errorHandler = errorHandler;
        this.route = route;
        this.router = router;
        this.title = title;
        this.tipos = [
            { label: 'Receita', value: 'RECEITA' },
            { label: 'Despesa', value: 'DESPESA' },
        ];
        this.categorias = [];
        this.pessoas = [];
        this.lancamento = new model_1.Lancamento();
    }
    LancamentoCadastroComponent.prototype.ngOnInit = function () {
        var codigoLancamento = this.route.snapshot.params['codigo'];
        if (codigoLancamento) {
            this.pesquisaLancamentoCodigo(codigoLancamento);
        }
        else {
            this.atualizarTitulo();
        }
        this.carregarCategorias();
        this.carregarPessoas();
    };
    Object.defineProperty(LancamentoCadastroComponent.prototype, "editando", {
        get: function () {
            return Boolean(this.lancamento.codigo);
        },
        enumerable: false,
        configurable: true
    });
    LancamentoCadastroComponent.prototype.pesquisaLancamentoCodigo = function (codigo) {
        var _this = this;
        this.lancamentoService
            .buscarPorCodigo(codigo)
            .then(function (lancamento) {
            _this.lancamento = lancamento;
            _this.atualizarTitulo();
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    LancamentoCadastroComponent.prototype.salvar = function (f) {
        if (this.editando) {
            this.atualizarLancamento(f);
        }
        else {
            this.adicionarLancamento(f);
        }
        this.atualizarTitulo();
    };
    LancamentoCadastroComponent.prototype.atualizarLancamento = function (f) {
        var _this = this;
        this.lancamentoService
            .atualizar(this.lancamento)
            .then(function (lancamento) {
            _this.lancamento = lancamento;
            _this.toasty.success('Lançamento atualizado com sucesso');
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    LancamentoCadastroComponent.prototype.adicionarLancamento = function (f) {
        var _this = this;
        this.lancamentoService
            .adicionar(this.lancamento)
            .then(function (lancamentoAdicionado) {
            _this.toasty.success('Lançamento adicionado com sucesso');
            // f.reset();
            // tslint:disable-next-line: comment-format
            //this.lancamento = new Lancamento();
            _this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    LancamentoCadastroComponent.prototype.carregarCategorias = function () {
        var _this = this;
        return this.categoriaService
            .listarTodas()
            .then(function (categorias) {
            _this.categorias = categorias.map(function (c) { return ({
                label: c.nome,
                value: c.codigo
            }); });
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    LancamentoCadastroComponent.prototype.carregarPessoas = function () {
        var _this = this;
        return this.pessoasService
            .listarTodas()
            .then(function (pessoas) {
            _this.pessoas = pessoas.lista.map(function (p) { return ({
                label: p.nome,
                value: p.codigo
            }); });
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    LancamentoCadastroComponent.prototype.novo = function (f) {
        f.reset();
        setTimeout(function () {
            this.lancamento = new model_1.Lancamento();
        }.bind(this), 1);
        this.router.navigate(['/lancamentos/novo']);
    };
    LancamentoCadastroComponent.prototype.atualizarTitulo = function () {
        if (this.editando) {
            this.title.setTitle("Algamoney - Editando: " + this.lancamento.descricao);
        }
        else {
            this.title.setTitle("Algamoney - Novo Lan\u00E7amento");
        }
    };
    LancamentoCadastroComponent = __decorate([
        core_1.Component({
            selector: 'app-lancamento-cadastro',
            templateUrl: './lancamento-cadastro.component.html',
            styleUrls: ['./lancamento-cadastro.component.css']
        })
    ], LancamentoCadastroComponent);
    return LancamentoCadastroComponent;
}());
exports.LancamentoCadastroComponent = LancamentoCadastroComponent;
