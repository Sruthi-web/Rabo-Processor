import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecordValidatorComponent } from './record-validator/record-validator.component';
import { RecordInputComponent } from './record-input/record-input.component';
import { RecordListComponent } from './record-list/record-list.component';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RecordValidatorComponent,
        RecordInputComponent,
        RecordListComponent
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