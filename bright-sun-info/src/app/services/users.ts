export interface Users {
   key: String;
   fullName: String;
   mobileNumber: Number;
   getTime: String
}

export interface UsersDoc {
   key: String;
   fullName: String;
   mobileNumber: Number,
   filename: String,
   originalName: String
}

export interface Columns {
   id: number;
   header: String;
}