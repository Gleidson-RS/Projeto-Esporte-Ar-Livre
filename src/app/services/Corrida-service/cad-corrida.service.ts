import { Injectable } from '@angular/core';
import { Corrida } from '../../models/cadastro-corridas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadCorridaService {

  constructor(private http: HttpClient) { }

  // Retorna a lista de TODAS as corridas (renomeado para o plural)
  listarCorridas(): Observable<Corrida[]> {
    const urlApi = `http://127.0.0.1:8000/corrida/`;
    return this.http.get<Corrida[]>(urlApi);
  }

  // MÉTODO ADICIONADO: Busca apenas UMA corrida pelo ID
  listarCorrida(idcorrida: number): Observable<Corrida> {
    const urlApi = `http://127.0.0.1:8000/corrida/${idcorrida}`;
    return this.http.get<Corrida>(urlApi);
  }

  adicionarCorrida(Corrida: Corrida): Observable<Corrida> {
    const urlApi = `http://127.0.0.1:8000/corrida/`;
    return this.http.post<Corrida>(urlApi, Corrida);
  }

  excluirCorrida(idcorrida: number): Observable<Corrida> {
    const urlApi = `http://127.0.0.1:8000/corrida/${idcorrida}`;
    return this.http.delete<Corrida>(urlApi);
  }

  alterarCorrida(Corrida: Corrida): Observable<Corrida> {
    const urlApi = `http://127.0.0.1:8000/corrida/${Corrida.idCorrida}`;
    return this.http.put<Corrida>(urlApi, Corrida);
  }

}