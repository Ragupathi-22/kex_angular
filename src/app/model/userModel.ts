// user class
export class UserModel {
  username: string
  password: string
  constructor() {
    this.username = '';
    this.password = '';
  }
}

// user Response 
export interface UserResponseModel {
  success: boolean,
  message: string
}



