import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Resultat} from '../models/resultat';
import * as jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Admin} from "../models/Admin";
import {Employe} from "../models/Employe";
import {Manager} from "../models/Manager";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private helper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  login(admin: Admin) {
    return this.http.post<Resultat<any>>(`${environment.apiUrl}/api/auth/signin`, admin)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }
  loginManager(manager: Manager) {
    return this.http.post<Resultat<any>>(`${environment.apiUrl}/api/auth/signin`, manager)
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(res.body.body.accessToken));
        this.currentUserSubject.next(res.body.body.accessToken);

        const decoded = jwt_decode(res.body.body.accessToken);
        const exp = this.helper.isTokenExpired(res.body.body.accessToken);
        console.log(exp);
        console.log(decoded.exp);
        console.log(res);
        this.isUserLoggedIn.next(true);
        return res;
      }));
  }
  loginEmploye(employe: Employe) {
    return this.http.post<Resultat<any>>(`${environment.apiUrl}/api/auth/signin`, employe)
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(res.body.body.accessToken));
        this.currentUserSubject.next(res.body.body.accessToken);

        const decoded = jwt_decode(res.body.body.accessToken);
        const exp = this.helper.isTokenExpired(res.body.body.accessToken);
        console.log(exp);
        console.log(decoded.exp);
        console.log(res);
        this.isUserLoggedIn.next(true);
        return res;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isUserLoggedIn.next(false);
  }
}
