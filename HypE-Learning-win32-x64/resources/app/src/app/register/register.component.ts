import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

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

  async register(email, password, first, last) {
    if (email == "") {
      alert("Wypełnij pole email")
    } 
    else if (password == "") {
      alert("Wypełnij pole password")
    } 
    else if (!this.validateEmail(email)) {
      alert("Błędny email")
    }
    else if (!this.validatePassword(password)) {
      alert("Błędne hasło (Powinno mieć przynajmniej 8 znaków i zawierać przynajmniej: jedną dużą literę, jedną małą literę i jedną liczbę)")
    }
    else if (String(first).length < 2) {
      alert("Imię powinno zawierać przynajmniej dwa znaki")
    }
    else if (String(last).length < 2) {
      alert("Nazwisko powinno zawierać przynajmniej dwa znaki")
    }
    else {
      await this.auth.register(email, password, first, last)
    }
  }

}
