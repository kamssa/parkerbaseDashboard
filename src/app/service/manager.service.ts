import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {Employe} from "../models/Employe";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {environment} from "../../environments/environment";
import {Manager} from "../models/Manager";
import {Personne} from "../models/Personne";
import {Entreprise} from "../models/Entreprise";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private managerCreerSource = new Subject<Resultat<Employe>>();
  private managerModifSource = new Subject<Resultat<Employe>>();
  private managerFiltreSource = new Subject<string>();
  private managerSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  managerCreer$ = this.managerCreerSource.asObservable();
  managerModif$ = this.managerModifSource.asObservable();
  managerFiltre$ = this.managerFiltreSource.asObservable();
  managerSupprime$ = this.managerSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllManager(): Observable<Resultat<Manager[]>> {
    return this.http.get<Resultat<Manager[]>>(`${environment.apiUrl}/api/auth/manager`);
  }
  ajoutPersonne(personne: Personne): Observable<Resultat<Personne>> {
    console.log('methode du service qui ajoute un manager', personne);
    return this.http.post<Resultat<Personne>>(`${environment.apiUrl}/api/auth/signupManage`, personne);
  }
  personneCreer(res: Resultat<Personne>) {
    console.log('enseignant a ete  creer correctement essaie source');
    this.managerCreerSource.next(res);
  }

  personneModif(res: Resultat<Personne>) {
    this.managerModifSource.next(res);
  }

  filtrepersonne(text: string) {
    this.managerFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('personneService: ' + message);

  }
  ///////////////////////////////////////////
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
