import { Component, OnInit } from '@angular/core';

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

  pessoas = [
    { label: 'Luiz Miguel', value: '1' },
    { label: 'André Prestes', value: '2' },
    { label: 'Vanessa Prestes', value: '3' },
  ];

  categorias = [
    { label: 'Supermercado', value: '1' },
    { label: 'Farmácia', value: '2' },
    { label: 'Salário', value: '3' },

  ];

  constructor() {}

  ngOnInit() {}
}
