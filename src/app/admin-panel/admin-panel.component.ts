import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.sass']
})
export class AdminPanelComponent implements OnInit {

  users = []
  userChangeData = {}

  constructor(public auth: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      this.http.get("https://hype-learning.herokuapp.com/users/management", httpOptions)
      .subscribe((data) => {
        let keys = Object.keys(data)
        keys.forEach(i => {
          this.users.push(data[i])
        });
      })
    }
  } 

  updateUser(user) {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };

      if ((document.getElementById("uid-" + user.id) as HTMLInputElement).checked != user.isBlocked) {
        this.http.put("https://hype-learning.herokuapp.com/users/management/changeStatus/" + user.id, {},  httpOptions)
        .subscribe((data) => {
          alert("Updated user ban Status")
        })
      }
      if (this.userChangeData[user.id] != undefined) {
        this.http.put("https://hype-learning.herokuapp.com/users/management/" + this.userChangeData[user.id] + "/" + user.id, {},  httpOptions)
        .subscribe((data) => {
          alert("Updated user role")
          this.router.navigate(['/profile']);
        })
      }
    }
  }

  selected(event, id) {
    this.userChangeData[id] = event.value
  }

}
