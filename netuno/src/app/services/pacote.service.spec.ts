import { TestBed } from '@angular/core/testing';

import { PacoteService } from './pacote.service';

describe('PacoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PacoteService = TestBed.get(PacoteService);
    expect(service).toBeTruthy();
  });
});
