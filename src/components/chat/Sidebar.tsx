import UserCard from './UserCard'
import ContactCard from './ContactCard'
import User from '../../interfaces/Modals/UserModal'
import { useState } from 'react'

export default function Sidebar({
  chats,
  handelSelectChat,
  selectedChat
}: {
  chats: User[]
  selectedChat: User | null
  handelSelectChat: (selected: User) => void
}) {
  const [isGlowing, setIsGlowing] = useState<boolean>(true)

  const handelToggleGlowing = () => {
    setIsGlowing((g) => !g)
  }

  return (
    <div className="flex flex-col gap-4 p-4 pr-0 h-full w-[450px]">
      <div className="w-full h-full p-2 rounded-2xl bg-dark overflow-y-hidden">
        <h1
          onClick={handelToggleGlowing}
          className={` ${
            isGlowing ? ' glow ' : ''
          } cursor-pointer text-center p-6 billo text-5xl  text-light rounded-2xl bg-darkest mb-4 `}
        >
          CONVO
        </h1>
        <p className=" p-2 px-4  bg-gray rounded-xl mb-3 mx-1 mt-1">
          Chats ({chats.length})
        </p>
        <div className="h-[90%] overflow-y-scroll custom-scrollbar">
          {chats.map((c: User) => {
            return (
              <ContactCard
                handelSelectChat={handelSelectChat}
                selectedChat={selectedChat}
                key={c._id}
                user={c}
              />
            )
          })}
          {chats.length > 0 && (
            <p className=" py-6 text-center text-sm  text-lightgray">
              Now that's the clique
            </p>
          )}
          {chats.length === 0 && (
            <p className="flex justify-center items-center text-center px-3 h-[60%] text-sm  text-lightgray">
              How cool would it be to have friends huh?
            </p>
          )}
        </div>
      </div>
      <UserCard />
    </div>
  )
}
