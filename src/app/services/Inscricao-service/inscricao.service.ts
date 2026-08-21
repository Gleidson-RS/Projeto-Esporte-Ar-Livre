import { Injectable } from '@angular/core';

import { Inscricao } from '../../models/inscricao';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {

  constructor(private http: HttpClient) { }


  // Retorna a lista de TODAS as inscrições
  listarInscricoes(): Observable<Inscricao[]> {

    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/Inscricao`;

    return this.http.get<Inscricao[]>(urlApi);

  }


  // Busca apenas UMA inscrição pelo ID
  listarInscricao(idInscricao: number): Observable<Inscricao> {

    const urlApi =
      `https://6a834612cb486d2434039215.mockapi.io/Inscricao/${idInscricao}`;

    return this.http.get<Inscricao>(urlApi);

  }


  // Adiciona uma nova inscrição
  adicionarInscricao(inscricao: Inscricao): Observable<Inscricao> {

    const urlApi =
      `https://6a834612cb486d2434039215.mockapi.io/Inscricao`;

    return this.http.post<Inscricao>(urlApi, inscricao);

  }


  // Exclui uma inscrição
  excluirInscricao(idInscricao: number): Observable<Inscricao> {

    const urlApi =
      `https://6a834612cb486d2434039215.mockapi.io/Inscricao/${idInscricao}`;

    return this.http.delete<Inscricao>(urlApi);

  }


  // Altera uma inscrição
  alterarInscricao(inscricao: Inscricao): Observable<Inscricao> {

    const urlApi =
      `https://6a834612cb486d2434039215.mockapi.io/Inscricao/${inscricao.id}`;

    return this.http.put<Inscricao>(urlApi, inscricao);

  }

}