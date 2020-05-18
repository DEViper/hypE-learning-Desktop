import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.sass']
})
export class AddquizComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    
  }

  addQuiz(title) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ' Bearer ' + this.auth.$user.token
      })
    };
    let formData = {'title': title};
    
    this.http.post("https://hype-learning.herokuapp.com/quizzes/" + this.route.snapshot.params.tid.toString(), formData, httpOptions)
    .subscribe((data1) => {
      alert("Dodano Quiz")
      this.router.navigate(['/course/' + this.route.snapshot.params.cid.toString() + '/' + this.route.snapshot.params.tid.toString() + '/' + data1['id'] + '/editquiz'])
    })
  }
}
