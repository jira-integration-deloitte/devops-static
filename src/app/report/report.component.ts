import {Component, OnInit} from '@angular/core';
import {DevopsHttpService} from '../devops-http.service';
import {Snapshot} from '../snapshot';
import {KeyValue} from '../key-value';
import {Constants} from '../constants';
import {FooterComponent} from '../footer/footer.component';
declare var $;

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
  showGraph = false;
  initMessage = Constants.MSG;
  currentStatus = '';

  totalNumberOfStories = 0;
  snapBoard = new Array<Snapshot>();

  constructor(private devopService: DevopsHttpService) {}


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

  loadSprints() {
    this.initMessage = Constants.MSG;
    this.showGraph = false;
    this.currentStatus = 'Fetching sprints';
    this.showData = 'hidden';
    this.showLoader();
    this.snapBoard = new Array<Snapshot>();

    console.log('Selected board - ' + this.boardId);
    const url = Constants.HOST + '/devops-service/board/' + this.boardId + '/sprints';
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
        this.errorMessage = 'This project does not have any sprint.'; /* error.toString(); */
        this.initMessage = undefined;
      });
  }

  loadStories() {
    this.initMessage = Constants.MSG;
    this.showGraph = false;
    //      this.footer.setCurrentStatus('Fetching stories');
    this.showData = 'hidden';
    this.currentStatus = 'Fetching stories';
    this.showLoader();
    this.totalStoryPoints = 0;
    this.snapBoard = new Array<Snapshot>();

    const sprintPoint = new Snapshot('Sprint wise points division');
    const statusPoint = new Snapshot('Status wise points division');
    const sprintStoryCount = new Snapshot('Story count for each sprint');
    const statusStoryCount = new Snapshot('Story count for respective status');

    this.loaderVisibility = true;
    console.log('Selected sprint - ' + this.sprintId);

    this.errorMessage = null;
    this.stories = [];

    const url = Constants.HOST + '/devops-service/board/' + this.boardId + '/sprint/' + this.sprintId + '/stories';
    const data = this.devopService.getData(url);

    data.subscribe(
      (resp: any) => {
        this.currentStatus = 'Arranging stories';
        this.showData = 'visible';
        if (resp !== null) {
          this.stories = resp.issues;
        }
        for (const issue of this.stories) {
          console.log('Looping after response -- ' + this.stories.length);
          this.totalStoryPoints = this.totalStoryPoints + issue.storyPoint;
          this.prepareSnapshot(sprintPoint.Data, issue.sprintName, issue.storyPoint);
          this.prepareSnapshot(statusPoint.Data, issue.status, issue.storyPoint);
          this.prepareSnapshot(sprintStoryCount.Data, issue.sprintName, 1);
          this.prepareSnapshot(statusStoryCount.Data, issue.status, 1);
        }
        if (this.stories.length === 0) {
          this.errorMessage = 'No story was found for the selected sprint.';
          this.showGraph = false;
        } else {
          this.showGraph = true;
        }
        this.initMessage = undefined;
        this.hideLoader();
      },
      (error: any) => {
        console.log('Error occurred');
        this.errorMessage = error.toString();
        this.initMessage = undefined;
        console.log(error);
        this.hideLoader();
      },
      () => {
        console.log(sprintPoint);
        this.snapBoard.push(sprintStoryCount);
        this.snapBoard.push(statusStoryCount);
        this.snapBoard.push(sprintPoint);
        this.snapBoard.push(statusPoint);
      }
    );
  }
  getSprintName(sprintId: String) {
    for (const sprint of this.sprints) {
      if (sprint.id === sprintId) {
        return sprint.name;
      }
    }
  }
  prepareSnapshot(data: KeyValue[], key, value) {
    const sprint = key;
    const storyPoint = value;
    let found = false;
    for (let i = 0; i < data.length; i++) {
      const snap = data[i];
      if (snap.Key === key) {
        const oldVal = snap.Value;
        snap.Value = oldVal + value;
        found = true;
      }
    }
    if (!found) {
      const snap = new KeyValue(key, value);
      data.push(snap);
    }
  }

  showLoader() {
    console.log('Showing loader - ' + this.currentStatus);
    $('#open-modal-btn').click();
  }
  hideLoader() {
    $('#close-modal-btn').click();
  }

}
