import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Mensaje } from 'src/app/class/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private firestore: Firestore) { }

  public addItem(item: Mensaje) {
    const col = collection(this.firestore, 'mensajes');
    const newDoc = doc(col);

    item.id = newDoc.id; // guardo el id del documento que crea firebase
    setDoc( newDoc, item)
  }

  public getItems() {
    const col = collection(this.firestore, 'mensajes');
    const Observable = collectionData(col);

    Observable.subscribe(res => {
      return res;
    })
  }

  public update(id: string, Item: any) {
    const col = collection(this.firestore, 'mensajes');
    const documento = doc(col, id);

    updateDoc(documento, Item );
  }

  public delete(id: string) {
    const col = collection(this.firestore, 'mensajes');
    const documento = doc(col, id);

    deleteDoc(documento);
  }
}
