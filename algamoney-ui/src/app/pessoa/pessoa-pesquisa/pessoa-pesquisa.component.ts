import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent {

  pessoas = [
    {
      nome: 'Luiz Miguel', cidade: 'Curitiba', estado: 'PR', status: true
    },
    {
      nome: 'Miguel', cidade: 'Curitiba', estado: 'PR', status: false
    },
    {
      nome: 'Andre Prestes', cidade: 'Carapicuiba', estado: 'SP', status: true
    },
    {
      nome: 'Luiza Santos', cidade: 'Morretes', estado: 'PR', status: true
    },
    {
      nome: 'Vanessa Duvigem', cidade: 'Carapicuiba', estado: 'SP', status: true
    }

  ];

}
