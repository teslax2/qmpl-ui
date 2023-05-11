import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, GameType } from './models/game';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private baseEndpoint = 'https://jlaj7yuf4f.execute-api.eu-central-1.amazonaws.com';
  private gamesEndpoint = '/events'

  constructor(private http:HttpClient) { }

  getGame(id:string):Observable<Game>{
    let game = this.http.get<Game>(`${this.baseEndpoint}/${this.gamesEndpoint}/${id}`)
    .pipe(
        catchError(error => {console.log(error); return throwError(() => new Error('Something bad happened; please try again later.'));})
      );
    return game
      
  }

  getGames(gameType:GameType, date:Date|undefined, limit:number|undefined, lastPk:string|undefined, lastSk:string|undefined, lastData:string|undefined, lastGameType:string|undefined){

  }
}
