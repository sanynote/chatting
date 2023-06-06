import React from "react";
import io, { Socket } from "socket.io-client";

type Message = {
  readonly nickname: string;
  readonly message: string;
  readonly profileImage?: string;
  readonly createAt: Date;
};

function ChatPage() {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [messages, setMessages] = React.useState<Message[] | []>([]);
  React.useEffect(() => {
    const prevSocket = io(`${process.env.REACT_APP_XXX}`, {
      transports: ["websocket"],
    });
    setSocket(prevSocket);
  }, []);
  // 1. http를 통해 첫 소켓 연결

  const messageListener = (message: Message) =>
    setMessages([...messages, message]);
  React.useEffect(() => {
    socket?.on("message", messageListener);
  }, [messageListener]);
  // 2. message가 입력되면 서버쪽에서 이벤트를 발생시키고 전달해줌

  const sending = () => {
    const data: Message = {
      nickname: "hihi",
      message: "hello",
      profileImage: "image",
      createAt: new Date(),
    };
    socket?.emit("message", data);
  };
  // 3. 서버에게 메세지 전달하는 로직

  return (
    <div>
      <button onClick={sending}>보내기</button>
      <ul>
        {messages.map((msg, index) => {
          return (
            <li key={index}>
              <div>{msg.nickname}</div>
              <div>{msg.message}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ChatPage;
