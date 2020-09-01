import { TestBed } from '@angular/core/testing';

import { ClientMeasuresService } from './client-measures.service';

describe('ClientMeasuresService', () => {
  let service: ClientMeasuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientMeasuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
