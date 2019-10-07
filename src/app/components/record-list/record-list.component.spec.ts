import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RecordListComponent } from "./record-list.component";
import { CommonModule } from '@angular/common';

describe("Component: RecordListComponent", () => {
    let fixture: ComponentFixture<RecordListComponent>;
    let component: RecordListComponent;

    let failedRecords = [{
        accountnumber: "NL69ABNA0433647324",
        description: "Subscription for Jan Theu�",
        endbalance: "93.77",
        mutation: "48.18",
        reference: "112806",
        startbalance: "45.59"
    }, {
        accountnumber: "NL90ABNA0585647886",
        description: "Clothes from Peter de Vries",
        endbalance: "81.79",
        mutation: "49.03",
        reference: "112806",
        startbalance: "32.76"
    }]

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

    it('should test input failedRecords', () => {
    component.failedRecords = failedRecords;
    fixture.detectChanges();
    expect(component.failedRecords).toBe(failedRecords);
  });
});