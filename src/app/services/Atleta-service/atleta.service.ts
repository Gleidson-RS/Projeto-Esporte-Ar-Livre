import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atleta } from '../../models/atleta';

@Injectable({
providedIn: 'root'
})
export class AtletaService {

private apiUrl =
'https://6a834612cb486d2434039215.mockapi.io/Atleta';

constructor(private http: HttpClient) {}

calcularIdade(dataNascimento: string): number {
const hoje = new Date();
const nascimento = new Date(dataNascimento);

let idade =
  hoje.getFullYear() - nascimento.getFullYear();

const mes =
  hoje.getMonth() - nascimento.getMonth();

if (
  mes < 0 ||
  (mes === 0 && hoje.getDate() < nascimento.getDate())
) {
  idade--;
}

return idade;


}

listarAtletas(): Observable<Atleta[]> {
return this.http.get<Atleta[]>(this.apiUrl);
}

listarAtleta(id: number): Observable<Atleta> {
return this.http.get<Atleta>(
this.apiUrl + '/' + id
);
}

adicionarAtleta(atleta: Atleta): Observable<Atleta> {
return this.http.post<Atleta>(
this.apiUrl,
atleta
);
}

alterarAtleta(atleta: Atleta): Observable<Atleta> {
return this.http.put<Atleta>(
this.apiUrl + '/' + atleta.id,
atleta
);
}

excluirAtleta(id: number): Observable<void> {
return this.http.delete<void>(
this.apiUrl + '/' + id
);
}
}