import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from '../admin-panel/admin-panel-routing.module';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { SharedModule } from './../../shared/shared.module';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    TabViewModule
  ]
})
export class AdminPanelModule { }
