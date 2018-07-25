import { Component, OnInit } from '@angular/core';
import {DevopsHttpService} from '../devops-http.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  boards: Array<Object> = [];
  stories: Array<Object> = [];
  sprints: Array<Object> = [];
  boardId: String;
  sprintId: String;
  errorMessage: String;
  userFullName: String;
  constructor(private devopService: DevopsHttpService) { }

  ngOnInit() {
    this.loadUser();
    this.loadBoards();
  }

  loadUser() {
      this.userFullName = 'Ankit Saxena';
  }
  loadBoards() {
    console.log('all board component loaded..');
    const data = this.devopService.getData('http://localhost:8088/devops-service/alldashboards');
    this.boards = [];
    this.errorMessage = null;
    this.stories = [];
    data.subscribe(resp => {
        if (resp != null) {
          this.boards = resp.values;
          this.boards.push(JSON.parse('{"id":"x", "name":"--Select Board--"}'));
        }
    });
  }

  loadSprints() {
    console.log('Selected board - ' + this.boardId);
    const url = 'http://localhost:8088/devops-service/board/' + this.boardId + '/sprints';
    const data = this.devopService.getData(url);
    this.errorMessage = null;
    this.stories = [];
    this.sprints = [];
    data.subscribe(resp => {
      if (resp != null) {
        this.sprints = resp.values;
        this.sprints.push(JSON.parse('{"id":"x", "name":"--Select Sprint--"}'));
      }
    });
  }

  loadStories() {
    console.log('Selected sprint - ' + this.sprintId);
    this.errorMessage = null;
    this.stories = [];
    const url = 'http://localhost:8088/devops-service/board/' + this.boardId + '/sprint/' + this.sprintId + '/stories';
    const data = this.devopService.getData(url);
    data.subscribe(resp => {
      let issue = null;
      if (resp !== null) {
        this.stories = resp.issues;
      }
      console.log(this.stories);

      if (this.stories.length === 0) {
          this.errorMessage = 'No story was found for the selected sprint.';
        }
    });
  }
}
