import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  cidades = [
    { label: 'Curitiba', value: '1' },
    { label: 'São Paulo', value: '2' },
  ]

  estados = [
    { label: 'Paraná', value: 'PR' },
    { label: 'São Paulo', value: 'SP' },
  ]
  constructor() { }

  ngOnInit() {
  }

}
