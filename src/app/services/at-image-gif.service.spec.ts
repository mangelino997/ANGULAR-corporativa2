import { TestBed } from '@angular/core/testing';

import { AtImageGifService } from './at-image-gif.service';

describe('AtImageGifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtImageGifService = TestBed.get(AtImageGifService);
    expect(service).toBeTruthy();
  });
});
