export type JoinRoomMessage = {
  type: 'JoinRoom';
  roomId: string;
};

export type AdvanceLineIndexMessage = {
  type: 'AdvanceLineIndex';
};

export type SetLineIndexMessage = {
  type: 'SetLineIndexMessage';
  lineIndex: number;
};

export type Message = JoinRoomMessage | AdvanceLineIndexMessage | SetLineIndexMessage;
