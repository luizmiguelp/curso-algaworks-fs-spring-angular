import { environment } from './../../environments/environment';
import { Pessoa } from './../core/model';
import {  Headers, URLSearchParams  } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';


import 'rxjs/add/operator/toPromise';

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {


  pessoaUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoaUrl = `${environment.apiUrl}/pessoas`;
  }

  // tslint:disable-next-line: one-line
  pesquisar(filtro: PessoaFilter): Promise<any>{
    const params = new  URLSearchParams();
     params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoaUrl}`, {   search : params })
            .toPromise()
            .then(response => {
              const responseJson = response.json();
              const pessoas = responseJson.content;

              const resultado = {
                pessoas,
                total: responseJson.totalElements
              };

              return resultado;


            })

  }

  listarTodas(): Promise<any> {

    return this.http.get(`${this.pessoaUrl}` )
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const lista = responseJson.content;

        const resultado = {
          lista,
          total: responseJson.totalElements
        };

        return resultado
    })
  }


  // tslint:disable-next-line: one-line
  excluir(codigo: number): Promise<void>{

    return this.http.delete(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(() => null)

  }

   mudarStatus(codigo: number, ativo: Boolean): Promise<void> {
    return this.http.put(`${this.pessoaUrl}/${codigo}/ativo`, ativo  )
      .toPromise()
      .then(() => null)
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {


    return  this.http.post(this.pessoaUrl,
        JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());

  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    const codigo = pessoa.codigo;

     return  this.http.put(`${this.pessoaUrl}/${codigo}`,
        JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());

  }

  // tslint:disable-next-line: one-line
  buscarPorCodigo(codigo: number): Promise<Pessoa>{

    return this.http.get(`${this.pessoaUrl}/${codigo}`)
      .toPromise()
      .then(response => {
          const pessoa = response.json() as Pessoa;
          return pessoa;
      });
  }
}
