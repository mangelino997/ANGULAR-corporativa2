import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographyGifComponent } from './photography-gif.component';

describe('PhotographyGifComponent', () => {
  let component: PhotographyGifComponent;
  let fixture: ComponentFixture<PhotographyGifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographyGifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographyGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
