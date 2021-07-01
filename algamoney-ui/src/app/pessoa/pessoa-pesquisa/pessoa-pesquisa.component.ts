import { Title } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { PessoaFilter, PessoaService } from './../pessoa.service';

import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent {

  totalRegistros = 0;
  pessoas = [];
  filtro = new PessoaFilter();
  @ViewChild('tabela') grid;

  constructor (
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title

    )
    // tslint:disable-next-line: one-line
    {}

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnInit(): void {
    this.title.setTitle('Algamoney - Pesquisa Pessoas');
  }

  // tslint:disable-next-line: one-line
  pesquisar(pagina = 0){
    this.filtro.pagina = pagina

    this.pessoaService.pesquisar(this.filtro)
      .then(response => {
         this.totalRegistros = response.total;
         this.pessoas = response.pessoas;

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  // tslint:disable-next-line: one-line
  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }


  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Confirma a Exclusão ?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }
  excluir(pessoa: any) {

    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.grid.reset();

        this.toasty.success('Lançamento excluído com sucesso !  ');

      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  alternarStatus(pessoa: any): void {

    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}

