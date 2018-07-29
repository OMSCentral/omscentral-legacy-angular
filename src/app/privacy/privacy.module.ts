import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyComponent } from './privacy.component';

@NgModule({
  imports: [CommonModule, PrivacyRoutingModule],
  declarations: [PrivacyComponent],
})
export class PrivacyModule {}
