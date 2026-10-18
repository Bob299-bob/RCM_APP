import { TestBed } from '@angular/core/testing';

import { Scrubbing } from './scrubbing';

describe('Scrubbing', () => {
  let service: Scrubbing;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Scrubbing);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
