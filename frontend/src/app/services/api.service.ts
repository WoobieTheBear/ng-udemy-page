import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, catchError, map } from "rxjs";
import { baseUrl } from "../app.config";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient){}
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With',
    });

    sendData(data: any): Observable<any[]>{
        const body = JSON.stringify(data)
        return this.http.post( `${baseUrl}/recipes`, body, { headers: this.headers } ).pipe(
            map( (data) => { return <any[]>data; } ),
            catchError( (err) => {
                const { error: errorObject } = err;
                console.error( 'sendData() error:', errorObject)
                return EMPTY;
            } )
        );
    }
    getData(): Observable<any[]> {
        return this.http.get( `${baseUrl}/recipes` ).pipe( 
            map( (data) => { return <any[]>data; } ),
            catchError( (err) => {
                console.error( 'getData() error:', err)
                return EMPTY;
            } )
        );
    }
    deleteData(id: string): Observable<any[]>{
        console.log('deleteData()', id);
        return this.http.delete( `${baseUrl}/recipes/${id}` ).pipe( 
            map( (data) => { return <any[]>data; } ),
            catchError( (err) => {
                console.error( 'getData() error:', err)
                return EMPTY;
            } )
        )
    }
}