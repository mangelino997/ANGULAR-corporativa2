import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisTeleradiographyComponent } from './analysis-teleradiography.component';

describe('AnalysisTeleradiographyComponent', () => {
  let component: AnalysisTeleradiographyComponent;
  let fixture: ComponentFixture<AnalysisTeleradiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisTeleradiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisTeleradiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
