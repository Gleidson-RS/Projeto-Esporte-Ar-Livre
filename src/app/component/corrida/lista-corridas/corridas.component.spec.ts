import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { CadCorridaService } from '../../../services/Corrida-service/cad-corrida.service';
import { CadCorrida } from '../../../models/cadastro-corridas';

describe('CadCorridaService', () => {

  let service: CadCorridaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CadCorridaService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CadCorridaService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  // TESTA O SERVIÇO "listarCorridas()"
  // QUE LÊ/LISTA TODAS AS CORRIDAS
  it('Deve retornar as corridas', () => {

    const corridasMock: CadCorrida[] = [

      {
        id: 1,
        descricao: 'Corrida de Aracaju',
        data: '2026-09-10',
        distancia5: 5,
        distancia10: 10,
        distancia25: 25,
        preco: 50
      },

      {
        id: 2,
        descricao: 'Corrida Esporte Livre',
        data: '2026-10-15',
        distancia5: 5,
        distancia10: 10,
        distancia25: 25,
        preco: 70
      }

    ];

    service.listarCorridas().subscribe(corridas => {

      expect(corridas.length).toBe(2);

      expect(corridas[0].descricao)
        .toBe('Corrida de Aracaju');

      expect(corridas[1].descricao)
        .toBe('Corrida Esporte Livre');

    });

    const request = httpMock.expectOne(
      'https://6a834612cb486d2434039215.mockapi.io/CadCorrida'
    );

    expect(request.request.method).toBe('GET');

    request.flush(corridasMock);

  });


  // TESTA O SERVIÇO "listarCorrida()"
  // QUE BUSCA UMA CORRIDA PELO ID
  it('Deve retornar uma corrida pelo ID', () => {

    const corridaMock: CadCorrida = {

      id: 1,
      descricao: 'Corrida de Aracaju',
      data: '2026-09-10',
      distancia5: 5,
      distancia10: 10,
      distancia25: 25,
      preco: 50

    };

    service.listarCorrida(1).subscribe(corrida => {

      expect(corrida.id).toBe(1);

      expect(corrida.descricao)
        .toBe('Corrida de Aracaju');

    });

    const request = httpMock.expectOne(
      'https://6a834612cb486d2434039215.mockapi.io/CadCorrida/1'
    );

    expect(request.request.method).toBe('GET');

    request.flush(corridaMock);

  });


  // TESTA O SERVIÇO "adicionarCorrida()"
  // QUE CADASTRA UMA NOVA CORRIDA
  it('Deve adicionar uma corrida', () => {

    const novaCorrida: CadCorrida = {

      id: 3,
      descricao: 'Nova Corrida',
      data: '2026-11-20',
      distancia5: 5,
      distancia10: 10,
      distancia25: 25,
      preco: 80

    };

    service.adicionarCorrida(novaCorrida).subscribe(corrida => {

      expect(corrida).toEqual(novaCorrida);

    });

    const request = httpMock.expectOne(
      'https://6a834612cb486d2434039215.mockapi.io/CadCorrida'
    );

    expect(request.request.method).toBe('POST');

    expect(request.request.body)
      .toEqual(novaCorrida);

    request.flush(novaCorrida);

  });


  // TESTA O SERVIÇO "excluirCorrida()"
  // QUE EXCLUI UMA CORRIDA
  it('Deve excluir uma corrida', () => {

    service.excluirCorrida(1).subscribe();

    const request = httpMock.expectOne(
      'https://6a834612cb486d2434039215.mockapi.io/CadCorrida/1'
    );

    expect(request.request.method).toBe('DELETE');

    request.flush(null);

  });


  // TESTA O SERVIÇO "alterarCorrida()"
  // QUE ALTERA UMA CORRIDA
  it('Deve alterar uma corrida', () => {

    const corridaAlterada: CadCorrida = {

      id: 1,
      descricao: 'Corrida Alterada',
      data: '2026-12-01',
      distancia5: 5,
      distancia10: 10,
      distancia25: 25,
      preco: 90

    };

    service.alterarCorrida(corridaAlterada)
      .subscribe(corrida => {

        expect(corrida).toEqual(corridaAlterada);

      });

    const request = httpMock.expectOne(
      'https://6a834612cb486d2434039215.mockapi.io/CadCorrida/1'
    );

    expect(request.request.method).toBe('PUT');

    expect(request.request.body)
      .toEqual(corridaAlterada);

    request.flush(corridaAlterada);

  });

});
