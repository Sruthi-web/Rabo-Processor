import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RecordValidatorComponent } from "./record-validator.component";
import { RecordInputComponent } from "../record-input/record-input.component";
import { RecordListComponent } from "../record-list/record-list.component";
import { CommonModule } from '@angular/common';

describe("Component: HomeComponent", () => {
    let fixture: ComponentFixture<RecordValidatorComponent>;
    let component: RecordValidatorComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [RecordValidatorComponent,RecordInputComponent,RecordListComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(RecordValidatorComponent);
            component = fixture.componentInstance;
        });
    }));
    it("should be defined ", async(() => {
        expect(component).toBeTruthy();
    }))
});