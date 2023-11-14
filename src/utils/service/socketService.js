import io from 'socket.io-client';
import { SOCKET_URL } from '../constants/constants';
import { insertGangMessage } from '../realm/crud-manager/insert';
import { updateMessageLastUpdated } from '../realm/crud-manager/updateMessageEpoch';
import { updateUnreadMessageCount } from '../realm/crud-manager/updateMessageCount';

class SocketService {
  static instance = null;

  constructor() {
    if (!SocketService.instance) {
      this.socket = io(SOCKET_URL);
      this.setupGlobalListeners();
      SocketService.instance = this;
      this.currentRoom = null;
    }

    return SocketService.instance;
  }

  setDispatch(dispatchFunction) {
    this.dispatch = dispatchFunction;
  }


  setupGlobalListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    // Global listener for messages
    this.socket.on('receive_global_message', (data) => {
      // Check if the message is not for the current room
      if (!this.currentRoom || this.currentRoom !== data.gangId) {
        // Handle global messages
        // console.log('Global message:', data);
        this.dispatch && this.dispatch(addMessage(data.gangId, data.message));
        insertGangMessage(data);
        updateMessageLastUpdated(data);
        updateUnreadMessageCount(data);
      }
    });
  }

  on(event, func) {
    this.socket.on(event, func);
  }

  off(event, func) {
    this.socket.off(event, func);
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

  joinRoom(payload) {
    if (this.currentRoom) {
      // If already in a room, leave it first
      this.leaveRoom({ room: this.currentRoom });
    }

    this.currentRoom = payload.room;
    this.emit('join', payload);

    // Setup a listener for room-specific messages
    this.socket.on('receive_message', (data) => {
      if (data.gangId === this.currentRoom) {
        // Process room-specific messages
        console.log('Room-specific message:', data);
        this.dispatch && this.dispatch(addMessage(data.gangId, data.message));
        insertGangMessage(data);
        updateMessageLastUpdated(data);
      }
    });
  }

  leaveRoom(payload) {
    this.socket.off('room_message');
    this.emit('leave', payload);
    this.currentRoom = null;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const socketService = new SocketService();
export default socketService;
