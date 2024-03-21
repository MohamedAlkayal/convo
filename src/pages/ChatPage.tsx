import Sidebar from '../components/chat/Sidebar'
import ChatBox from '../components/chat/ChatBox'
import { useEffect, useState } from 'react'
import { ax } from '../utilities/axios.config'
import User from '../interfaces/Modals/UserModal'
import io from 'socket.io-client'

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

  useEffect(() => {
    const token = localStorage.getItem('token')
    const authToken = `Bearer ${token}`
    const socketServerUrl = `https://real-time-chat-app-iti-v2.onrender.com`
    const socket = io(socketServerUrl, {
      extraHeaders: {
        Authorization: authToken
      }
    })
    socket.on('connect', () => {
      console.log('Connected to server')
    })
    socket.on('newMessage', (data) => {
      console.log('test')
      console.log(data)
    })
    return () => {
      socket.disconnect()
    }
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
