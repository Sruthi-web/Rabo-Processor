import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'record-input',
    templateUrl: 'record-input.component.html',
    styleUrls: ['./record-input.component.scss']
})

export class RecordInputComponent {

    records = [];

    @Output() onValidateRecords: EventEmitter<any> = new EventEmitter();
    @Output() onClearRecords: EventEmitter<any> = new EventEmitter();
    @ViewChild('inputFile') inputFileVariable: ElementRef;

    convertCsvToJson() {
        this.records = [];
        const inputFile = <HTMLInputElement>document.getElementById('fileInput');
        const reader = new FileReader();
        reader.onload = () => {
            this.csvToJson(reader.result);
        };
        reader.readAsText(inputFile.files[0]);
    }

    csvToJson(csv: any) {
        if (csv) {
            let rows = csv.split("\n");

            let recordHeaders = rows[0].split(",");
            recordHeaders = recordHeaders.map((recordHeader: string) => {
                return recordHeader.replace(/\s+/g, "").toLowerCase();
            })

            for (var i = 1; i < rows.length; i++) {
                var obj = {};
                var currentRecord = rows[i].split(",");
                for (var j = 0; j < recordHeaders.length; j++) {
                    obj[recordHeaders[j]] = currentRecord[j];
                }
                this.records.push(obj);
            }
        }
    }

    onValidate() {
        this.onValidateRecords.emit(this.records);
    }

    onClearResults() {
        this.inputFileVariable.nativeElement.value = "";
        this.onClearRecords.emit();
    }
}