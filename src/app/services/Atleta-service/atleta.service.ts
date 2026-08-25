import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Atleta } from '../../models/atleta';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {

  private readonly urlApi =
    'https://6a834612cb486d2434039215.mockapi.io/Atleta';

  constructor(private http: HttpClient) { }


  // ==========================================
  // LISTAR TODOS OS ATLETAS
  // ==========================================

  listarAtletas(): Observable<Atleta[]> {

    return this.http.get<Atleta[]>(
      this.urlApi
    );
  }


  // ==========================================
  // BUSCAR UM ATLETA
  // ==========================================

  listarAtleta(idAtleta: number): Observable<Atleta> {

    return this.http.get<Atleta>(
      `${this.urlApi}/${idAtleta}`
    );
  }


  // ==========================================
  // CADASTRAR ATLETA
  // ==========================================

  adicionarAtleta(
    atleta: Atleta
  ): Observable<Atleta> {

    return this.http.post<Atleta>(
      this.urlApi,
      atleta
    );
  }


  // ==========================================
  // EXCLUIR ATLETA
  // ==========================================

  excluirAtleta(
    idAtleta: number
  ): Observable<Atleta> {

    return this.http.delete<Atleta>(
      `${this.urlApi}/${idAtleta}`
    );
  }


  // ==========================================
  // ALTERAR ATLETA
  // ==========================================

  alterarAtleta(
    atleta: Atleta
  ): Observable<Atleta> {

    return this.http.put<Atleta>(
      `${this.urlApi}/${atleta.id}`,
      atleta
    );
  }


  // ==========================================
  // CALCULAR IDADE
  // ==========================================

  calcularIdade(
    dataNascimento: string
  ): number {

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade =
      hoje.getFullYear() -
      nascimento.getFullYear();

    const mesAtual =
      hoje.getMonth();

    const mesNascimento =
      nascimento.getMonth();

    const diaAtual =
      hoje.getDate();

    const diaNascimento =
      nascimento.getDate();

    if (
      mesAtual < mesNascimento ||
      (
        mesAtual === mesNascimento &&
        diaAtual < diaNascimento
      )
    ) {
      idade--;
    }

    return idade;
  }


  // ==========================================
  // CRIAR OBJETO ATLETA
  // ==========================================
  //
  // Toda a montagem do objeto fica no serviço.
  // O componente não precisa mais conhecer
  // como um Atleta é construído.
  //

  criarAtleta(
    id: number,
    nome: string,
    dataNascimento: string,
    cpf: number,
    sexo: string,
    cep: number,
    ruaLogradouro: string,
    bairro: string,
    cidade: string,
    uf: string
  ): Atleta {

    const atleta = new Atleta();

    atleta.id = id;
    atleta.nome = nome;
    atleta.dataNascimento = dataNascimento;
    atleta.cpf = cpf;
    atleta.sexo = sexo;
    atleta.cep = cep;
    atleta.ruaLogradouro = ruaLogradouro;
    atleta.bairro = bairro;
    atleta.cidade = cidade;
    atleta.uf = uf;

    return atleta;
  }


  // ==========================================
  // LIMPAR ATLETA
  // ==========================================

  limparAtleta(): Atleta {

    const atleta = new Atleta();

    atleta.id = 0;
    atleta.nome = '';
    atleta.dataNascimento = '';
    atleta.cpf = 0;
    atleta.sexo = '';
    atleta.cep = 0;
    atleta.ruaLogradouro = '';
    atleta.bairro = '';
    atleta.cidade = '';
    atleta.uf = '';

    return atleta;
  }
}
