import { MandalService } from './../../shared/services/mandal.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Member } from '../../shared/models/member.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';


import { UserService } from '../../shared/services/user.service'
import { IfNullOrEmptyOrBlankThan } from 'src/app/shared/utils/strings';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  phoneNumberpattern = "^[6-9][0-9]{9}$"
  addUserForm: FormGroup;
  isclickedAdd: boolean = false;
  fileList: NzUploadFile[] = [];
  fileToUpload: NzUploadFile = null;
  bodyFormData = new FormData();
  mandalNames;


  constructor(private userService: UserService,private mandalService: MandalService, private fb: FormBuilder, private msg :NzMessageService) { }

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      memberFirstName: ['', Validators.required],
      memberMiddleName: ['', Validators.required],
      memberLastName: ['', Validators.required],
      memberEmail: ['', [Validators.required, Validators.email]],
      memberMobileNumber1: ['', [Validators.required,Validators.pattern(this.phoneNumberpattern)]],
      memberMobileNumber2: [''],
      memberAddress: ['', Validators.required],
      withdrawal: 0,
      mandalNamesCtl: [null,Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator]],
    });

    this.mandalService.getAllMandalnames()
    .subscribe(data => {
      console.log(data);
      this.mandalNames = data;
    },
    err =>{
      this.msg.error('Something went wrong.Please contact admin.');
    });

  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.addUserForm.controls.confirmPassword.updateValueAndValidity());
  }

  confirmPasswordValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.addUserForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  addRemoveField(){
    this.isclickedAdd = !this.isclickedAdd;
    if(this.isclickedAdd){
      this.addUserForm.controls['memberMobileNumber2'].setValidators([Validators.required,Validators.pattern(this.phoneNumberpattern)])
    }
    else{
      this.addUserForm.controls['memberMobileNumber2'].setValidators([])
    }
    this.addUserForm.controls['memberMobileNumber2'].updateValueAndValidity();

  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [file];
    this.fileToUpload = file;
    return false;
  };

  onSubmit(form: FormGroup) {
    /*
    let tempstr = '';
    tempstr += 'Valid?'+ form.valid + '\n'; // true or false
    tempstr += 'Name'+ form.value.memberFirstName + '\n';
    tempstr += 'Email'+ form.value.memberEmail + '\n';
    tempstr += 'Message'+ form.value.memberAddress + '\n';

    alert(tempstr);

    */
    if (form.valid) {
      let mobilnumbers:[string] = [form.controls.memberMobileNumber1.value]
      if(this.isclickedAdd){
        mobilnumbers.push(form.controls.memberMobileNumber2.value)
      }

      let member: Member = {
        memberFirstName: form.controls.memberFirstName.value,
        memberMiddleName: form.controls.memberMiddleName.value,
        memberLastName: form.controls.memberLastName.value,
        memberEmail: form.controls.memberEmail.value,
        memberMobileNumbers: mobilnumbers,
        memberImgSrc : '',
        memberAddress: form.controls.memberAddress.value,
        withdrawal: IfNullOrEmptyOrBlankThan(form.controls.withdrawal.value, "0"),
        password: form.controls.password.value,
        mandals : form.controls.mandalNamesCtl.value,
        createdBy: "-100",
      };
      this.fileList.forEach((file: any) => {
        this.bodyFormData.set('memberProfilepic', file);
      });
      this.bodyFormData.set('member', JSON.stringify(member));

      this.userService.postUser(this.bodyFormData).subscribe(
        res => {
          console.log(res);
          this.msg.success('Data Saved SucsessFully')
          this.resetForm(form);
        },
        err => {
          if (err.status === 422) {
            this.msg.error(err.error.join('<br/>'));

          }
          else
          this.msg.error('Something went wrong.Please contact admin.');
        }
      );
    }
  }


  resetForm(form: FormGroup) {
    form.reset();
    this.fileList = [];
    this.fileToUpload = null;
  }
}
