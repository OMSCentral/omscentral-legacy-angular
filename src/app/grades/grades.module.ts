import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from '../pipes/pipe.module';
import { GradeService } from './grade.service';

@NgModule({
  imports: [CommonModule, PipeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [],
  providers: [GradeService],
})
export class GradesModule {}
