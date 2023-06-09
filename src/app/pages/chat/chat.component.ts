import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Mensaje } from 'src/app/class/mensaje';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public userLogged: User = {};
  public messengers: Mensaje[] = [];
  public messenger: Mensaje = {};

  constructor(
    private afAuth: AngularFireAuth,
    private chatSv: ChatService,
    private authSv: AuthService) { }

  public getMessengers() {
    this.chatSv.getItems().subscribe(res => {
      this.messengers = res; // = res.slice(0, 6);
    });
  }

  private getCurretUser() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userLogged.uid = user.uid;
      } else {
        this.userLogged.uid = '';
      }
    });
  }
  /////////////////////////////////////////////////////////////////////////////
  public getUserById(id: string){
    this.authSv.getUserByID(id).subscribe( res => {
    } );
  }

  public saveMensaje(msg: string){
    this.messenger.fecha = new Date().getTime();
    this.messenger.mensaje = msg;
    this.messenger.displayName = 'displayName' // this.userLogged.displayName;
    this.messenger.uid = this.userLogged.uid;

    this.chatSv.addItem(this.messenger);
  }

  ngOnInit(): void {
    this.getCurretUser();
    this.getMessengers();
  }
}
