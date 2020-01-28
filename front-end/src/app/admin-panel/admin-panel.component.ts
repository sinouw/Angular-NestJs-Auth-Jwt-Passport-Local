import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { parse } from 'path';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: []
})
export class AdminPanelComponent implements OnInit {

  constructor(private service : UserService,private router: Router) { }

  ngOnInit() {}

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);  
  }
}
