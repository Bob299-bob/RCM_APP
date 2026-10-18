import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrubbingList } from './scrubbing-list';

describe('ScrubbingList', () => {
  let component: ScrubbingList;
  let fixture: ComponentFixture<ScrubbingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrubbingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrubbingList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
