import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

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

  afterEach(() => {
    httpMock.verify();
  });


  // TESTA O MÉTODO calcularIdade()
  it('deve calcular a idade corretamente', () => {

    const resultado = service.calcularIdade('1976-05-09');

    expect(resultado).toBe(50);
  });


  // TESTA O SERVIÇO listarAtletas()
  // QUE LÊ/LISTA TODOS OS ATLETAS
  it('deve retornar os atletas', () => {

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


  // TESTA O SERVIÇO listarAtleta()
  // QUE BUSCA UM ATLETA PELO ID
  it('deve retornar um atleta pelo ID', () => {

    const atletaMock: Atleta = {
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
    };

    service.listarAtleta(1).subscribe(atleta => {

      expect(atleta.id).toBe(1);
      expect(atleta.nome).toBe('Báiro');
      expect(atleta.cpf).toBe(12345678900);

    });

    const request = httpMock.expectOne(
      'https://6a834612cb486d2434039215.mockapi.io/Atleta/1'
    );

    expect(request.request.method).toBe('GET');

    request.flush(atletaMock);
  });


  // TESTA O SERVIÇO adicionarAtleta()
  // QUE CADASTRA UM NOVO ATLETA
  it('deve adicionar um atleta', () => {

    const novoAtleta: Atleta = {
      nome: 'Carlos',
      cpf: 11122233344,
      sexo: 'M',
      cep: 49000000,
      ruaLogradouro: 'Rua Nova',
      bairro: 'Centro',
      cidade: 'Aracaju',
      uf: 'SE',
      dataNascimento: '2000-05-10',
      id: 3
    };

    service.adicionarAtleta(novoAtleta).subscribe(atleta => {

      expect(atleta).toEqual(novoAtleta);

    });

    const request = httpMock.expectOne(
      'https://6a834612cb486d2434039215.mockapi.io/Atleta'
    );

    expect(request.request.method).toBe('POST');

    expect(request.request.body).toEqual(novoAtleta);

    request.flush(novoAtleta);
  });


  // TESTA O SERVIÇO alterarAtleta()
  // QUE ALTERA OS DADOS DE UM ATLETA
  it('deve alterar um atleta', () => {

    const atletaAlterado: Atleta = {
      nome: 'Báiro Alterado',
      cpf: 12345678900,
      sexo: 'M',
      cep: 12345678,
      ruaLogradouro: 'Rua Alterada',
      bairro: 'Bairro Alterado',
      cidade: 'Aracaju',
      uf: 'SE',
      dataNascimento: '2001-01-20',
      id: 1
    };

    service.alterarAtleta(atletaAlterado).subscribe(atleta => {

      expect(atleta).toEqual(atletaAlterado);

    });

    const request = httpMock.expectOne(
      'https://6a834612cb486d2434039215.mockapi.io/Atleta/1'
    );

    expect(request.request.method).toBe('PUT');

    expect(request.request.body).toEqual(atletaAlterado);

    request.flush(atletaAlterado);
  });


  // TESTA O SERVIÇO excluirAtleta()
  // QUE EXCLUI UM ATLETA
  it('deve excluir um atleta', () => {

    service.excluirAtleta(1).subscribe();

    const request = httpMock.expectOne(
      'https://6a834612cb486d2434039215.mockapi.io/Atleta/1'
    );

    expect(request.request.method).toBe('DELETE');

    request.flush(null);
  });

});
