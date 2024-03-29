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
  selectedDate: Date=new Date();
  isVisible=false;
  curSchedule=new Schedule();
  title: string ='';
  color:string='';
  constructor() {

  }

  initSchedule(){
    if(localStorage['schedule']!==null){
      this.scheduleMap= new Map(JSON.parse(localStorage.getItem('schedule')!));
    }
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
    this.curSchedule=this.getSchedule(date)??new Schedule(date);
    this.title=this.datePip.transform(date,'yyyy年MM月dd日')!;
    this.isVisible=true;
  }

  handleCancel() {
    this.isVisible=false;
  }


  handleOk() {
    this.isVisible=false;
    this.scheduleMap.set(this.getDay(this.curSchedule.date)!,this.curSchedule);
    localStorage.setItem('schedule',JSON.stringify([...this.scheduleMap]));
  }

  getScheduleContent(date: Date) {
    return this.scheduleMap.get(this.getDay(date)!)?.content;

  }

  onSelectChange() {
    // console.log(this.selectedDate)
  }

  getCellClass(date: Date) {
    let c='cell';
    this.color='cyan'
    if(this.selectedDate.toLocaleDateString()===date.toLocaleDateString()){
      c+=' cell-selected'
    }
    if(new Date().toLocaleDateString()===date.toLocaleDateString()){
      c+=' cell-today'
    }
    return c;
  }
}
