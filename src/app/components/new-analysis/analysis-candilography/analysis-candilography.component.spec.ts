import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisCandilographyComponent } from './analysis-candilography.component';

describe('AnalysisCandilographyComponent', () => {
  let component: AnalysisCandilographyComponent;
  let fixture: ComponentFixture<AnalysisCandilographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisCandilographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisCandilographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
