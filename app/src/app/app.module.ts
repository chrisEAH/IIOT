import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { MongoDbService } from './mongo-db.service';



@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MongoDbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
