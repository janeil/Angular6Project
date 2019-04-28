import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateEmployeeComponent } from '../employee/create-employee.component';
import { ListEmployeesComponent } from '../employee/list-employees.component';

@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent
  ],
  exports: [
    CreateEmployeeComponent,
    ReactiveFormsModule,
    EmployeeRoutingModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class EmployeeModule { }
