import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeList } from './charge-list';

describe('ChargeList', () => {
  let component: ChargeList;
  let fixture: ComponentFixture<ChargeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
