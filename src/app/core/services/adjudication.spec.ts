import { TestBed } from '@angular/core/testing';

import { Adjudication } from './adjudication';

describe('Adjudication', () => {
  let service: Adjudication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adjudication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
