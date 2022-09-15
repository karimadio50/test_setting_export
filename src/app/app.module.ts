import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NzMessageModule} from "ng-zorro-antd/message";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzUploadModule,
    HttpClientModule,
    NzMessageModule,
    NzButtonModule,
    NzIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
