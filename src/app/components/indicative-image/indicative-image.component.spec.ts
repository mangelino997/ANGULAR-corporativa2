import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicativeImageComponent } from './indicative-image.component';

describe('IndicativeImageComponent', () => {
  let component: IndicativeImageComponent;
  let fixture: ComponentFixture<IndicativeImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicativeImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicativeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
