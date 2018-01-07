import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    PipeModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: []
})
export class GradesModule { }
