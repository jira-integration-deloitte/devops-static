import { Component, OnInit } from '@angular/core';
import {DevopsHttpService} from '../devops-http.service';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

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

  pieChartData =  {
      chartType: 'PieChart',
      dataTable: [
          ['Story type', 'Points']
      ],
      options: {'title': 'Tasks'}
};

  constructor(private devopService: DevopsHttpService) { }


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
    console.log('all board component loaded..');
    const data = this.devopService.getData('http://localhost:8088/devops-service/allboards');
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

  loadSprints() {
      this.currentStatus = 'Fetching sprints';
      this.showData = 'hidden';
      this.showLoader();
      console.log('Selected board - ' + this.boardId);
       const url = 'http://localhost:8088/devops-service/board/' + this.boardId + '/sprints';
        const data = this.devopService.getData(url);
        this.errorMessage = null;
        this.stories = [];
        this.sprints = [];
        this.sprintId = undefined;
        data.subscribe(
            (resp: any) => {
                      if (resp != null) {
                        this.sprints = resp.values;
                        this.currentStatus = 'Arranging sprints';
                      }
                      this.currentStatus = 'Done';
                      this.hideLoader();
                    },
            (error: any) => {
                        console.log('Error occurred');
                        console.log(error);
                        this.hideLoader();
            });
  }

  loadStories() {
      this.currentStatus = 'Fetching stories';
      this.showData = 'hidden';
      this.showLoader();
      const chartData = this.pieChartData.dataTable;
      this.clearDataTable();
      this.totalStoryPoints = 0;

      this.loaderVisibility = true;
      console.log('Selected sprint - ' + this.sprintId);

      this.errorMessage = null;
      this.stories = [];

      const url = 'http://localhost:8088/devops-service/board/' + this.boardId + '/sprint/' + this.sprintId + '/stories';
      const data = this.devopService.getData(url);

      data.subscribe(
          (resp: any) => {
              this.currentStatus = 'Arranging stories';
              this.showData = 'visible';
              if (resp !== null) {
                  this.stories = resp.issues;
              }
              for (const issue of this.stories) {
                  this.totalStoryPoints = this.totalStoryPoints + issue.storyPoint;
                  this.prepareChart(issue, chartData);
              }
              if (this.stories.length === 0) {
                  this.errorMessage = 'No story was found for the selected sprint.';
              }
              this.hideLoader();
          },
          (error: any) => {
            console.log('Error occurred');
            console.log(error);
            this.hideLoader();
          }
      );
      console.log('Chart data');
      console.log(this.pieChartData);
  }
    private prepareChart(issue: any, chartData: any[]) {
      const status = issue.status;
      let found = false;
      const storyPoint = issue.storyPoint;
      for (const data of chartData) {
         const name = data[0];
         if (name === status) {
             data[1] = data[1] + storyPoint;
             found = true;
         }
      }
      if (!found) {
         const data = [status, storyPoint];
         chartData.push(data);
      }
    }

    clearDataTable() {
      if (this.pieChartData.dataTable.length > 1) {
          const len = this.pieChartData.dataTable.length;
          for (let i = 0; i < len - 1; i++) {
              this.pieChartData.dataTable.pop();
          }
          console.log('Table data cleared');
      }
    }

    getSprintName(sprintId: String) {
      for (const sprint of this.sprints) {
          if (sprint.id === sprintId) {
              return sprint.name;
          }
      }
    }

    showLoader() {
        document.getElementById('open-modal-btn').click();
    }
    hideLoader() {
        document.getElementById('close-modal-btn').click();
    }


}
