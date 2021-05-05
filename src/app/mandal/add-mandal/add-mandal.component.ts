import { MandalService } from './../../shared/services/mandal.service';
import { Mandal } from './../../shared/models/mandal.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IfNullOrEmptyOrBlankThan } from 'src/app/shared/utils/strings';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-mandal',
  templateUrl: './add-mandal.component.html',
  styleUrls: ['./add-mandal.component.css']
})
export class AddMandalComponent implements OnInit {

  addMandalForm: FormGroup;
  fileList: NzUploadFile[] = [];
  fileToUpload: NzUploadFile = null;
  bodyFormData = new FormData();


  constructor(private mandalService: MandalService, private fb: FormBuilder, private msg: NzMessageService) { }

  ngOnInit(): void {
    this.addMandalForm = this.fb.group({
      mandalName: [null, Validators.required],
      installmentValue: [null, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]+)?$")]],
      totalWithdrawal: [null, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]+)?$")]],
      totalBalence: [null, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]+)?$")]],
      intrestRate: [null, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]+)?$")]],
    });

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

      console.log(this.fileToUpload);
      let mandal: Mandal = {
        mandalName: form.controls.mandalName.value,
        mandalLogo: '',
        installmentValue: form.controls.installmentValue.value,
        totalWithdrawal: form.controls.totalWithdrawal.value,
        totalBalence: form.controls.totalBalence.value,
        intrestRate: form.controls.intrestRate.value,
        history: null,
        createdBy: "-100",
      };
      this.fileList.forEach((file: any) => {
        this.bodyFormData.set('mandalLogo', file);
      });
      this.bodyFormData.set('mandal', JSON.stringify(mandal));

      //alert(mandal.mandalLogo);
      this.mandalService.postMandal(this.bodyFormData).subscribe(
        res => {
          console.log(res);
          this.msg.success('Data Saved SuccsessFully');
          this.resetForm(form);
        },
        err => {
          if (err.status === 422) {
            this.msg.error(`${err.error.join('<br/>')}`);

          }
          else
            this.msg.error('Something went wrong.Please contact admin.');
        }
      );
    }
  }

  // onSubmit(form: NgForm) {

  // }


  resetForm(form: FormGroup) {

    form.reset();
    this.fileList = [];
    this.fileToUpload = null;
  }

}
