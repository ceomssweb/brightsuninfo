import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
  CommonModule,
    CoursesRoutingModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
