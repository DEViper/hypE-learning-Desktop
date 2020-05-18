import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.sass']
})
export class CourseComponent implements OnInit {

  public course = {};
  public topics = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, public auth: AuthService) { }

  ngOnInit() {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      this.http.get("https://hype-learning.herokuapp.com/courses/" + this.route.snapshot.params.id.toString(), httpOptions)
      .subscribe((data) => {
        this.course = data
      })
      this.getTopics()
    }
  }

  getTopics() {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      this.topics = [];
      this.http.get("https://hype-learning.herokuapp.com/courses/" + this.route.snapshot.params.id.toString() + "/topics", httpOptions)
      .subscribe((data) => {
        let keys = Object.keys(data)
        keys.forEach(i => {
          if (data[i]["quiz"] == null) {
            data[i]["quiz"] = 0
          }
          this.topics.push(data[i])
        });
      })
    }
  }

  deleteTopic(id) {
    if (this.auth.$user != undefined) {
      if (confirm("Czy napewno chcesz usunąć ten temat?")){
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: ' Bearer ' + this.auth.$user.token,
          })
        }
        this.http.delete("https://hype-learning.herokuapp.com/topics/" + id, httpOptions).subscribe((data) => {
          this.getTopics()
          alert("Deleted");
        })
      }
    }
  }

  async sendFile(event, id) {
    let fileToUpload: File = undefined;
    fileToUpload = event.item(0);
    if (confirm("Czy na pewno chcesz wysłać rozwiązanie")) {
      this.auth.uploadFile(id, fileToUpload)
    }
  }

  clickFile() {
    document.getElementById("getfile").click()
  }
  
  clickLink(id) {
    document.getElementById(id.toString()).click()
  }
}
