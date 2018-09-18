import { Component, OnInit } from '@angular/core';
import {Constants} from '../constants';
import {DevopsHttpService} from '../devops-http.service';
declare var $;
@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent {
    constructor(private service: DevopsHttpService){}
    statusColumnCount: number;
    groomingStatusColumnCount: number;
    responseData: any;
    showTable = false;
    loadTable(boardId, testOnly) {
        $('#board-summary-table').DataTable();
        console.log('Loading summary - ' + boardId);
        const url = Constants.HOST + '/devops-service/board/' + boardId + '/sprintsDetails' + (testOnly ? '?testOnly=true' : '');
        const data = this.service.getData(url);
        data.subscribe((response: any) => {

           console.log(response);
           this.statusColumnCount = response.statusColCount;
           this.groomingStatusColumnCount = response.groomingStatusColCount;
           this.responseData = response;

            this.showTable = true;
        },
            (error: any) => {
            console.log(error);
        },
            () => function() {

            }
        );

    }
}
