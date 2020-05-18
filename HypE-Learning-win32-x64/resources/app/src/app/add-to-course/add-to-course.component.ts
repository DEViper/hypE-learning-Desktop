import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-to-course',
  templateUrl: './add-to-course.component.html',
  styleUrls: ['./add-to-course.component.sass']
})
export class AddToCourseComponent implements OnInit {

  course;
  users = []

  constructor(public auth: AuthService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getActiveUsers()
    this.getUsers()
  }

  getActiveUsers() {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      this.http.get("https://hype-learning.herokuapp.com/courses/" + this.route.snapshot.params.id.toString(), httpOptions)
      .subscribe((data) => {
        this.course = data["participants"]
      })
    }
  }

  getUsers() {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      this.http.get("https://hype-learning.herokuapp.com/courses/" + this.route.snapshot.params.id.toString() + "/candidates", httpOptions)
      .subscribe((data) => {
        this.users = []
        let keys = Object.keys(data)
        keys.forEach(i => {
          this.users.push(data[i])
        });
      })
    }
  }

  addToCourse(uid) {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };

      this.http.put("https://hype-learning.herokuapp.com/courses/" + this.route.snapshot.params.id.toString() + "/students/" + uid, {}, httpOptions)
      .subscribe(response => {
        this.getUsers()
        this.getActiveUsers()
        alert("Successfully added user")
      })
    }
  }

  deleteFromCourse(uid) {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };

      this.http.delete("https://hype-learning.herokuapp.com/courses/" + this.route.snapshot.params.id.toString() + "/students/" + uid, httpOptions)
      .subscribe(response => {
        this.getUsers()
        this.getActiveUsers()
        alert("Successfully deleted user")
      })
    }
  }
}
