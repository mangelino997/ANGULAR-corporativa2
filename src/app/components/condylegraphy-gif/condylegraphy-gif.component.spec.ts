import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondylegraphyGifComponent } from './condylegraphy-gif.component';

describe('CondylegraphyGifComponent', () => {
  let component: CondylegraphyGifComponent;
  let fixture: ComponentFixture<CondylegraphyGifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondylegraphyGifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondylegraphyGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
