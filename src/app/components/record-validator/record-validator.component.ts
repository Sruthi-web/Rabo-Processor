import { Component } from '@angular/core';


@Component({
    selector: 'record-validator',
    templateUrl: './record-validator.component.html',
    styleUrls: ['./record-validator.component.scss']
})

export class RecordValidatorComponent {
failedRecords:any = [];

    onValidate(customerRecords:any) {
        const {recordsWithValidEndBalance, recordsWithInvalidEndBalance} = this.validateEndBalance(customerRecords);
        this.failedRecords = this.validateRecords(recordsWithValidEndBalance).concat(recordsWithInvalidEndBalance);
    }

    onClearRecords() {
        this.failedRecords = [];
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