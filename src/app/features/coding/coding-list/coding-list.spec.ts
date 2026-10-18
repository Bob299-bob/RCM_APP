import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingList } from './coding-list';

describe('CodingList', () => {
  let component: CodingList;
  let fixture: ComponentFixture<CodingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodingList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
