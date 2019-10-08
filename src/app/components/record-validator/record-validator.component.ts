import { Component } from '@angular/core';


@Component({
    selector: 'record-validator',
    templateUrl: './record-validator.component.html',
    styleUrls: ['./record-validator.component.scss']
})

export class RecordValidatorComponent {
    failedRecords: any = [];
    showFailedRecords: boolean = false;

    onValidate(customerRecords: any) {
        if (customerRecords) {
            const {recordsWithValidEndBalance, recordsWithInvalidEndBalance} = this.validateEndBalance(customerRecords);
            this.failedRecords = this.validateRecords(recordsWithValidEndBalance).concat(recordsWithInvalidEndBalance);
            this.showFailedRecords = true;
        }
    }

    onClearRecords() {
        this.failedRecords = [];
        this.showFailedRecords = false;
    }

    validateRecords(records: any) {
        const lookup = records.reduce((customerRecords: any, record: any) => {
            customerRecords[record.reference] = record.reference in customerRecords ? ++customerRecords[record.reference] : 0;
            return customerRecords;
        }, {});
        return (records.filter((record: any) => lookup[record.reference]));
    }

    validateEndBalance(records: any) {
        let recordsWithValidEndBalance = [];
        let recordsWithInvalidEndBalance = [];
        records.forEach(record => {
            if (record.mutation !== undefined) {
                if (+record.mutation > 0) {
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