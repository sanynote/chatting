import React from "react";
import "./App.css";
import io, { Socket } from "socket.io-client";

type Message = {
  readonly nickname: string;
  readonly message: string;
  readonly profileImage?: string;
  readonly createAt: Date;
};

function App() {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [messages, setMessages] = React.useState<Message[] | []>([]);

  React.useEffect(() => {
    const prevSocket = io(`${process.env.REACT_APP_XXX}`, {
      transports: ["websocket"],
    });
    setSocket(prevSocket);
  }, []);

  const messageListener = (message: Message) =>
    setMessages([...messages, message]);

  React.useEffect(() => {
    socket?.on("message", messageListener);
  }, [messageListener]);

  const sending = () => {
    const data: Message = {
      nickname: "hihi",
      message: "hello",
      profileImage: "image",
      createAt: new Date(),
    };
    socket?.emit("message", data);
  };

  return (
    <div className="App">
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

export default App;
