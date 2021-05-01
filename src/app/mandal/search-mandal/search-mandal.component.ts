import { MandalService } from './../../shared/services/mandal.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Mandal } from 'src/app/shared/models/mandal.model';
@Component({
  selector: 'app-search-mandal',
  templateUrl: './search-mandal.component.html',
  styleUrls: ['./search-mandal.component.css']
})
export class SearchMandalComponent implements OnInit {

  constructor(private mandalService : MandalService,  private message: NzMessageService) { }

  dateFormat = "dd/mm/yyyy";
  mandalname = ''
  date: Date[] = [];
  contentTpl = "Search Something To get List"
  NotFoundContent:boolean = true;
  isSpinning : boolean = false;
  ResultList:Mandal[] = [];
  isResult = false;
  sortDirections: NzTableSortOrder[] = ['ascend', 'descend', null];
  sortFn: NzTableSortFn | null  = (a: Mandal , b: Mandal) => a.mandalName.localeCompare(b.mandalName);

  ngOnInit(): void {
    
  }

  submitForm() {
    //console.log(this.mandalname + "." + this.date);
     
      let formdata = {
          fromdate : this.date[0], 
          todate:this.date[1], 
          mandalname : this.mandalname.trim()
        }
      
      this.mandalService.searchMandal(formdata)
      .subscribe(data => {
        if(Array.isArray(data) && data.length > 0){
          this.ResultList = [];
          this.NotFoundContent = false;
          this.isResult = true;
          data.forEach((item, index, array) => {
            console.log(item);
            /* business logic */
            this.ResultList.push(item);

            if(index === array.length-1) {
              this.isSpinning = false;
            }
          });
          console.log(data);
        }
        else{
          this.contentTpl = "Data Not Found in List";
          this.ResultList = [];
          this.NotFoundContent = true;
          this.isResult= false;
          this.isSpinning = false;
          this.message.create("warning", `Data Not Found in List`);
        }
       
      })
    
   
    
  }

  deleteRow(id){
    const msgid = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
    
    this.mandalService.removeMandal(id)
    .subscribe(data =>{
      console.log(data);
      this.submitForm();
      this.message.remove(msgid);
      this.message.create("success", `Data Deleted`);
    },
    error =>{
      this.message.remove(msgid);
      this.message.create("error", `Problem in Server`);
    });
  }
  resetForm() {
    this.date= [];
    this.NotFoundContent = true;
    this.mandalname = '';
    this.ResultList = [];
    this.isResult= false;
  }
}
