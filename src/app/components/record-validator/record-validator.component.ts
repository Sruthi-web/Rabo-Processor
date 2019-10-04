import { Component } from '@angular/core';


@Component({
    selector: 'record-validator',
    templateUrl: './record-validator.component.html',
    styleUrls: ['./record-validator.component.scss']
})

export class RecordValidatorComponent {
failedRecords:any = [];
    convertCsvToJson() {
        const inputFile = <HTMLInputElement>document.getElementById('fileInput');
        const reader = new FileReader();
        reader.onload = () => {
            let customerRecords = this.csvToJson(reader.result);
            debugger;
            const {recordsWithValidEndBalance, recordsWithInvalidEndBalance} = this.validateEndBalance(customerRecords);
            this.failedRecords = this.validateRecords(recordsWithValidEndBalance).concat(recordsWithInvalidEndBalance);

        };
        reader.readAsText(inputFile.files[0]);

    }

    csvToJson(csv: any) {
        let rows = csv.split("\n");
        let records = [];
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
            records.push(obj);
        }
        return records;
    }

    validateRecords(records: any) {
        const lookup = records.reduce((a: any, e: any) => {
            a[e.reference] = e.reference in a ? ++a[e.reference] : 0;
            return a;
        }, {});
        return (records.filter((e: any) => lookup[e.reference]));
    }

    validateEndBalance(records: any) {
        let recordsWithValidEndBalance = [];
        let recordsWithInvalidEndBalance = [];
        records.forEach(record => {
            if (record.mutation !== undefined) {
                if (+record.mutation > 0 && record.mutation !== undefined) {
                    (+(+record.startbalance + +record.mutation).toFixed(2)) === +record.endbalance ? recordsWithValidEndBalance.push(record) : recordsWithInvalidEndBalance.push(record);
                } else {
                    (+(record.startbalance - Math.abs(+record.mutation)).toFixed(2)) === +record.endbalance ? recordsWithValidEndBalance.push(record) : recordsWithInvalidEndBalance.push(record);
                }
            }
        });
        return {
            recordsWithValidEndBalance: recordsWithValidEndBalance,
            recordsWithInvalidEndBalance: recordsWithInvalidEndBalance,
        };
    }
}