import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RecordListComponent } from "./record-list.component";
import { CommonModule } from '@angular/common';

describe("Component: HomeComponent", () => {
    let fixture: ComponentFixture<RecordListComponent>;
    let component: RecordListComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [RecordListComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(RecordListComponent);
            component = fixture.componentInstance;
        });
    }));
    it("should be defined ", async(() => {
        expect(component).toBeTruthy();
    }))
});