import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisOrthopantographyComponent } from './analysis-orthopantography.component';

describe('AnalysisOrthopantographyComponent', () => {
  let component: AnalysisOrthopantographyComponent;
  let fixture: ComponentFixture<AnalysisOrthopantographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisOrthopantographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisOrthopantographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
