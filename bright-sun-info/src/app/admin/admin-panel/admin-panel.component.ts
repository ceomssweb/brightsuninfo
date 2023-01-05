import { Component, OnInit } from '@angular/core';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import {MenuItem} from 'primeng/api';
import { UsersDocuments } from 'src/app/services/document.sevices';
import { UsersDoc, Users } from 'src/app/services/users';

@Component({
  selector: 'bs-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  items: MenuItem[] = [];
  userList: UsersDoc[] = [];
  courseList: Users[] = [];
  fileNames: String[] = [];
  getActDoc: String[] = [];
  getRowDoc: String[] = [];
  showload:boolean = false;

  constructor(public userApi: UsersDocuments,
    public toastr: ToastrService,) { }

  showDetails(key: any, user: any){
    this.showload = true;
    this.getActDoc = [];
    this.getRowDoc = Object.values(user.docDownloaded);
    const storage = getStorage();
    for(let i = 0; i < this.getRowDoc.length; i++){
      const storageRef = ref(storage, 'users-documents/' + user.mobileNumber + '/' + this.getRowDoc[i]);
      
      getDownloadURL(storageRef)
  .then((url) => {
    this.getActDoc.push(url);
    this.showload = false;
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  })
  }
}

  ngOnInit(): void {
    this.items = [
      {label: 'Forum', icon: 'pi pi-fw pi-home'},
      {label: 'Documents', icon: 'pi pi-fw pi-file'},
      {label: 'Courses', icon: 'pi pi-fw pi-book'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
  ];
  let s = this.userApi.GetUsersDocList();
  s.snapshotChanges().subscribe(data => {
    this.userList = [];
    data.forEach(item => {
      let getItem: any = item.payload.toJSON(); 
      getItem['key'] = item.key;
      this.userList.push(getItem as UsersDoc);
      this.fileNames.push(getItem.documentName);
    });
  });
  let c = this.userApi.GetUsersList();
  c.snapshotChanges().subscribe(data => {
    this.courseList = [];
    data.forEach(item => {
      let getItem: any = item.payload.toJSON(); 
      getItem['key'] = item.key;
      this.courseList.push(getItem as Users);
    });
  });
  }
  downloadFile(getData:any){
    
  }
}
