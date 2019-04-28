import { NgModule } from '@angular/core';

import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateEmployeeComponent } from '../employee/create-employee.component';
import { ListEmployeesComponent } from '../employee/list-employees.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ],
})
export class EmployeeModule { }
