import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy/privacy.component';
import { PrivacyRoutingModule } from '../privacy/privacy-routing.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    SharedModule,
  ]
})
export class PrivacyModule { }
