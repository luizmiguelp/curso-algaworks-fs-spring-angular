"use strict";
exports.__esModule = true;
exports.Login = exports.Lancamento = exports.Categoria = exports.Pessoa = exports.Endereco = void 0;
var Endereco = /** @class */ (function () {
    function Endereco() {
    }
    return Endereco;
}());
exports.Endereco = Endereco;
var Pessoa = /** @class */ (function () {
    function Pessoa() {
        this.endereco = new Endereco();
    }
    return Pessoa;
}());
exports.Pessoa = Pessoa;
;
var Categoria = /** @class */ (function () {
    function Categoria() {
    }
    return Categoria;
}());
exports.Categoria = Categoria;
;
var Lancamento = /** @class */ (function () {
    function Lancamento() {
        this.pessoa = new Pessoa();
        this.categoria = new Categoria();
    }
    return Lancamento;
}());
exports.Lancamento = Lancamento;
;
var Login = /** @class */ (function () {
    function Login() {
    }
    return Login;
}());
exports.Login = Login;
