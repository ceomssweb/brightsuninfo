import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  showDocReq:boolean = false;
  public usersDocForm!: UntypedFormGroup;

  constructor(@Inject(DOCUMENT) private document: Document, public fb: UntypedFormBuilder) { }
  
  ngOnInit(): void {
    this.userFormDocData();
  }
  chooseFile(event: any){

  }
  onSelDoc(){
    this.showDocReq = true;
  }
  cancelReq(){
    this.showDocReq = false;
  }
  userFormDocData() {
    this.usersDocForm = this.fb.group({
     fullName: ['', [Validators.required, Validators.minLength(2)]],
     mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
 }
  sendDoc(){

  }
  externalApps(){
    window.open(
      'https://brightsundocuments.com',
      '_blank'
    );
  }
}
