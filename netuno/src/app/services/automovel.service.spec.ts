import { TestBed } from '@angular/core/testing';

import { AutomovelService } from './automovel.service';

describe('AutomovelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutomovelService = TestBed.get(AutomovelService);
    expect(service).toBeTruthy();
  });
});
