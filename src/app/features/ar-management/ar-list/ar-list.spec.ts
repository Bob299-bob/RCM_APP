import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArList } from './ar-list';

describe('ArList', () => {
  let component: ArList;
  let fixture: ComponentFixture<ArList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
