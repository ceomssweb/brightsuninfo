import { Component, OnInit } from '@angular/core';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'bs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public usersForm!: UntypedFormGroup;
  constructor(
    public fb: UntypedFormBuilder,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userFormData();
  }

  userFormData() {
     this.usersForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
     });
  }

  applyCourses(){
        // const storage = getStorage();
        //   const storageRef = ref(storage, 'users-documents/' + this.userApi.userPath + '/' + this.userPhone + '/' + this.file[i].name);
          
        //     this.userApi.AddUsers(this.usersForm.value, this.fileNames, this.finalDoc);
            
        //     this.toastr.success(
        //       this.usersForm.controls['fullName'].value + ' successfully added!'
        //     );
            this.ResetForm();
    
  }
  ResetForm(){
    this.usersForm.reset();
  }
}
