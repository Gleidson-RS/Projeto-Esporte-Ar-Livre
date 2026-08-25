import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { AtletaService } from './atleta.service';

describe('AtletaService', () => {

  let service: AtletaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AtletaService,
        provideHttpClient()
      ]
    });

    service = TestBed.inject(AtletaService);
  });

  it('deve calcular a idade corretamente', () => {
    const resultado = service.calcularIdade('1976-05-09');

    expect(resultado).toBe(50);
  });

});