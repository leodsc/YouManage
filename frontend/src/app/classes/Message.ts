import { Colors } from './MessageColors';

export class Message {
  // defines the behavior of a message received from the server
  timeout: any;
  message: string = '';
  color: Colors;
  time: number;

  constructor() {}

  // receiveMessage($event: string) {
  //   this.changeMessage($event);
  // }

  changeMessage(message: string, time: number) {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
    }
    this.message = message;
    this.timeout = setTimeout(() => {
      this.message = '';
    }, time);
  }

  toggleTimeout() {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.message = '';
    }, this.time);
  }
}
