import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { Headers, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { Lancamento } from './../core/model';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentoUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentoUrl = `${environment.apiUrl}/lancamentos`;
   }


  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());


    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD')
      );
    }

    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD')
      );
    }


    return this.http.get(`${this.lancamentoUrl}?resumo`, {   search: params } )
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        };

        return resultado;

      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentoUrl}/${codigo}`)
      .toPromise()
      .then(() => null)

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.post(this.lancamentoUrl,
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    const codigo = lancamento.codigo;

    return this.http.put(`${this.lancamentoUrl}/${codigo}`,
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lanc = response.json() as Lancamento;
        this.converterStringsParaData([lanc]);
        return lanc;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentoUrl}/${codigo}` )
      .toPromise()
      .then(response => {
          const lancamento = response.json() as Lancamento;
          this.converterStringsParaData([lancamento]);
          return lancamento;
      });
  }
  private converterStringsParaData(lancamento: Lancamento[]) {
     lancamento.forEach(element => {
        if (element.dataPagamento) {
           element.dataPagamento =  moment(element.dataPagamento, 'YYYY-MM-DD').toDate();
        }
        if (element.dataVencimento) {
          element.dataVencimento =  moment(element.dataVencimento, 'YYYY-MM-DD').toDate();
        }

     });

  }
}
