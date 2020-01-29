
import { Injectable } from '@nestjs/common';
import { UserBody } from './user';


@Injectable()
export class UsersService {
  private users: UserBody[];

  constructor() {
    this.users = [
      {
        userId:"1",
        username: 'yassine',
        password: 'changeme',
        roles: ['user'],
      },
      {
        userId:"2",
        username: 'mohamed',
        password: 'changeme',
        roles: ['admin'],
      },
    ];
  }

  async findOne(username: string): Promise<UserBody | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createOne(user : any){

    if (this.UserExists(user.username)) {
      return "User exists.."
    }
    else{
      let userbody : UserBody ={
        userId : this.uuidv4(),
        username:user.username,
        password : user.password,
        roles: ['user'],
      };
  
      this.users.push(userbody);
      const {password , ...result} = userbody;
      return userbody;
    }

  }

  async getUsers() : Promise<UserBody[]> {
    return this.users;
  }

  uuidv4() { 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { 
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); 
    return v.toString(16); 
       }); 
    }

    UserExists(username: string): boolean {
      return this.users.some(x=> x.username == username);
    }
  

}