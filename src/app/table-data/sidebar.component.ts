import { Component, OnInit } from '@angular/core';
import {Snapshot} from '../snapshot';
import {Constants} from '../constants';
import {DevopsHttpService} from '../devops-http.service';
import {KeyValue} from '../key-value';
import {FooterComponent} from '../footer/footer.component';
import {TableDataComponent} from './table-data.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    constructor(private devopService: DevopsHttpService, private footer: FooterComponent, private tableData: TableDataComponent) { }

    boards: Array<any> = [];
    stories: Array<any> = [];
    sprints: Array<any> = [];
    boardId: String;
    sprintId: String;
    errorMessage: String;
    totalStoryPoints = 0;
    userFullName: String;
    loaderVisibility = false;
    showData: String;
    currentStatus: String;
    showGraph = false;
    initMessage = Constants.MSG;
    snapBoard = new Array<Snapshot>();

    ngOnInit() {
        this.loadUser();
        this.loadBoards();
        this.loaderVisibility = false;
        this.showData = 'hidden';
    }

    loadUser() {
        this.userFullName = 'Ankit Saxena';
    }

    loadBoards() {
        this.initMessage = Constants.MSG;
        console.log('all board component loaded..');
        const data = this.devopService.getData(Constants.HOST + '/devops-service/allboards');
        this.boards = [];
        this.errorMessage = null;
        this.stories = [];
        data.subscribe((resp: any) => {
                if (resp != null) {
                    this.boards = resp.values;
                }
            },
            err => {
                console.log('Error while fetching boards');
                console.log(err);
                this.errorMessage = err.toString();
            });
    }

    loadSummary(boardId) {
        this.tableData.loadTable(boardId);
    }

}
