import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.sass']
})
export class UserCoursesComponent implements OnInit {

  public courses = [];

  constructor(public auth: AuthService, private http: HttpClient, private router: Router) {  }

  ngOnInit() {
    if (this.auth.$user != undefined) {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      this.http.get("https://hype-learning.herokuapp.com/users/courses", httpOptions).subscribe((data) => {
        let keys = Object.keys(data)
        keys.forEach(i => {
          this.courses.push(data[i])
        });
      })
    }
  }

  showCourse(id) {
    if (this.auth.isLogged()) {
      this.router.navigate(['/course/' + id]);
    }
    else {
      alert("Zaloguj się aby zobaczyć ogłoszenie")
    }
  }
}
