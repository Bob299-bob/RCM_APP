import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenialList } from './denial-list';

describe('DenialList', () => {
  let component: DenialList;
  let fixture: ComponentFixture<DenialList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenialList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenialList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
