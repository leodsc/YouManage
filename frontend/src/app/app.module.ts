import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormComponent } from './components/form/form.component';
import { MessageComponent } from './components/message/message.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TableComponent } from './components/table/table.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './pages/test/test.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ModalComponent } from './components/modal/modal.component';
import { ManagerDataPipe } from './pipes/manager-data.pipe';
import { WageCurrencyPipe } from './pipes/wage-currency.pipe';
import { DateTransformPipe } from './pipes/date-transform.pipe';

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
    InputComponent,
    TestComponent,
    AvatarComponent,
    ModalComponent,
    ManagerDataPipe,
    WageCurrencyPipe,
    DateTransformPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: 'LOCALE_ID', useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
