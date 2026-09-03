import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Atleta } from '../../models/atleta';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {

  private readonly apiUrl =
    'http://127.0.0.1:8000/pessoa/';

  constructor(private http: HttpClient) {}

  // ==========================================
  // LISTAR TODOS OS ATLETAS
  // ==========================================

  listarAtletas(): Observable<Atleta[]> {
    return this.http.get<Atleta[]>(this.apiUrl);
  }

  // ==========================================
  // BUSCAR UM ATLETA PELO ID
  // ==========================================

  listarAtleta(id: number): Observable<Atleta> {
    return this.http.get<Atleta>( `${this.apiUrl}/${id}` );
  }

  // ==========================================
  // CADASTRAR ATLETA
  // ==========================================

  adicionarAtleta(atleta: Atleta): Observable<Atleta> {
    return this.http.post<Atleta>( this.apiUrl, atleta );
  }

  // ==========================================
  // ALTERAR ATLETA
  // ==========================================

  alterarAtleta(atleta: Atleta): Observable<Atleta> {
    return this.http.put<Atleta>( `${this.apiUrl}/${atleta.idpessoa}`, atleta ); 
  }

  // ==========================================
  // EXCLUIR ATLETA
  // ==========================================

  excluirAtleta(id: number): Observable<void> { 
    return this.http.delete<void>( `${this.apiUrl}/${id}` ); 
  }

  // ==========================================
  // CALCULAR IDADE
  // ==========================================

  calcularIdade(data_nascimento: string): number {

    const hoje = new Date();
    const nascimento = new Date(data_nascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if ( mes < 0 || ( mes === 0 && hoje.getDate() < nascimento.getDate()))
    {
      idade--;
    }

    return idade;
  }

  // ==========================================
  // CRIAR OBJETO ATLETA
  // ==========================================

  criarAtleta(
    idpessoa: number,
    nome: string,
    datanascimento: string,
    peso: number,
    altura: number,
    sexo: string,
  ): Atleta {

    const atleta = new Atleta();

    atleta.idpessoa = idpessoa;
    atleta.nome = nome;
    atleta.datanascimento = datanascimento;
    atleta.peso = peso
    atleta.altura = altura
    atleta.sexo = sexo;

    return atleta;
  }

  // ==========================================
  // LIMPAR ATLETA
  // ==========================================

  limparAtleta(): Atleta {

    const atleta = new Atleta();

    atleta.idpessoa = 0;
    atleta.nome = '';
    atleta.datanascimento = '';
    atleta.peso = 0
    atleta.altura = 0
    atleta.sexo = '';

    return atleta;
  }
}
