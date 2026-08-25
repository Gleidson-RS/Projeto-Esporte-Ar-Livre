import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Inscricao } from '../../models/inscricao';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {

  private readonly urlApi =
    'https://6a8c714563f113bab0b84814.mockapi.io/inscritos';

  constructor(
    private http: HttpClient
  ) {}

  // Retorna a lista de TODAS as inscrições
  listarInscricoes(): Observable<Inscricao[]> {

    return this.http.get<Inscricao[]>(
      this.urlApi
    );
  }

  // Busca apenas UMA inscrição pelo ID
  listarInscricao(
    idInscricao: number
  ): Observable<Inscricao> {

    const url =
      `${this.urlApi}/${idInscricao}`;

    return this.http.get<Inscricao>(
      url
    );
  }

  // Adiciona uma nova inscrição
  adicionarInscricao(
    inscricao: Inscricao
  ): Observable<Inscricao> {

    return this.http.post<Inscricao>(
      this.urlApi,
      inscricao
    );
  }

  // Exclui uma inscrição
  excluirInscricao(
    idInscricao: number
  ): Observable<Inscricao> {

    const url =
      `${this.urlApi}/${idInscricao}`;

    return this.http.delete<Inscricao>(
      url
    );
  }

  // Altera uma inscrição
  alterarInscricao(
    inscricao: Inscricao
  ): Observable<Inscricao> {

    const url =
      `${this.urlApi}/${inscricao.id}`;

    return this.http.put<Inscricao>(
      url,
      inscricao
    );
  }
}
