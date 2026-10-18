import { TestBed } from '@angular/core/testing';

import { Denial } from './denial';

describe('Denial', () => {
  let service: Denial;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Denial);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
