import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [
            { path: '', component: CoursesComponent },
            { path: 'courses', component: CoursesComponent },
            { path: 'course/:id', component: CourseComponent },
            { path: 'course/:id/addtopic', component: AddtopicComponent },
            { path: 'course/:id/candidates', component: AddToCourseComponent },
            { path: 'course/:cid/:tid', component: SolvedComponent },
            { path: 'course/:cid/:tid/edit', component: EdittopicComponent },
            { path: 'course/:cid/:tid/addquiz', component: AddquizComponent },
            { path: 'course/:cid/:tid/:qid', component: QuizComponent },
            { path: 'course/:cid/:tid/:qid/editquiz', component: EditquizComponent },
            { path: 'profile/courses', component: UserCoursesComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'profileeditor', component: ProfileeditorComponent },
            { path: 'addcourse', component: AddcourseComponent },
            { path: 'adminpanel', component: AdminPanelComponent },
            { path: '**', redirectTo: '' },
          ]
        ),
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatMenuModule,
        MatSelectModule
      ],
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
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        HttpClientModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'HypE-Learning'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('HypE-Learning');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('HypE-Learning app is running!');
  // });
});
