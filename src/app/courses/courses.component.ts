import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent implements OnInit {

  public courses = [];

  constructor(public auth: AuthService, private http: HttpClient, private router: Router) {  }

  ngOnInit() {
    this.http.get("https://hype-learning.herokuapp.com/courses").subscribe((data) => {
      let keys = Object.keys(data)
      keys.forEach(i => {
        this.courses.push(data[i])
      });
    })
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
