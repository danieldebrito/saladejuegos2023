import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NaipesService {

  constructor(private http: HttpClient) { }

  obtenerCartas() {
    const url = 'assets/juegos/mayormenor/files.json'; // Ruta al archivo JSON con los datos de las cartas

    return this.http.get(url).pipe(
      map((response: any) => response.naipes)
    );
  }
}