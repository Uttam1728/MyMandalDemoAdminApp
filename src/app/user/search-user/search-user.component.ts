import { UserService } from 'src/app/shared/services/user.service';
import { Member } from 'src/app/shared/models/member.model';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { CurrencyPipe } from '@angular/common';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';


@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  
  dateFormat = "dd/mm/yyyy";
  contentTpl = "Search Something To get List"
  NotFoundContent:boolean = true;
  isSpinning : boolean = false;
  ResultList: Member[] = [];
  isResult = false;
  sortDirections: NzTableSortOrder[] = ['ascend', 'descend', null];
  sortFnFirstName: NzTableSortFn | null  = (a: Member , b: Member) => a.memberFirstName.localeCompare(b.memberFirstName);
  sortFnMiddleName: NzTableSortFn | null  = (a: Member , b: Member) => a.memberMiddleName.localeCompare(b.memberMiddleName);
  sortFnLastName: NzTableSortFn | null  = (a: Member , b: Member) => a.memberLastName.localeCompare(b.memberLastName);
  sortFnEmail: NzTableSortFn | null  = (a: Member , b: Member) => a.memberEmail.localeCompare(b.memberEmail);

  
  searchformdata : {
    date: Date[],
    memberemail :string,
    memberFirstName :string,
    memberMiddleName :string,
    memberLastName :string,
  } = {
    date: [],
    memberemail :'',
    memberFirstName :'',
    memberMiddleName :'',
    memberLastName :'',
  }
  constructor(private userService : UserService,private message:NzMessageService) { }
  expandSet = new Set<number>();
 
  ngOnInit(): void {
  }
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  submitForm() {
    //console.log(this.mandalname + "." + this.date);
     
      
      
      this.userService.searchMember(this.searchformdata)
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
    
    this.userService.removeMember(id)
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
    this.searchformdata = {
      date: [],
      memberemail :'',
      memberFirstName :'',
      memberMiddleName :'',
      memberLastName :'',
    }
    this.NotFoundContent = true;
    this.ResultList = [];
    this.isResult= false;
  }
}
