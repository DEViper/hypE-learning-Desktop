import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrls: ['./addtopic.component.sass']
})
export class AddtopicComponent implements OnInit {

  file: File = undefined;

  constructor(public auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  addTopic(topic, desc) {
    if (topic == "") {
      alert("Wypełnij pole Tytuł")
    } 
    else if (desc == "") {
      alert("Wypełnij pole Opis")
    }
    else {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: ' Bearer ' + this.auth.$user.token
        })
      };
      let formData: FormData = new FormData();
      if (this.file == undefined) {
        formData.append('description', desc);
        formData.append('title', topic);  
        formData.append('courseId', this.route.snapshot.params.id.toString())
      }
      else {
        formData.append('description', desc);
        formData.append('title', topic);  
        formData.append('courseId', this.route.snapshot.params.id.toString())
        formData.append('file', this.file, this.file.name);
      }
      this.http.post("https://hype-learning.herokuapp.com/topics", formData, httpOptions).subscribe(response => {
        alert("Uploaded")
        this.router.navigate(['./course/' + this.route.snapshot.params.id.toString()]);
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
