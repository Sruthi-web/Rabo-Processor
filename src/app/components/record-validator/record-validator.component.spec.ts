import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RecordValidatorComponent } from "./record-validator.component";
import { RecordInputComponent } from "../record-input/record-input.component";
import { RecordListComponent } from "../record-list/record-list.component";
import { CommonModule } from '@angular/common';

describe("Component: RecordValidatorComponent", () => {
    let fixture: ComponentFixture<RecordValidatorComponent>;
    let component: RecordValidatorComponent;

    let records = [{
        accountnumber: "NL69ABNA0433647324",
        description: "Subscription for Jan Theu�",
        endbalance: "93.77",
        mutation: "48.18",
        reference: "112806",
        startbalance: "45.59"
    }, {
        accountnumber: "NL69ABNA0433647324",
        description: "Flowers for Jan Theu�",
        endbalance: "93.77",
        mutation: "48.18",
        reference: "112806",
        startbalance: "45.59"
    }, {
        accountnumber: "NL93ABNA0585619023",
        description: "Flowers for Rik Theu�",
        endbalance: "22.51",
        mutation: "-22.24",
        reference: "177666",
        startbalance: "44.85"
    }
    ];

    let nullCustomerRecords =[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [RecordValidatorComponent, RecordInputComponent, RecordListComponent],
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(RecordValidatorComponent);
            component = fixture.componentInstance;
        });
    }));

    it("should be defined ", async(() => {
        expect(component).toBeTruthy();
    }));
    
    it("should clear records ", async(() => {
        component.onClearRecords();
        expect(component.failedRecords.length).toBe(0);
    }));

    it("should validate endbalance for records", async(() => {
        let result = component.validateEndBalance(records);

        let endResult = {
            recordsWithValidEndBalance: [{
                accountnumber: "NL69ABNA0433647324",
                description: "Subscription for Jan Theu�",
                endbalance: "93.77",
                mutation: "48.18",
                reference: "112806",
                startbalance: "45.59"
            }, {
                accountnumber: "NL69ABNA0433647324",
                description: "Flowers for Jan Theu�",
                endbalance: "93.77",
                mutation: "48.18",
                reference: "112806",
                startbalance: "45.59"
            }],
            recordsWithInvalidEndBalance: [{
                accountnumber: "NL93ABNA0585619023",
                description: "Flowers for Rik Theu�",
                endbalance: "22.51",
                mutation: "-22.24",
                reference: "177666",
                startbalance: "44.85"
            }]
        }
        expect(result).toEqual(endResult);
    }));

    it("should validate unique records", async(() => {
        let result = component.validateRecords(records);

        let endResult = [
            {
                accountnumber: "NL69ABNA0433647324",
                description: "Subscription for Jan Theu�",
                endbalance: "93.77",
                mutation: "48.18",
                reference: "112806",
                startbalance: "45.59"
            }, {
                accountnumber: "NL69ABNA0433647324",
                description: "Flowers for Jan Theu�",
                endbalance: "93.77",
                mutation: "48.18",
                reference: "112806",
                startbalance: "45.59"
            }];
        expect(result).toEqual(endResult);
    }
    ));

    it("should return failedRecords", async(() => {
        component.onValidate(records);
        expect(component.failedRecords).toEqual(records);
    }));

    it("should return zero failedRecords when no customerRecords found", async(() => {
        component.onValidate(nullCustomerRecords);
        expect(component.failedRecords.length).toBe(0);
    }))
});