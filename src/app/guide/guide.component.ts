import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {
  displayGuide: number = 0;

  constructor() { }

  ngOnInit() {

  }

  go(displayGuide: number){
    this.displayGuide = displayGuide;
  }


  back(){
    this.displayGuide = 0;
  }



}
