import {Component, OnInit} from '@angular/core';
import {Schedule} from "../../models/schedule";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  datePip:DatePipe=new DatePipe('zh-CN');
  scheduleMap: Map<string, Schedule> = new Map<string, Schedule>();
  selectedDate: string = '';
  isVisible=false;
  curSchedule=new Schedule();
  title: string ='';
  constructor() {
  }

  initSchedule(){
    console.log(this.scheduleMap);
    if(localStorage['schedule']===null)
      this.scheduleMap= JSON.parse(localStorage.getItem('schedule')!);

  }

  ngOnInit(): void {
    this.initSchedule();
  }

  getDay(date: Date){
    return this.datePip.transform(date,'shortDate')
  }


  getSchedule(date: Date) {

    if(this.scheduleMap.has(this.getDay(date)!))
      return this.scheduleMap.get(this.getDay(date)!)
    else
      return null;
  }

  modSchedule(date: Date) {
    this.curSchedule=this.getSchedule(date)? this.getSchedule(date)!:new Schedule(date);
    this.title=this.datePip.transform(date,'yyyy年MM月dd日')!;
    this.isVisible=true;
  }

  handleCancel() {
    this.isVisible=false;
  }


  handleOk() {
    this.isVisible=false;
    this.scheduleMap.set(this.getDay(this.curSchedule.date)!,this.curSchedule);
    console.log(this.scheduleMap);
    localStorage.setItem('schedule',JSON.stringify(this.scheduleMap));
  }
}
