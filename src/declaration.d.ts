type IUserPayload = {
  id: string;
  email: string;
  username: string;
  last_name: string;
  first_name: string;
  phone_number: string;
};

type WsGatewayDataWrapper<T> = {
  data: T;
  user: IUserPayload;
};

type WsGatewayClient = {
  client: import('socket.io').Socket;
  user: IUserPayload;
};
