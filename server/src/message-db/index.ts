export interface RecieveAllMessagesCallback {
  (messages: string[]): void
}

export interface IMessageDB {
  appendMessage(messages: string): Promise<void>;
  getAllMessages(): Promise<string[]>;
  onRecieveAllMessages(cb: RecieveAllMessagesCallback): void;
  close(): void;
}