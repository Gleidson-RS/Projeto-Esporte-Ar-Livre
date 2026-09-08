import { Injectable } from '@angular/core';
import { Atleta } from '../../models/atleta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {

  private readonly apiUrl = 'http://127.0.0.1:8000/pessoa/';

  constructor(private http: HttpClient) { }

  // Listar elementos
  listarAtletas(): Observable<Atleta[]> {
    return this.http.get<Atleta[]>(this.apiUrl);
  }

  // Listar elemento
  listarAtleta(id: number): Observable<Atleta> {
    const urlApi = `${this.apiUrl}${id}`;
    return this.http.get<Atleta>(urlApi);
  }

  // Adicionar elemento
  adicionarAtleta(atleta: Atleta): Observable<Atleta> {
    return this.http.post<Atleta>(this.apiUrl, atleta);
  }

  // Remover elemento
  excluirAtleta(id: number): Observable<Atleta> {
    const urlApi = `http://127.0.0.1:8000/pessoa/${id}`
    return this.http.delete<Atleta>(urlApi);
  }


  // Alterar elemento
  alterarAtleta(atleta: Atleta): Observable<Atleta> {
    const urlApi = `${this.apiUrl}${atleta.id}`;
    return this.http.put<Atleta>(urlApi, atleta);
  }
  

  // Calcular idade
  calcularIdade(datanascimento: string): number {

    if (!datanascimento) return 0;

    const hoje = new Date();
    const nascimento = new Date(datanascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (
      mes < 0 ||
      (mes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
  }

  // Calcular IMC
  calcularIMC(peso: number, altura: number): number {

    const IMC = peso / (altura * altura);

    if (IMC < 18.5) {
      

    } else if (IMC >= 18.5 && IMC < 25) {


    } else if (IMC >= 25 && IMC < 30) {
      
    } else if (IMC >= 30 && IMC < 35) {

    } else if (IMC >= 35 && IMC < 40) {

    } else if (IMC >= 40) {
      
    }

    return IMC;
  }

  // Criar objeto atleta
  criarAtleta(
    id: number,
    nome: string,
    cpf:number,
    datanascimento: string,
    peso: number,
    altura: number,
    sexo: string,
    cep :number,
    rua_logradouro: string,
    bairro: string,
    cidade : string,
    uf: string

  ): Atleta {

    const atleta = new Atleta();

    atleta.id = id
    atleta.nome = nome
    atleta.cpf - cpf
    atleta.datanascimento = datanascimento
    atleta.peso = peso
    atleta.altura = altura
    atleta.sexo = sexo
    atleta.cep = cep
    atleta.rua_logradouro = rua_logradouro
    atleta.bairro = bairro
    atleta.cidade = cidade
    atleta.uf = uf

    return atleta;
  }

  // Limpar atleta
  limparAtleta(): Atleta {

    const atleta = new Atleta()

    atleta.id = 0
    atleta.nome = ''
    atleta.cpf = 0
    atleta.datanascimento = ''
    atleta.peso = 0
    atleta.altura = 0
    atleta.sexo = ''
    atleta.cep = 0
    atleta.rua_logradouro = ''
    atleta.bairro = ''
    atleta.cidade = ''
    atleta.uf = ''

    return atleta;
  }
}