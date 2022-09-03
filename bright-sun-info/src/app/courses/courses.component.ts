import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDocuments } from '../services/document.sevices';
@Component({
  selector: 'bs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public usersForm!: UntypedFormGroup;
  userPhone: string = '';
  clientName: string = '';
  constructor(
    public fb: UntypedFormBuilder,
    public userApi: UsersDocuments,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userApi.GetUsersList();
    this.userFormData();
  }

  userFormData() {
     this.usersForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
     });
  }

  get fullName() {
    return this.usersForm.get('fullName');
  }

  get mobileNumber() {
    return this.usersForm.get('mobileNumber');
  }

  applyCourses(){
        this.userPhone = this.mobileNumber?.value;
        this.clientName = this.fullName?.value;
        if(this.clientName){
          if(!this.usersForm.invalid){
        this.userApi.AddUsers(this.usersForm.value);
            
        this.toastr.success(
          this.usersForm.controls['fullName'].value + ' successfully added!'
        );
        this.ResetForm();
          }else{
            alert("Please add your phone number");
          }
        }else{
          alert("Please enter your name");
        }
  }
  ResetForm(){
    this.usersForm.reset();
  }
}
