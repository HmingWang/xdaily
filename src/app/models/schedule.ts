export class Schedule {
  date:Date;
  color:string;
  content:string;
  repeat:string;
  constructor(date:Date=new Date()) {
    this.date=date;
    this.color='';
    this.content='';
    this.repeat='';
  }

}
