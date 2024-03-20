import Sidebar from '../components/chat/Sidebar'
import ChatBox from '../components/chat/ChatBox'
import { useEffect, useState } from 'react'
import { ax } from '../utilities/axios.config'
import User from '../interfaces/Modals/UserModal'

export default function ChatPage() {
  const [chats, setChats] = useState<User[]>([])
  const [selectedChat, setSelectedChat] = useState<User | null>(null)

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await ax.get('/users')
        const fetchedUsers = res.data.users.filter(
          (u: User) => u.username != localStorage.getItem('username')
        )
        setChats(fetchedUsers)
      } catch (err) {
        console.log(err)
      }
    }
    getChats()
  }, [])

  const handelSelectChat = (selected: User) => {
    setSelectedChat(selected)
  }

  return (
    <div className="flex w-full h-dvh min-h-[650px] bg-darkest text-light">
      <Sidebar
        chats={chats}
        handelSelectChat={handelSelectChat}
        selectedChat={selectedChat}
      />
      <ChatBox selectedChat={selectedChat} />
    </div>
  )
}
