import { TestBed, async, inject } from '@angular/core/testing';

import { InstructorGuard } from './instructor.guard';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

describe('InstructorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [InstructorGuard]
    });
  });

  it('should ...', inject([InstructorGuard], (guard: InstructorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
