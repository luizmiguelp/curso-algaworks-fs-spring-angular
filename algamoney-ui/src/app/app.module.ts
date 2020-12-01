import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { PessoaModule } from './pessoa/pessoa.module';
import { LancamentoModule } from './lancamento/lancamento.module';
import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamento/lancamento.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

  BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    LancamentoModule,
    PessoaModule,
    CoreModule



  ],
  providers: [LancamentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
