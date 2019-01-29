import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleradiographyGifComponent } from './teleradiography-gif.component';

describe('TeleradiographyGifComponent', () => {
  let component: TeleradiographyGifComponent;
  let fixture: ComponentFixture<TeleradiographyGifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleradiographyGifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleradiographyGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
