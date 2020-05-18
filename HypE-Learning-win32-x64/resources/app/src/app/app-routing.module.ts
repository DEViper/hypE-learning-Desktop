import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 

import { LoggedGuard } from "./services/logged.guard";
import { IsntLoggedGuard } from "./services/isnt-logged.guard";
import { AdminGuard } from "./services/admin.guard";
import { InstructorGuard } from "./services/instructor.guard";

import { ProfileeditorComponent } from './profileeditor/profileeditor.component'; 
import { AddcourseComponent } from './addcourse/addcourse.component';
import { UserCoursesComponent } from './user-courses/user-courses.component'; 
import { AdminPanelComponent } from './admin-panel/admin-panel.component'; 
import { SolvedComponent } from './solved/solved.component'; 
import { AddToCourseComponent } from './add-to-course/add-to-course.component'; 
import { AddtopicComponent } from './addtopic/addtopic.component'; 
import { EdittopicComponent } from './edittopic/edittopic.component';
import { QuizComponent } from './quiz/quiz.component'; 
import { EditquizComponent } from './editquiz/editquiz.component';
import { AddquizComponent } from './addquiz/addquiz.component'; 


const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CourseComponent, canActivate: [LoggedGuard] },
  { path: 'course/:id/addtopic', component: AddtopicComponent, canActivate: [LoggedGuard, InstructorGuard] },
  { path: 'course/:id/candidates', component: AddToCourseComponent, canActivate: [LoggedGuard, InstructorGuard] },
  { path: 'course/:cid/:tid', component: SolvedComponent, canActivate: [LoggedGuard, InstructorGuard] },
  { path: 'course/:cid/:tid/edit', component: EdittopicComponent, canActivate: [LoggedGuard, InstructorGuard] },
  { path: 'course/:cid/:tid/addquiz', component: AddquizComponent, canActivate: [LoggedGuard, InstructorGuard] },
  { path: 'course/:cid/:tid/:qid', component: QuizComponent, canActivate: [LoggedGuard] },
  { path: 'course/:cid/:tid/:qid/editquiz', component: EditquizComponent, canActivate: [LoggedGuard, InstructorGuard] },
  { path: 'profile/courses', component: UserCoursesComponent, canActivate: [LoggedGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoggedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [IsntLoggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [IsntLoggedGuard] },
  { path: 'profileeditor', component: ProfileeditorComponent, canActivate: [LoggedGuard] },
  { path: 'addcourse', component: AddcourseComponent, canActivate: [LoggedGuard] },
  { path: 'adminpanel', component: AdminPanelComponent, canActivate: [LoggedGuard, AdminGuard] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
