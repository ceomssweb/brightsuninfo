import { Injectable } from '@angular/core';
import { Users, UsersDoc } from './users';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class UsersDocuments {
  MultiUsersRef!: AngularFireList<any>;
  UsersRef!: AngularFireObject<any>;
  // userList!: Users[];
  
  constructor(private db: AngularFireDatabase) {}
  // Create Users
  adminUser: String = 'saravanan039@hotmail.com';
  AddUsers(Users: Users) {
    this.MultiUsersRef.push({
      fullName: Users.fullName,
      mobileNumber: Users.mobileNumber
    });
  }
  AddUsersDoc(Users: UsersDoc, fileNames:any, originalName:any) {
    this.MultiUsersRef.push({
      fullName: Users.fullName,
      mobileNumber: Users.mobileNumber,
      documentName: fileNames,
      docDownloaded: originalName
    });
  }
  GetUsersList() {
    this.MultiUsersRef = this.db.list('Users-list/');
    return this.MultiUsersRef;
  }
  GetUsersDocList() {
    this.MultiUsersRef = this.db.list('Doc-list/');
    return this.MultiUsersRef;
  }
}