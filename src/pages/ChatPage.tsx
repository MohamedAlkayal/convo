import Sidebar from "../components/chat/Sidebar";
import ChatBox from "../components/chat/ChatBox";

export default function ChatPage() {
  return (
    <div className="flex w-full h-dvh min-h-[650px] bg-darkest text-light">
      <Sidebar />
      <ChatBox />
    </div>
  );
}
