import { TestBed } from '@angular/core/testing';

import { ArManagement } from './ar-management';

describe('ArManagement', () => {
  let service: ArManagement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArManagement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
