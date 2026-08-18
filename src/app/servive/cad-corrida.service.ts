import { Injectable } from '@angular/core';
import { CadCorrida } from '../models/cadastro-corridas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadCorridaService {

  constructor(private http: HttpClient) { }

  listarCorrida(): Observable<CadCorrida[]> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/CadCorrida`;
    return this.http.get<CadCorrida[]>(urlApi);
  }


  adicionarCorrida(cadCorrida: CadCorrida): Observable<CadCorrida> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/CadCorrida`;
    return this.http.post<CadCorrida>(urlApi, cadCorrida);
  }
/*
  excluirAtleta(idAtleta: number): Observable<CadCorrida> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/Atleta/${idAtleta}`;
    return this.http.delete<CadCorrida>(urlApi);
  }

  alterarAtleta(atleta: CadCorrida): Observable<CadCorrida> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/Atleta/${atleta.id}`;
    return this.http.put<CadCorrida>(urlApi, atleta);
  }
*/
}