import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {Resultat} from "../models/resultat";
import {environment} from "../../environments/environment";

import {Employe} from "../models/Employe";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private employeCreerSource = new Subject<Resultat<Employe>>();
  private employeModifSource = new Subject<Resultat<Employe>>();
  private employeFiltreSource = new Subject<string>();
  private employeSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  employeCreer$ = this.employeCreerSource.asObservable();
  employeModif$ = this.employeModifSource.asObservable();
  employeFiltre$ = this.employeFiltreSource.asObservable();
  employeSupprime$ = this.employeSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllEmploye(): Observable<Resultat<Employe[]>> {
    return this.http.get<Resultat<Employe[]>>(`${environment.apiUrl}/api/employe`);
  }

  ajoutEmploye(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui ajoute un employe', employe);
    return this.http.post<Resultat<Employe>>(`${environment.apiUrl}/api/employe`, employe);
  }
  modifEmploye(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui modifier Employe', employe);
    return this.http.put<Resultat<Employe>>(`${environment.apiUrl}/api/employe`, employe);
  }
  getEmployeById(id: Employe): Observable<Resultat<Employe>> {
    return this.http.get<Resultat<Employe>>(`${environment.apiUrl}/api/employe/${id}`);
  }
  supprimerEmploye(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/employe/${id}`);

  }

  travauxCreer(res: Resultat<Employe>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.employeCreerSource.next(res);
  }

  abonnesModif(res: Resultat<Employe>) {
    this.employeModifSource.next(res);
  }

  filtreEmploye(text: string) {
    this.employeFiltreSource.next(text);
  }
  employeSupprime(res: Resultat<boolean>) {
    this.employeSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('employeService: ' + message);

  }

  ///////////////////////////////////////////
  // recuper les erreurs


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
