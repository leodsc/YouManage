import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormComponent } from './components/form/form.component';
import { MessageComponent } from './components/message/message.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormComponent,
    MessageComponent,
    HomeComponent,
    MenuComponent,
    NavigationComponent,
    TableComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
