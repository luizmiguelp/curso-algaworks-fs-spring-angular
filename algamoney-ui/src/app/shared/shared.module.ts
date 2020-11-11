import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MessageComponent} from '../shared/message/message.component';

@NgModule({
  imports: [

  CommonModule
  ],
  declarations: [MessageComponent],
  exports: [MessageComponent]
})
export class SharedModule { }
