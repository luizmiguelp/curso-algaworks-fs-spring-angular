import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';

import { Pessoa } from './../../core/model';
import { PessoaService } from './../pessoa.service';

import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
})
export class PessoaCadastroComponent implements OnInit {
  cidades = [
    { label: 'Curitiba', value: '1' },
    { label: 'São Paulo', value: '2' },
  ];

  estados = [
    { label: 'Paraná', value: 'PR' },
    { label: 'São Paulo', value: 'SP' },
  ];

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.pesquisaPessoaPorCodigo(codigoPessoa);
    } else {
      this.atualizaTitulo();
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  atualizaTitulo() {
    if (this.editando) {
      this.title.setTitle(`Algamoney - Editando: ${this.pessoa.nome}`);
    } else {
      this.title.setTitle(`Algamoney - Nova Pessoa`);
    }
  }

  pesquisaPessoaPorCodigo(codigo: number) {
    this.pessoaService
      .buscarPorCodigo(codigo)
      .then((pessoa) => {
        this.pessoa = pessoa;
        this.atualizaTitulo();
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  adicionarPessoa(f: FormControl) {
    this.pessoa.ativo = true;

    this.pessoaService
      .adicionar(this.pessoa)
      .then((pessoaAdicionada) => {
        this.toasty.success('Lançamento adicionado com sucesso');

        // f.reset();
        // tslint:disable-next-line: comment-format
        //this.pessoa = new Pessoa();
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  atualizarPessoa(f: FormControl) {
    this.pessoaService
      .atualizar(this.pessoa)
      .then((pessoa) => {
        this.pessoa = pessoa;

        this.toasty.success('Pessoa atualizado com sucesso');
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  salvar(f: FormControl) {
    this.editando ? this.atualizarPessoa(f) : this.adicionarPessoa(f);

    this.atualizaTitulo();
  }

  nova(f: FormControl) {
    f.reset();

    setTimeout(
      function () {
        this.Pessoa = new Pessoa();
      }.bind(this),
      1
    );
    this.router.navigate(['/pessoas/nova']);
  }
}
