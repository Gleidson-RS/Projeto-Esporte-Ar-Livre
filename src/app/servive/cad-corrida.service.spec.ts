import { TestBed } from '@angular/core/testing';

import { CadCorridaService } from './cad-corrida.service';

describe('CadCorridaService', () => {
  let service: CadCorridaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadCorridaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
