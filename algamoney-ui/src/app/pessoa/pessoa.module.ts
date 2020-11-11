import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';

import {SharedModule} from '../shared/shared.module';
import { PessoaPesquisaComponent } from '../pessoa/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from '../pessoa/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasGridComponent } from '../pessoa/pessoas-grid/pessoas-grid.component';



@NgModule({
  imports: [


    CommonModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    FormsModule,

    SharedModule

  ],
  declarations: [

    PessoaPesquisaComponent,
    PessoaCadastroComponent,
    PessoasGridComponent,
  ],
  exports: [
    PessoaPesquisaComponent,
    PessoaCadastroComponent,
  ]
})
export class PessoaModule { }
