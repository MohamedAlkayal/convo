import ChatContact from "./ChatContact";
import ChatMessages from "./ChatMessages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function ChatBox() {
  return (
    <div className="flex flex-col gap-4 p-4 h-full w-full">
      <div className="flex flex-col gap-4  h-full p-4 rounded-2xl bg-dark">
        <ChatContact />
        <ChatMessages />
      </div>
      <div className="min-h-[60px] bg-dark rounded-2xl p-4 flex gap-2">
        <textarea placeholder="Enter your message" className="bg-transparent outline-none resize-none w-full custom-scrollbar" />
        <button className="p-2 hover:text-secondary">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}
