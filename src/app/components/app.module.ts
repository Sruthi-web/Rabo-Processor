import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecordValidatorComponent } from './record-validator/record-validator.component';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RecordValidatorComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}