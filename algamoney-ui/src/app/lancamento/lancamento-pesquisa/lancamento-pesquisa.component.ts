import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {
  lancamentos = [];
  filtro = new LancamentoFiltro();

  constructor(private lancamentosService: LancamentoService) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {

    this.lancamentosService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
      });
  }

}
