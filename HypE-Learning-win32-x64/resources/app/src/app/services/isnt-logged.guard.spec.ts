import { TestBed, async, inject } from '@angular/core/testing';

import { IsntLoggedGuard } from './isnt-logged.guard';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('IsntLoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [IsntLoggedGuard]
    });
  });

  it('should ...', inject([IsntLoggedGuard], (guard: IsntLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
