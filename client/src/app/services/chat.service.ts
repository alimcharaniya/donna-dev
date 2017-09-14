import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3500';
  public socket;

  sendMessage(message){
    this.socket.emit('userMessage', message);
  }

  connect(){
   console.log("Trying to connect");
   this.socket = io(this.url);
  }


}
