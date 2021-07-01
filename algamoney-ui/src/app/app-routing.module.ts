import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

import { NgModule, Component } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes:  Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'nao-autorizado', component: NaoAutorizadoComponent},
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  { path: '**', redirectTo: 'pagina-nao-encontrada'}
];


@NgModule({

  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
