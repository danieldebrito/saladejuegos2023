import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public datoUsuario: any;// = {};



  ngOnInit(): void {
    this.datoUsuario = localStorage.getItem('user');
    console.log(this.datoUsuario);
  }
}
