import { Component, Input } from '@angular/core';

@Component({
    selector: 'record-list',
    templateUrl: './record-list.component.html',
    styleUrls: ['./record-list.component.scss']
})

export class RecordListComponent {
@Input() failedRecords: any;
}