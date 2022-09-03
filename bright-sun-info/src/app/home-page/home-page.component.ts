import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { UsersDocuments } from '../services/document.sevices';

@Component({
  selector: 'bs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  showDocReq:boolean = false;
  file: any = [];
  widthContainer: boolean = false;
  widthVal: number = 0;
  getFilNames: String[] = [];
  progress: number = 0;
  getAllUserPhone: string[] = [];
  public usersDocForm!: UntypedFormGroup;
  fileNames: String[] = [];
  enableAdd: boolean = false;
  userPhone: string = '';

  constructor(public fb: UntypedFormBuilder,
    public userApi: UsersDocuments,
    public toastr: ToastrService,) { }
  
  ngOnChanges(): void{
    let s = this.userApi.GetUsersDocList();
      s.snapshotChanges().subscribe(data => {
        this.getAllUserPhone = [];
        data.forEach(item => {
          let getItem: any = item.payload.toJSON(); 
          getItem['key'] = item.key;
          this.getAllUserPhone.push(getItem.mobileNumber);
        });
      });
}

  ngOnInit(): void {
    this.userFormDocData();
    this.userApi.GetUsersDocList();
    this.ngOnChanges();
  }

  chooseFile(event: any) {
    for (var i = 0; i < event.target.files.length; i++) { 
      this.file.push(event.target.files[i]);
    }
    if(event.target.files.length > 0){
      this.enableAdd = true;
    }
  }
  get fullName() {
    return this.usersDocForm.get('fullName');
  }
  get mobileNumber() {
    return this.usersDocForm.get('mobileNumber');
  }
  onSelDoc(){
    this.showDocReq = true;
  }
  submitUserData(){
    this.userPhone = this.mobileNumber?.value;
    if(this.enableAdd && this.userPhone){
      if(!this.getAllUserPhone.includes(this.mobileNumber?.value)){
        const storage = getStorage();
        for (var i = 0; i < this.file.length; i++) { 
          this.fileNames.push(this.file[i].name);
          const storageRef = ref(storage, 'users-documents/' + this.userPhone + '/' + this.file[i].name);
          const uploadTask = uploadBytesResumable(storageRef, this.file[i]);
          uploadTask.on('state_changed',
            (snapshot) => {
              this.widthContainer=true;
              this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.widthVal = this.progress;
            },
            (error) => {
              console.log(error.message);
              switch (error.code) {
                case 'storage/unauthorized':
                  break;
                case 'storage/canceled':
                  break;
                case 'storage/unknown':
                  break;
              }
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((_downloadURL) => {
               this.getFilNames.push(_downloadURL);
               
              });
              
            }
          );
          
          if(i == (this.file.length - 1)){
            this.userApi.AddUsersDoc(this.usersDocForm.value, this.fileNames, this.fileNames);
            
            this.toastr.success(
              this.usersDocForm.controls['fullName'].value + ' successfully added!'
            );
            this.ResetForm();
            
          }
        }
      }else{
        alert("Phone number already existing in the record! Please add alternate phone number!")
      }
    
  
    
  }else{
    alert("Please add Phone/Mobile number");
  }
  }
  ResetForm() {
    this.usersDocForm.reset();
    this.enableAdd = false;
    this.widthVal = 0;
    this.widthContainer = false;
    this.fileNames = [];
  }
  cancelReq(){
    this.showDocReq = false;
  }
  userFormDocData() {
    this.usersDocForm = this.fb.group({
     fullName: ['', [Validators.required, Validators.minLength(2)]],
     mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
     addedDocuments: ['']
    });
 }
  externalApps(){
    window.open(
      'https://brightsundocuments.com',
      '_blank'
    );
  }
}
