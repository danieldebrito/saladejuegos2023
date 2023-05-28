import { Component, OnInit } from '@angular/core';
import { NaipesService } from 'src/app/services/naipes.service';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.scss']
})
export class MayormenorComponent implements OnInit {

  public naipes: any[] = [];
  public cartaAleatoria: any = {};

  constructor(private naipesSv: NaipesService) { }

  public getNaipes() {
    this.naipesSv.obtenerCartas().subscribe((cartas: any[]) => {
      this.naipes = cartas;
      this. obtenerCartaAleatoria();
    });
  }

  public obtenerCartaAleatoria() {
    if (this.naipes) {
      const indiceAleatorio = Math.floor(Math.random() * this.naipes.length);
      this.cartaAleatoria = this.naipes[indiceAleatorio];
    }
  }

  ngOnInit(): void {
    this.getNaipes();
  }
}
