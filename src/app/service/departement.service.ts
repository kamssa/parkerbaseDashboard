import { Injectable } from '@angular/core';
import {Departement} from "../models/Departement";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Resultat} from "../models/resultat";
import {Observable, of, Subject} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
// observables sources
  private entrepriseCreerSource = new Subject<Resultat<Departement>>();
  private entrepriseModifSource = new Subject<Resultat<Departement>>();
  private entrepriseFiltreSource = new Subject<string>();
  private entrepriseSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  entrepriseCreer$ = this.entrepriseCreerSource.asObservable();
  entrepriseModif$ = this.entrepriseModifSource.asObservable();
  entrepriseFiltre$ = this.entrepriseFiltreSource.asObservable();
  entrepriseSupprime$ = this.entrepriseSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllDepartement(): Observable<Resultat<Departement[]>> {
    return this.http.get<Resultat<Departement[]>>(`${environment.apiUrl}/api/departement`);
  }

  ajoutDepartement(departement: Departement): Observable<Resultat<Departement>> {
    console.log('methode du service qui ajoute  entreprise', departement);
    return this.http.post<Resultat<Departement>>(`${environment.apiUrl}/api/departement`, departement);
  }
  modifDepartement(entreprise: Departement): Observable<Resultat<Departement>> {
    console.log('methode du service qui modifier categorie', entreprise);
    return this.http.put<Resultat<Departement>>(`${environment.apiUrl}/api/departement`, entreprise);
  }
  getDepartementById(id: number): Observable<Resultat<Departement>> {
    return this.http.get<Resultat<Departement>>(`${environment.apiUrl}/api/departement/${id}`);
  }
  supprimerDepartement(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/departement/${id}`);

  }

  entrepriseCreer(res: Resultat<Departement>) {
    console.log('entreprise a ete  creer correctement essaie source');
    this.entrepriseCreerSource.next(res);
  }

  entrepriseModif(res: Resultat<Departement>) {
    this.entrepriseModifSource.next(res);
  }

  filtreentreprise(text: string) {
    this.entrepriseFiltreSource.next(text);
  }

  categorieSupprime(res: Resultat<boolean>) {
    this.entrepriseSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('categorieService: ' + message);

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
