
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ConfirmationService } from 'primeng/components/common/api';

import { Lancamento } from './../../core/model';
import { AuthService } from './../../seguranca/auth.service';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';


@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  lancamentos = [];
  filtro = new LancamentoFiltro();
  @ViewChild("tabela") grid;

  constructor(
    private lancamentosService: LancamentoService,
    private auth: AuthService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Algamoney - Pesquisa de Lançamento');
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentosService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Confirma a Exclusão ?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentosService.excluir(lancamento.codigo)
      .then(() => {
        this.grid.reset();

        this.toasty.success('Pessoa excluída com sucesso !  ');

      })
      .catch(erro => this.errorHandler.handle(erro));
  }



}
