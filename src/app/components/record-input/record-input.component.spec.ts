import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RecordInputComponent } from "./record-input.component";
import { CommonModule } from '@angular/common';

describe("Component: RecordInputComponent", () => {
    let fixture: ComponentFixture<RecordInputComponent>;
    let component: RecordInputComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [RecordInputComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(RecordInputComponent);
            component = fixture.componentInstance;
        });
    }));
    it("should be defined ", async(() => {
        expect(component).toBeTruthy();
    }))
});