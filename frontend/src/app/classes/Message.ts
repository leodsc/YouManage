import { Colors } from './MessageColors';

export class Message {
  // defines the behavior of a message received from the server
  static timeout: any;
  static content: string = '';
  static color: Colors;
  static time: number;

  constructor() {}

  changeMessage(message: string, time: number) {}

  static toggleTimeout() {
    if (Message.timeout !== undefined) {
      clearTimeout(Message.timeout);
    }
    Message.timeout = setTimeout(() => {
      Message.content = '';
    }, Message.time);
  }

  static setProperties(content: string, time: number, color: Colors) {
    Message.time = time;
    Message.content = content;
    Message.color = color;
  }
}
