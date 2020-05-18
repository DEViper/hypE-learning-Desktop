import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditquizComponent } from './editquiz.component';

import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatSelectModule } from '@angular/material/select'; 
import { HttpClientModule } from '@angular/common/http';
import { Router } from "@angular/router";

describe('EditquizComponent', () => {
  let component: EditquizComponent;
  let fixture: ComponentFixture<EditquizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditquizComponent ],
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatMenuModule,
        MatSelectModule,
        RouterTestingModule
      ],
      providers: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
