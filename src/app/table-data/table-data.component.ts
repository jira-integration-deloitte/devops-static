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
    constructor(private service: DevopsHttpService) {}
    statusColumnCount: number;
    groomingStatusColumnCount: number;
    responseData: any;
    showTable = false;
    currentStatus = '';

    loadTable(boardId, testOnly) {
        this.currentStatus = 'Fetching sprints'
        this.showLoader();

        console.log('Loading summary - ' + boardId);
        const url = Constants.HOST + '/devops-service/board/' + boardId + '/sprintsDetails' + (testOnly ? '?testOnly=true' : '');
        const data = this.service.getData(url);
        data.subscribe((response: any) => {
            console.log(response);
            this.statusColumnCount = response.statusColCount;
            this.groomingStatusColumnCount = response.groomingStatusColCount;
            this.responseData = response;
                console.log('Response value assigned');
            this.showTable = true;
            console.log('Showtable value updated');
            this.currentStatus = 'Done : All stories have been fetched';
            this.hideLoader();
        },
            (error: any) => {
            console.log(error);
            this.currentStatus = 'Error : Unable to fetch';
            this.hideLoader();
        },
            () => function() {

            }
        );
       // $('#board-summary-table').DataTable();
    }

    showLoader() {
        console.log('Showing loader - ' + this.currentStatus);
        $('#show-loader-btn').click();
    }
    hideLoader() {
        console.log('Hiding loader - ' + this.currentStatus);
        $('#hide-loader-btn').click();
    }
}
