import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    public create(user: User) {
        return this.http.post(`${environment.user}/users`, user)
            .pipe(catchError(this.handleError));
    }

    public getByCpf(cpf: string): Observable<User> {
        return this.http.get<User>(`${environment.user}/users/${cpf}`)
            .pipe(catchError(this.handleError));
    }

    public update(cpf: string, user: User) {
        return this.http.put(`${environment.user}/users/${cpf}`, user)
            .pipe(catchError(this.handleError));
    }

    public remove(code: string) {
        return this.http.delete(`${environment.user}/users/${code}`)
            .pipe(catchError(this.handleError));
    }

    public get() {
        return this.http.get(`${environment.user}/users`)
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