import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  public create(card: Card){
    return this.http.post(`${environment.cards}/cards`, card)
    .pipe(catchError(this.handleError));
   }

   public update(code: string, card: Card){
    return this.http.put(`${environment.cards}/cards/${code}`, card)
    .pipe(catchError(this.handleError));
   }
   
   public remove(code: string){
    return this.http.delete(`${environment.cards}/cards/${code}`)
    .pipe(catchError(this.handleError));
   }

   public get(){
    return this.http.get(`${environment.cards}/cards`)
    .pipe(catchError(this.handleError));
   }

   public getByCode(code: string){
    return this.http.get(`${environment.cards}/cards/${code}`)
    .pipe(catchError(this.handleError));
   }

   public getByCpf(cpf: string){
    return this.http.get(`${environment.cards}/cards/user/${cpf}`)
    .pipe(catchError(this.handleError));
   }

   private handleError(error: HttpErrorResponse) {
     if (error.error instanceof ErrorEvent) {
       console.error('An error occurred:', error.error.message);
     } else {
       console.error(
         `Backend returned code ${error.status}, ` +
         `body was: ${error.error}`);
     }
     return throwError('Ocorreu um erro na integração com a api de templates.');
   }
}
