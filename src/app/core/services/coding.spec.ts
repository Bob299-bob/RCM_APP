import { TestBed } from '@angular/core/testing';

import { Coding } from './coding';

describe('Coding', () => {
  let service: Coding;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Coding);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
