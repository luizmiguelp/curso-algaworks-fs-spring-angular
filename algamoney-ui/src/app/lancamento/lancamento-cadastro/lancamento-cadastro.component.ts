import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoa/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];

  pessoas = [];

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.pesquisaLancamentoCodigo(codigoLancamento);
    } else {
      this.atualizarTitulo();
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  pesquisaLancamentoCodigo(codigo: number) {
    this.lancamentoService
      .buscarPorCodigo(codigo)
      .then((lancamento) => {
        this.lancamento = lancamento;
        this.atualizarTitulo();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  salvar(f: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(f);
    } else {
      this.adicionarLancamento(f);
    }
    this.atualizarTitulo();
  }

  atualizarLancamento(f: FormControl) {
    this.lancamentoService
      .atualizar(this.lancamento)
      .then((lancamento) => {
        this.lancamento = lancamento;

        this.toasty.success('Lançamento atualizado com sucesso');
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  adicionarLancamento(f: FormControl) {
    this.lancamentoService
      .adicionar(this.lancamento)
      .then((lancamentoAdicionado) => {
        this.toasty.success('Lançamento adicionado com sucesso');

        // f.reset();
        // tslint:disable-next-line: comment-format
        //this.lancamento = new Lancamento();

        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService
      .listarTodas()
      .then((categorias) => {
        this.categorias = categorias.map((c) => ({
          label: c.nome,
          value: c.codigo,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoasService
      .listarTodas()
      .then((pessoas) => {
        this.pessoas = pessoas.lista.map((p) => ({
          label: p.nome,
          value: p.codigo,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  novo(f: FormControl) {
    f.reset();

    setTimeout(
      function () {
        this.lancamento = new Lancamento();
      }.bind(this),
      1
    );
    this.router.navigate(['/lancamentos/novo']);
  }
  atualizarTitulo() {
    if (this.editando) {
      this.title.setTitle(`Algamoney - Editando: ${this.lancamento.descricao}`);
    } else {
      this.title.setTitle(`Algamoney - Novo Lançamento`);
    }
  }
}
