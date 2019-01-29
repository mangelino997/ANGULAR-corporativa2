import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthopantomographyGifComponent } from './orthopantomography-gif.component';

describe('OrthopantomographyGifComponent', () => {
  let component: OrthopantomographyGifComponent;
  let fixture: ComponentFixture<OrthopantomographyGifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthopantomographyGifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthopantomographyGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
