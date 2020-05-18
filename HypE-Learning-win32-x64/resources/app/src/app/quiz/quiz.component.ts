import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {

  quiz = {};
  answers = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, public auth: AuthService) { }

  ngOnInit() {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      this.http.get("https://hype-learning.herokuapp.com/quizzes/" + this.route.snapshot.params.qid.toString(), httpOptions)
      .subscribe((data) => {
        this.quiz = data
      })
    }
  }

  changeAnswer(id, answer) {
    this.answers[id] = answer;
  }

  sendAnswers() {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      let data = { "answers": this.answers }
      this.http.post("https://hype-learning.herokuapp.com/quizzes/solve/" + this.route.snapshot.params.qid.toString(), data, httpOptions)
      .subscribe((data) => {
        alert(data + "% Prawidłowych odpowiedzi")
      })
    }
  }
}
