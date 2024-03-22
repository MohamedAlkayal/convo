import { useChatsContext } from '../../contexts/chatsContext'
import ChatContact from './ChatContact'
import { ChatInput } from './ChatInput'
import ChatMessages from './ChatMessages'

export default function ChatBox(): JSX.Element {
  const { selectedChat } = useChatsContext()
  return (
    <div className="flex flex-col gap-4 p-4 h-full w-full">
      {selectedChat ? (
        <>
          <div className="flex flex-col gap-4 h-full p-4 rounded-2xl bg-darker overflow-y-hidden">
            <ChatContact />
            <ChatMessages />
            <ChatInput reciverId={selectedChat._id} />
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-8 w-full h-full">
          <img
            src="src/assets/empty1.png"
            alt="empty state image"
            className=" w-72"
          />
          <p className="text-lightgray">Select a covo to start chatting</p>
        </div>
      )}
    </div>
  )
}
