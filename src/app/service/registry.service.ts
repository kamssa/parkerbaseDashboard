import {Injectable} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../models/resultat";
import {Personne} from "../models/Personne";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  private personneCreerSource = new Subject<Resultat<Personne>>();
  private personneModifSource = new Subject<Resultat<Personne>>();
  private personneFiltreSource = new Subject<string>();


// observables streams
  personneCreer$ = this.personneCreerSource.asObservable();
  personneModif$ = this.personneModifSource.asObservable();
  personneFiltre$ = this.personneFiltreSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }


  ajoutPersonne(personne: Personne): Observable<Resultat<Personne>> {
    console.log('methode du service qui ajoute un employe', personne);
    return this.http.post<Resultat<Personne>>(`${environment.apiUrl}/api/auth/signup`, personne);
  }

  personneCreer(res: Resultat<Personne>) {
    console.log('enseignant a ete  creer correctement essaie source');
    this.personneCreerSource.next(res);
  }

  personneModif(res: Resultat<Personne>) {
    this.personneModifSource.next(res);
  }

  filtrepersonne(text: string) {
    this.personneFiltreSource.next(text);
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
