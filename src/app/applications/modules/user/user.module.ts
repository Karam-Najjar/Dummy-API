import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ListUserComponent } from './pages/list-user/list-user.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { UsersComponent } from './users/users.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    ListUserComponent,
    CreateUserComponent,
    ViewUserComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    UserRoutingModule,
  ],
})
export class UserModule {}
