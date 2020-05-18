import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solved',
  templateUrl: './solved.component.html',
  styleUrls: ['./solved.component.sass']
})
export class SolvedComponent implements OnInit {

  solutions;
  topic = {};

  constructor(private http: HttpClient, private route: ActivatedRoute, public auth: AuthService) { }

  ngOnInit() {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      this.http.get("https://hype-learning.herokuapp.com/topics/" + this.route.snapshot.params.tid.toString(), httpOptions)
      .subscribe((data) => {
        this.solutions = data
      })
      this.http.get("https://hype-learning.herokuapp.com/courses/" + this.route.snapshot.params.cid.toString() + "/topics", httpOptions)
      .subscribe((data) => {
        let keys = Object.keys(data)
        keys.forEach(i => {
          if (data[i].id == this.route.snapshot.params.tid.toString()) {
            this.topic = data[i]
          }
        });
      })
    }
  }

  clickLink(id) {
    document.getElementById(id.toString()).click()
  }
}
