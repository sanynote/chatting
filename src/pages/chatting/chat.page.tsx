import React from "react";
import io, { Socket } from "socket.io-client";
import { useRecoilValue } from "recoil";
import { userInfo } from "os";
import { UserInfo } from "../../store/auth/user.info";
import { useNavigate } from "react-router-dom";
import BackButton from "../../common/back.button";

type Message = {
  readonly nickname: string;
  readonly message: string;
  readonly profileImage?: string;
  readonly createAt: Date;
};

function ChatPage() {
  const user = useRecoilValue(UserInfo);
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [messages, setMessages] = React.useState<Message[] | []>([]);
  const [textContent, setTextContent] = React.useState<string>("");

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
    if (!textContent) return;
    const data: Message = {
      nickname: `${user?.nickname}`,
      message: textContent,
      profileImage: `${user?.profileImage}`,
      createAt: new Date(),
    };
    socket?.emit("message", data);
    setTextContent("");
  };
  // 3. 서버에게 메세지 전달하는 로직
  const navigate = useNavigate();
  if (!user)
    return (
      <>
        <div>로그인이 필요한 페이지입니다.</div>
        <button onClick={() => navigate("/signin")}>
          로그인 화면으로 돌아가기
        </button>
      </>
    );

  return (
    <div style={{ height: "100vh" }}>
      <div style={{height:'7%'}}><BackButton /></div>
      <div style={{ width: "100%", height: "86%", overflow: "scroll" }}>
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ width: "15%" }}>
                <img src={msg.profileImage} width={50} height={50} />
              </div>
              <div style={{ width: "85%" }}>
                <div>{msg.nickname}</div>
                <div style={{ wordBreak: "break-all" }}>{msg.message}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ height: "7%" }}>
        <textarea
          style={{ width: "84%", height: 30 }}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        />

        <button onClick={sending}>보내기</button>
      </div>
    </div>
  );
}

export default ChatPage;
