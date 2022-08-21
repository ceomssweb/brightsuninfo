import { Component, OnInit } from '@angular/core';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'bs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public usersForm!: UntypedFormGroup;
  constructor(
    public fb: UntypedFormBuilder,
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

  }

}
