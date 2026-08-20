import { Injectable } from '@angular/core';
import { CadCorrida } from '../../models/cadastro-corridas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadCorridaService {

  constructor(private http: HttpClient) { }

  // Retorna a lista de TODAS as corridas (renomeado para o plural)
  listarCorridas(): Observable<CadCorrida[]> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/CadCorrida`;
    return this.http.get<CadCorrida[]>(urlApi);
  }

  // MÉTODO ADICIONADO: Busca apenas UMA corrida pelo ID
  listarCorrida(idCadCorrida: number): Observable<CadCorrida> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/CadCorrida/${idCadCorrida}`;
    return this.http.get<CadCorrida>(urlApi);
  }

  adicionarCorrida(cadCorrida: CadCorrida): Observable<CadCorrida> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/CadCorrida`;
    return this.http.post<CadCorrida>(urlApi, cadCorrida);
  }

  excluirCorrida(idCadCorrida: number): Observable<CadCorrida> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/CadCorrida/${idCadCorrida}`;
    return this.http.delete<CadCorrida>(urlApi);
  }

  alterarCorrida(cadCorrida: CadCorrida): Observable<CadCorrida> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/CadCorrida/${cadCorrida.id}`;
    return this.http.put<CadCorrida>(urlApi, cadCorrida);
  }

}