import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRadiographyComponent } from './patient-radiography.component';

describe('PatientRadiographyComponent', () => {
  let component: PatientRadiographyComponent;
  let fixture: ComponentFixture<PatientRadiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRadiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRadiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
