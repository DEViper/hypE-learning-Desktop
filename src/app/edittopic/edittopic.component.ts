import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edittopic',
  templateUrl: './edittopic.component.html',
  styleUrls: ['./edittopic.component.sass']
})
export class EdittopicComponent implements OnInit {

  topic = {};
  file: File = undefined;

  constructor(public auth: AuthService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      this.http.get("https://hype-learning.herokuapp.com/courses/" + this.route.snapshot.params.cid.toString() + "/topics", httpOptions).subscribe(response => {
        let keys = Object.keys(response)
        keys.forEach(i => {
          if (response[i].id == this.route.snapshot.params.tid.toString()) {
            this.topic = response[i]
          }
        });
      })
    }
  }

  addTopic(topic, desc) {
    if (topic == "") {
      alert("Wypełnij pole Tytuł")
    } 
    else if (desc == "") {
      alert("Wypełnij pole Opis")
    }
    else if (this.auth.$user != undefined) {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      let formData: FormData = new FormData();
      if (this.file == undefined) {
        formData.append('description', desc);
        formData.append('title', topic);  
        formData.append('courseId', this.route.snapshot.params.cid.toString())
      }
      else {
        formData.append('description', desc);
        formData.append('title', topic);  
        formData.append('courseId', this.route.snapshot.params.cid.toString())
        formData.append('file', this.file, this.file.name);
      }
      this.http.put("https://hype-learning.herokuapp.com/topics/" + this.route.snapshot.params.tid.toString(), formData, httpOptions).subscribe(response => {
        alert("Uploaded")
      })
    }
  }

  sendFile(event) {
    var fileToUpload: File = null;
    fileToUpload = event.item(0);
    this.file = fileToUpload
  }

  clickFile() {
    document.getElementById("getfile").click()
  }
}
