export class Mensaje {
    constructor(
      public id?: string,
      public nombre?: string,
      public mensaje?: string,
      public fecha?: number,
      public uid?: string, // llave del usr que mando el mensaje
    ) { }
  }