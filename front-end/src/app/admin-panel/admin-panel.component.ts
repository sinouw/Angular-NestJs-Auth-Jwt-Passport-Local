import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { parse } from 'path';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: []
})
export class AdminPanelComponent implements OnInit {
  helloMessage: string;

  constructor(private adminService : AdminService,private router: Router) { }

  ngOnInit() {
   this.getmessage()
  }

  getmessage(){
    this.adminService.getHelloAdmin()
    .subscribe(res=>{
      this.helloMessage = res;
    },
    err=>{
     console.log(err);
  })
  }

}
