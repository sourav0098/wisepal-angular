import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorStatisticsComponent } from './tutor-statistics.component';

describe('TutorStatisticsComponent', () => {
  let component: TutorStatisticsComponent;
  let fixture: ComponentFixture<TutorStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
