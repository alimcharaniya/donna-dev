import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messages = [];
  message;

  donnaReply: string = "Hello, Donna speaking! I can help you make a reserveration. What kind of service can I book for you? Go ahead, tell me anything! ";
  messageValue: string = '';
  conversationString: string = '<li class="right clearfix"><span class="chat-img pull-right"><img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="header"><small class=" text-muted"><span class="glyphicon glyphicon-time"></span>Donna @ The Gentlemens Barbershop </small><strong class="pull-right primary-font">Donna</strong></div><p> ' + this.donnaReply + '</p></div></li>';

  constructor(private chatService:ChatService) {
    console.log("Chat component rendering");
    this.chatService.connect();

    this.chatService.socket.on('donnaReply', (message) => {
      console.log(message);
      this.donnaReplies(message);
    })
  }

  sendMessage(box){
    var userReply = box.value;
    var userReplyString = '<li class="right clearfix"><span class="chat-img pull-right"><img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="header"><small class=" text-muted"><span class="glyphicon glyphicon-time"></span>13 mins ago</small><strong class="pull-right primary-font">Alim Charaniya</strong></div><p>' + userReply + '</p></div></li>';
    console.log("Sending message: " + userReply);
    this.conversationString = this.conversationString + userReplyString;
    this.chatService.sendMessage(userReply);
    box.value = '';
  }

  donnaReplies(msg){
    var userReply = msg;
    var userReplyString = '<li class="right clearfix"><span class="chat-img pull-right"><img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" /></span><div class="chat-body clearfix"><div class="header"><small class=" text-muted"><span class="glyphicon glyphicon-time"></span>13 mins ago</small><strong class="pull-right primary-font">Alim Charaniya</strong></div><p>' + userReply + '</p></div></li>';
    this.conversationString = this.conversationString + userReplyString;
    console.log("DONNA REPLYING!");
  }

}
