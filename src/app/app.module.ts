import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './applications/layouts/header/header.component';
import { UsersInterceptor } from './applications/modules/user/interceptors/users-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AuthComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SpinnerComponent,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
  ],
  // providers: [provideAnimationsAsync('noop')],
  bootstrap: [AppComponent],
})
export class AppModule {}
