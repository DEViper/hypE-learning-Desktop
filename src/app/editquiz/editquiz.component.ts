import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-editquiz',
  templateUrl: './editquiz.component.html',
  styleUrls: ['./editquiz.component.sass']
})
export class EditquizComponent implements OnInit {

  quiz = {};
  answers = [];
  questions = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, public auth: AuthService) { }

  ngOnInit() {
    this.getQuizzes()
  }

  getQuizzes() {
    if (this.auth.$user != undefined) {
      this.quiz = {};
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

  addQuiz() {
    this.questions.unshift(
      {"a": "",
      "b": "",
      "c": "",
      "d": "",
      "title": "",
      "correct": ""}
    )
  }

  updateQuestion(id, tag, event) {
    id[tag] = event.originalTarget.value
  }

  sendQuestion(data) {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      let formdata = data;
      formdata["correctAnswer"] = data["correct"]
      delete formdata["correct"]
      this.http.post("https://hype-learning.herokuapp.com/quizzes/" + this.route.snapshot.params.qid.toString() + "/question", data, httpOptions)
      .subscribe((data1) => {
        this.questions.splice(this.questions.indexOf(data), 1)
        this.getQuizzes()
        alert("Dodano Pytanie")
      })
    }
  }
}
