import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityManagement } from './security-management';

describe('SecurityManagement', () => {
  let component: SecurityManagement;
  let fixture: ComponentFixture<SecurityManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
