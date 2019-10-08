import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { xml2json } from 'xml-js';

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

    getInputFile() {
        this.records = [];
        this.onClearRecords.emit();
        const inputFile = <HTMLInputElement>document.getElementById('fileInput');
        const fileType = inputFile.value.split('.').pop();
        const reader = new FileReader();
        reader.onload = () => {
            // Convert to Json baed on filetype
            this.convertInputFileToJson(fileType,reader.result);
            
        };
        reader.readAsText(inputFile.files[0]);
    }

    convertInputFileToJson (fileType,result) {
        fileType === 'csv' ? this.csvToJson(result) : this.xmlToJson(result);
    }

    csvToJson(csv: any) {
        if (csv) {
            let rows = csv.split("\n");

            let recordHeaders = rows[0].split(",");
            recordHeaders = recordHeaders.map((recordHeader: string) => {
                return recordHeader.replace(/\s+/g, "").toLowerCase();
            })

            for (let i = 1; i < rows.length; i++) {
                let obj = {};
                let currentRecord = rows[i].split(",");
                for (let j = 0; j < recordHeaders.length; j++) {
                    obj[recordHeaders[j]] = currentRecord[j];
                }
                this.records.push(obj);
            }
        }
    }

    xmlToJson(xml: any) {
        let xmlJson = JSON.parse(xml2json(xml));

        xmlJson.elements[0].elements.map((records) => {
            let recordRefernece = {
                reference: records.attributes.reference
            };
            let recordValues = {};
            records.elements.map((recordValue) => {
                recordValues[recordValue.name.toLowerCase()] = recordValue.elements[0].text;
            });

            let record = { ...recordRefernece, ...recordValues };
            this.records.push(record);
        });
    }

    onValidate() {
        this.onValidateRecords.emit(this.records);
    }

    onClearResults() {
        this.inputFileVariable.nativeElement.value = "";
        this.onClearRecords.emit();
    }
}