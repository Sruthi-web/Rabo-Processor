import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RecordInputComponent } from "./record-input.component";
import { CommonModule } from '@angular/common';

describe("Component: RecordInputComponent", () => {
    let fixture: ComponentFixture<RecordInputComponent>;
    let component: RecordInputComponent;


    let records = [{
        accountnumber: "NL93ABNA0585619023",
        description: "Flowers for Rik Theu�",
        endbalance: "22.51",
        mutation: "-22.24",
        reference: "177666",
        startbalance: "44.85"
    }, {
        accountnumber: "NL69ABNA0433647324",
        description: "Subscription for Jan Theu�",
        endbalance: "93.77",
        mutation: "48.18",
        reference: "112806",
        startbalance: "45.59"
    }]

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
    }));
    it('should emit onValidateRecords on click validate button', () => {
        spyOn(component.onValidateRecords, 'emit');
        component.onValidate();
        expect(component.onValidateRecords.emit).toHaveBeenCalled();
    });
    it('should emit onClearRecords on click clear button', () => {
        spyOn(component.onClearRecords, 'emit');
        component.onClearResults();
        expect(component.onClearRecords.emit).toHaveBeenCalled();
    });
    it('should convert csv records to json records', () => {
        let csv = "Reference,Account Number,Description,Start Balance,Mutation,End Balance \n177666,NL93ABNA0585619023,Flowers for Rik Theu�,44.85,-22.24,22.51\n112806,NL69ABNA0433647324,Subscription for Jan Theu�,45.59,48.18,93.77";
        component.csvToJson(csv);
        expect(component.records).toEqual(records);
    });
    it('should return empty records for empty csv', () => {
        let csv = undefined;
        component.csvToJson(csv);
        expect(component.records.length).toBe(0);
    });
    it('should convert xml records to json records', () => {
        let xml = "<records><record reference='187997'><accountNumber>NL91RABO0315273637</accountNumber><description>Clothes for Rik King</description><startBalance>57.6</startBalance><mutation>-32.98</mutation><endBalance>24.62</endBalance></record></records>";
        let record = [{
            accountnumber: "NL91RABO0315273637",
            description: "Clothes for Rik King",
            endbalance: "24.62",
            mutation: "-32.98",
            reference: "187997",
            startbalance: "57.6"
        }]
        component.xmlToJson(xml);
        expect(component.records).toEqual(record);
    });
    it('should call csvToJson function for excel file', () => {
        spyOn(component, "csvToJson");
        component.convertInputFileToJson("csv", "Reference,Account Number,Description,Start Balance,Mutation,End Balance \n177666,NL93ABNA0585619023,Flowers for Rik Theu�,44.85,-22.24,22.51\n112806,NL69ABNA0433647324,Subscription for Jan Theu�,45.59,48.18,93.77");
        expect(component.csvToJson).toHaveBeenCalledWith("Reference,Account Number,Description,Start Balance,Mutation,End Balance \n177666,NL93ABNA0585619023,Flowers for Rik Theu�,44.85,-22.24,22.51\n112806,NL69ABNA0433647324,Subscription for Jan Theu�,45.59,48.18,93.77");
    });
    it('should call xmlToJson function for xml file', () => {
        spyOn(component, "xmlToJson");
        component.convertInputFileToJson("xml","<records><record reference='187997'><accountNumber>NL91RABO0315273637</accountNumber><description>Clothes for Rik King</description><startBalance>57.6</startBalance><mutation>-32.98</mutation><endBalance>24.62</endBalance></record></records>");
        expect(component.xmlToJson).toHaveBeenCalledWith("<records><record reference='187997'><accountNumber>NL91RABO0315273637</accountNumber><description>Clothes for Rik King</description><startBalance>57.6</startBalance><mutation>-32.98</mutation><endBalance>24.62</endBalance></record></records>");
    });
});