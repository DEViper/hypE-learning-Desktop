import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profileeditor',
  templateUrl: './profileeditor.component.html',
  styleUrls: ['./profileeditor.component.sass']
})
export class ProfileeditorComponent implements OnInit {

  file: File = undefined;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(pass) {
    var re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
    return re.test(String(pass));
  }

  editProfile(email, password) {
    if (email == "") {
      alert("Wypełnij pole email")
    } 
    else if (!this.validateEmail(email)) {
      alert("Błędny email")
    }
    else if (String(password).length > 0){
      if (!this.validatePassword(password)) {
        alert("Błędne hasło (Powinno mieć przynajmniej 8 znaków i zawierać przynajmniej: jedną dużą literę, jedną małą literę i jedną liczbę)")
      }
    }
    else {
      alert("Uploading")
      this.auth.updateUserData(email, password, this.file)
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
