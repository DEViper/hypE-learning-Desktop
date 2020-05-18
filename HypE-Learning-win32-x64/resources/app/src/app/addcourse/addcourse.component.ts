import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.sass']
})
export class AddcourseComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  addcourse(title, desc, ann) {
    this.auth.addcourse(title, desc, ann)
  }
}
