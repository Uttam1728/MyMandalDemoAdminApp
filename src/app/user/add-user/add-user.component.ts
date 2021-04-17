import { User } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service'
import { IfNullOrEmptyOrBlankThan } from 'src/app/shared/utils/strings';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;
  addUserForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      memberFirstName       : ['', Validators.required],
      memberMiddleName      : ['', Validators.required],
      memberLastName        : ['', Validators.required],
      memberImgSrc          : [''],
      memberEmail           : ['',[ Validators.required, Validators.email]],
      memberMobileNumbers   : ['', Validators.required],
      memberAddress         : ['', Validators.required],
      withdrawal            : 0,
      password              : ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword       : ['', [Validators.required, Validators.minLength(5)]],
  });
}

  onSubmit(form: FormGroup) {
    // let tempstr = '';
    // tempstr += 'Valid?'+ form.valid + '\n'; // true or false
    // tempstr += 'Name'+ form.value.memberFirstName + '\n';
    // tempstr += 'Email'+ form.value.memberEmail + '\n';
    // tempstr += 'Message'+ form.value.memberAddress + '\n';
    // alert(tempstr);
    if(form.valid){
      let user : User = {
        memberFirstName : form.controls.memberFirstName.value ,
        memberMiddleName : form.controls.memberMiddleName.value,
        memberLastName : form.controls.memberLastName.value,
        memberImgSrc : form.controls.memberImgSrc.value,
        memberEmail : form.controls.memberEmail.value,
        memberMobileNumbers : [form.controls.memberMobileNumbers.value],
        memberAddress : form.controls.memberAddress.value,
        withdrawal : IfNullOrEmptyOrBlankThan(form.controls.withdrawal.value,"0"),
        password : form.controls.password.value,
        createdBy  : "-100", 
      };
      this.userService.postUser(user).subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.showSucessMessage = false, 4000);
          this.resetForm(form);
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          }
          else
            this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      );
    }
  }

  // onSubmit(form: NgForm) {
    
  // }

  resetForm(form: FormGroup) {

    form.reset();
    this.serverErrorMessages = '';
  }
}
