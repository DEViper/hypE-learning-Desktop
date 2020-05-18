import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatSelectModule } from '@angular/material/select'; 

import { CourseComponent } from './course/course.component';
import { RegisterComponent } from './register/register.component';
import { ProfileeditorComponent } from './profileeditor/profileeditor.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SolvedComponent } from './solved/solved.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddToCourseComponent } from './add-to-course/add-to-course.component';
import { AddtopicComponent } from './addtopic/addtopic.component';
import { EdittopicComponent } from './edittopic/edittopic.component';
import { EditquizComponent } from './editquiz/editquiz.component';
import { AddquizComponent } from './addquiz/addquiz.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CoursesComponent,
    ProfileComponent,
    LoginComponent,
    CourseComponent,
    RegisterComponent,
    ProfileeditorComponent,
    AddcourseComponent,
    UserCoursesComponent,
    AdminPanelComponent,
    SolvedComponent,
    QuizComponent,
    AddToCourseComponent,
    AddtopicComponent,
    EdittopicComponent,
    EditquizComponent,
    AddquizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
