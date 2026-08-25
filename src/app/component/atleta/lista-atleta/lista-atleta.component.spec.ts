import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import { AtletaService } from '../../../services/Atleta-service/atleta.service';
import { Atleta } from '../../../models/atleta';

describe('AtletaService', () => {

  let service: AtletaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AtletaService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(AtletaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('deve calcular a idade corretamente', () => {
    const resultado = service.calcularIdade('1976-05-09');

    expect(resultado).toBe(50);
  });


  // TESTA O SERVIÇO "listarAtletas()" QUE LER/LISTA OS ATLETAS
  it('Deve retornar as pessoas', () => {

    const atletasMock: Atleta[] = [
      {
        nome: 'Báiro',
        cpf: 12345678900,
        sexo: 'M',
        cep: 12345678,
        ruaLogradouro: 'Rua do Salve',
        bairro: 'Bairro do Salve',
        cidade: 'Cidade do Salve',
        uf: 'Estado do Salve',
        dataNascimento: '2001-01-20',
        id: 1
      },
      {
        nome: 'Ana maria',
        cpf: 12345678911,
        sexo: 'F',
        cep: 98765432,
        ruaLogradouro: 'Rua do Salve²',
        bairro: 'Bairro do Salve²',
        cidade: 'Cidade do Salve²',
        uf: 'Estado do Salve²',
        dataNascimento: '2009-12-10',
        id: 2
      }
    ];

    service.listarAtletas().subscribe(atletas => {
      expect(atletas.length).toBe(2);
      expect(atletas[0].nome).toBe('Báiro');
      expect(atletas[1].nome).toBe('Ana maria');
    });

    const request = httpMock.expectOne(
      'https://6a834612cb486d2434039215.mockapi.io/Atleta'
    );

    expect(request.request.method).toBe('GET');

    request.flush(atletasMock);
  });


// TESTA O SERVIÇO "excluirAtleta()" QUE EXCLUI OS ATLETAS
it('deve excluir um atleta', () => {

  service.excluirAtleta(1).subscribe();


  const request = httpMock.expectOne(
    'https://6a834612cb486d2434039215.mockapi.io/Atleta/1'
  );


  expect(request.request.method).toBe('DELETE');


  request.flush(null);

});

});

