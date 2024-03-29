import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MessageService } from '../_services/message.service';
import { SocketService } from '../_services/socket.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {

  env = environment //For use in view (.html)
  search: string = ''

  constructor(
    public userService: UserService,
    private socketService: SocketService,
    private messageService: MessageService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(environment.appName + ': ' + sessionStorage.getItem('username'))
    this.userService.users = []
    this.socketService.socket.connect()
  }

  ngOnDestroy(): void { this.socketService.socket.disconnect() }

  /*
    * When a user is selected on the left pane
  */
 
  selectUser(event: Event) {
    this.userService.select(event)
    this.socketService.socket.emit('load', this.userService.currentUser.sId)
  }

  sendMessage() { this.messageService.send() }

}
