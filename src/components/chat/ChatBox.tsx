import { useChatsContext } from '../../contexts/chatsContext'
import ChatContact from './ChatContact'
import { ChatInput } from './ChatInput'
import ChatMessages from './ChatMessages'

export default function ChatBox(): JSX.Element {
  const { selectedChat } = useChatsContext()
  return (
    <div className="relative overflow-hidden flex flex-col gap-4 p-4 h-full w-full">
      {selectedChat ? (
        <>
          <div className=" flex flex-col gap-4 h-full w-full p-4 rounded-2xl bg-darker overflow-y-hidden">
            <ChatContact />
            <ChatMessages />
            <ChatInput reciverId={selectedChat._id} />
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8 w-full h-[95%]">
          <img
            src="src/assets/empty1.svg"
            alt="empty state image"
            className=" w-64 opacity-80"
          />
          <p className="text-light pr-6">Select a covo to start chatting</p>
        </div>
      )}
    </div>
  )
}
