import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginData, UserRegisterData } from "./models.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public $user

  constructor(private http: HttpClient, private router: Router) {
    this.$user = JSON.parse(sessionStorage.getItem("userData"))
  }

  isActive(role) {
    if (this.$user != undefined) {
      if (role == "inactive") {
        return false
      }
      else {
        return true
      }
    }
  }

  isInstructor() {
    if (this.$user != undefined) {
      if (this.$user.role == "instructor" || this.$user.role == "admin") {
        return true
      }
      else {
        return false
      }
    }
    
  }

  isAdmin() {
    if (this.$user != undefined) {
      if (this.$user.role == "admin") {
        return true
      }
      else {
        return false
      }
    }
  }

  CanEdit() {
    if (this.$user != undefined) {
      if (this.$user.role == "admin" || this.$user.role == "instructor") {
        return true
      }
      else {
        return false
      }
    }
  }

  isLogged() {
    if (this.$user != undefined) {
      return true
    }
    else {
      return false
    }
  }

  async updateUserData(email, password, fileToSend)  {
    let file: File = fileToSend;
    let formData: FormData = new FormData();

    if (file != undefined) {
      formData.append('file', file, file.name);
    }
    
    formData.append('password', password);
    if (email != "") {
      formData.append('email', email);
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        Authorization: ' Bearer ' + this.$user.token
      })
    };

    this.http.put("https://hype-learning.herokuapp.com/users/" + this.$user.id, formData, httpOptions).subscribe(response => {
      sessionStorage.setItem("userData", JSON.stringify(this.$user))
      alert("Successfully updated Data")
      alert("Now you'll be logged out for security measures")
      this.force_logout()
    })
  }

  async uploadFile(topicID, fileToSend)  {
    let file: File = fileToSend;
    let formData: FormData = new FormData();

    if (file != undefined) {
      formData.append('file', file, file.name);
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        Authorization: ' Bearer ' + this.$user.token
      })
    };

    this.http.post("https://hype-learning.herokuapp.com/topics/" + topicID + "/solutions", formData, httpOptions).subscribe(data1 => {
      alert("Successfully updated Data")
    })
  }

  async getCourse(courseid)  {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: ' Bearer ' + this.$user.token
      })
    };
    return await this.http.get("https://hype-learning.herokuapp.com/courses/" + courseid, httpOptions)
    .subscribe((data) => {
      return data
    })
  }

  async addcourse(title, desc, ann)  {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: ' Bearer ' + this.$user.token
      })
    };
    let data = { "title": title, "description": desc, "announcement": ann }
    await this.http.post("https://hype-learning.herokuapp.com/courses", data, httpOptions).subscribe(response => {
      alert("Successfully created course")
      this.router.navigate(['/']);
    })
  }

  async register(email, password, first, last)  {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    let data: UserRegisterData = {"email": email, "password": password, "firstName": first, "lastName": last}
    await this.http.post<UserRegisterData>("https://hype-learning.herokuapp.com/auth/signup", data, httpOptions).subscribe(response => {
      if (response.email != undefined){
        alert("Successfully registered")
        this.router.navigate(['/']);
      }
      else {
        alert("Error while registering")
      }
    })
  }

  async login(email, password)  {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    let data: UserLoginData = {"email": email, "password": password}
    await this.http.post<UserLoginData>("https://hype-learning.herokuapp.com/auth/signin", data, httpOptions).subscribe(response => {
      if (response["role"] != "inactive" && !response["isBlocked"]) {  
        this.$user = response
        if (this.$user.email != undefined){
          sessionStorage.setItem("userData", JSON.stringify(this.$user))
          alert("Successfully logged in")
          this.router.navigate(['/']);
        }
        else {
          this.$user = undefined;
          alert("Error while logging in")
        }
      }
      else if (response["isBlocked"]) {
        alert("Twoje konto jest zablokowane")
      }
      else {
        alert("Twoje konto nie jest aktywne, zaczekaj na akceptacje od admina")
      }
    })
  }

  force_logout() {
    this.$user = undefined
    sessionStorage.removeItem("userData")
    this.router.navigate(['/']);
  }

  logout() {
    if (confirm("Czy na pewno chcesz się wylogować?")) {
      this.$user = undefined
      sessionStorage.removeItem("userData")
      this.router.navigate(['/']);
    }
  }
}
