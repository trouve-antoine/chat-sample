export interface OnSocketMessageCallback<ResponseT> {
  (res: ResponseT): void
}

export interface IMessageServerDriver {
  postJson<RequestT>(path: string, body: RequestT): Promise<void>;
  getJson<ResponseT>(path: string): Promise<ResponseT>;
  onSocketMessage<ResponseT>(messageName: string, cb: OnSocketMessageCallback<ResponseT>): void;
  close(): Promise<void>
}