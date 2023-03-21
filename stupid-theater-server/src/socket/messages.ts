export type JoinRoomMessage = {
  type: 'JoinRoom';
  roomId: string;
};

export type Message = JoinRoomMessage;
