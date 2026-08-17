import { Injectable } from '@angular/core';
import { Atleta } from '../models/atleta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {

  constructor(private http: HttpClient) { }

  listarAtleta(): Observable<Atleta[]> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/Atleta`;
    return this.http.get<Atleta[]>(urlApi);
  }


  adicionarAtleta(atleta: Atleta): Observable<Atleta> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/Atleta`;
    return this.http.post<Atleta>(urlApi, atleta);
  }

  excluirAtleta(idAtleta: number): Observable<Atleta> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/Atleta/${idAtleta}`;
    return this.http.delete<Atleta>(urlApi);
  }

  alterarAtleta(atleta: Atleta): Observable<Atleta> {
    const urlApi = `https://6a834612cb486d2434039215.mockapi.io/Atleta/${atleta.id}`;
    return this.http.put<Atleta>(urlApi, atleta);
  }

}