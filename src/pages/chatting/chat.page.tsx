import React from "react";
import io, { Socket } from "socket.io-client";
import { useRecoilValue } from "recoil";
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
  }, [setSocket]);
  // 1. http를 통해 첫 소켓 연결
  /*
   * deps에 setSocket을 추가한 이유는, socket uuid 가 2번 발급되는 경우 deps가 비어있으면
   * 먼저 발급받은 uuid를 사용하게 되는데 이렇게 되면 당장은 티가 안나지만 나중에 페어가 맞지 않게 됨.
   * 왜냐하면 백엔드는 마지막에 준 uuid를 기억하고 있기 때문에.
   * 그래서 마지막으로 발급받은 값을 사용하기 위해 deps에 setSocket을 넣어준다.
   * */

  const messageListener = (message: Message) =>
    setMessages([...messages, message]);

  React.useEffect(() => {
    socket?.on("message", messageListener);
  }, [messageListener]);

  // 2. message가 입력되면 서버쪽에서 이벤트를 발생시키고 전달해줌

  // React.useEffect(() => {
  //   socket?.on("message", (message:Message)=>setMessages([...messages,message]));
  // }, [(message:Message)=>setMessages([...messages,message])]);
  /*
  * messageListener 로 서버에서 메세지를 받아오는 과정이 어려웠어서 변수에 담기 전으로 돌아간 코드를 작성.
  * messageLister라는 변수에 담은 이유는 같은 메모리 주소를 사용하지 않아서 다른 값으로 인식하는 문제가 생기기 때문이다.
  * */

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
      <div style={{ height: "7%" }}>
        <BackButton />
      </div>
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
