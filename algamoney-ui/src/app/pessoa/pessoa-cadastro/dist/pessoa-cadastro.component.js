"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PessoaCadastroComponent = void 0;
var core_1 = require("@angular/core");
var model_1 = require("./../../core/model");
var PessoaCadastroComponent = /** @class */ (function () {
    function PessoaCadastroComponent(pessoaService, toasty, errorHandler, route, router, title) {
        this.pessoaService = pessoaService;
        this.toasty = toasty;
        this.errorHandler = errorHandler;
        this.route = route;
        this.router = router;
        this.title = title;
        this.cidades = [
            { label: 'Curitiba', value: '1' },
            { label: 'São Paulo', value: '2' },
        ];
        this.estados = [
            { label: 'Paraná', value: 'PR' },
            { label: 'São Paulo', value: 'SP' },
        ];
        this.pessoa = new model_1.Pessoa();
    }
    PessoaCadastroComponent.prototype.ngOnInit = function () {
        var codigoPessoa = this.route.snapshot.params['codigo'];
        if (codigoPessoa) {
            this.pesquisaPessoaPorCodigo(codigoPessoa);
        }
        else {
            this.atualizaTitulo();
        }
    };
    Object.defineProperty(PessoaCadastroComponent.prototype, "editando", {
        get: function () {
            return Boolean(this.pessoa.codigo);
        },
        enumerable: false,
        configurable: true
    });
    PessoaCadastroComponent.prototype.atualizaTitulo = function () {
        if (this.editando) {
            this.title.setTitle("Algamoney - Editando: " + this.pessoa.nome);
        }
        else {
            this.title.setTitle("Algamoney - Nova Pessoa");
        }
    };
    PessoaCadastroComponent.prototype.pesquisaPessoaPorCodigo = function (codigo) {
        var _this = this;
        this.pessoaService
            .buscarPorCodigo(codigo)
            .then(function (pessoa) {
            _this.pessoa = pessoa;
            _this.atualizaTitulo();
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    PessoaCadastroComponent.prototype.adicionarPessoa = function (f) {
        var _this = this;
        this.pessoa.ativo = true;
        this.pessoaService
            .adicionar(this.pessoa)
            .then(function (pessoaAdicionada) {
            _this.toasty.success('Lançamento adicionado com sucesso');
            // f.reset();
            // tslint:disable-next-line: comment-format
            //this.pessoa = new Pessoa();
            _this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    PessoaCadastroComponent.prototype.atualizarPessoa = function (f) {
        var _this = this;
        this.pessoaService
            .atualizar(this.pessoa)
            .then(function (pessoa) {
            _this.pessoa = pessoa;
            _this.toasty.success('Pessoa atualizado com sucesso');
        })["catch"](function (erro) { return _this.errorHandler.handle(erro); });
    };
    PessoaCadastroComponent.prototype.salvar = function (f) {
        this.editando ? this.atualizarPessoa(f) : this.adicionarPessoa(f);
        this.atualizaTitulo();
    };
    PessoaCadastroComponent.prototype.nova = function (f) {
        f.reset();
        setTimeout(function () {
            this.Pessoa = new model_1.Pessoa();
        }.bind(this), 1);
        this.router.navigate(['/pessoas/nova']);
    };
    PessoaCadastroComponent = __decorate([
        core_1.Component({
            selector: 'app-pessoa-cadastro',
            templateUrl: './pessoa-cadastro.component.html',
            styleUrls: ['./pessoa-cadastro.component.css']
        })
    ], PessoaCadastroComponent);
    return PessoaCadastroComponent;
}());
exports.PessoaCadastroComponent = PessoaCadastroComponent;
