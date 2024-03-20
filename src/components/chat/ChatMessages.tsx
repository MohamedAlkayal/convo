import { useEffect, useRef, useState } from 'react'
import User from '../../interfaces/Modals/UserModal'
import { ax } from '../../utilities/axios.config'
import Message from '../../interfaces/Modals/MessageModal'
import moment from 'moment'
// import io from 'socket.io-client'

export default function ChatMessages({ selectedChat }: { selectedChat: User }) {
  const [messages, setMessages] = useState<Message[] | null>(null)
  const [groupedMessages, setGroupedMessages] = useState<{
    [key: string]: Message[]
  }>({})
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  const groupMessagesByDay = () => {
    const messagesByDay: { [key: string]: Message[] } = {}
    if (messages) {
      messages.forEach((message) => {
        const createdAt = moment(message.createdAt)
        const formattedDate = createdAt.calendar(null, {
          sameDay: '[today]',
          lastDay: '[yesterday]',
          lastWeek: 'ddd DD MMM',
          sameElse: 'ddd DD MMM'
        })

        if (!messagesByDay[formattedDate]) {
          messagesByDay[formattedDate] = []
        }
        messagesByDay[formattedDate].push(message)
      })
      setGroupedMessages(messagesByDay)
      scrollToBottom()
    }
  }

  const getMessages = async () => {
    try {
      const res = await ax.get<Message[]>(`/message/${selectedChat._id}`)
      setMessages(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMessages()
  }, [selectedChat])

  useEffect(() => {
    groupMessagesByDay()
  }, [messages])

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   const authToken = `Bearer ${token}`
  //   console.log(authToken)

  //   const socketServerUrl = `https://real-time-chat-app-iti=v2.onrender.com`
  //   const socket = io(socketServerUrl, {
  //     extraHeaders: {
  //       Authorization: authToken
  //     }
  //   })

  //   socket.on('newMessage', () => {
  //     console.log('Connected to server')
  //   })

  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [])

  return (
    <div
      ref={scrollRef}
      className="stripes rounded-2xl w-full h-full overflow-y-scroll custom-scrollbar p-6"
    >
      {messages && messages.length === 0 && (
        <div className="text-center p-4 bg-dark rounded-xl text-light w-fit mx-auto">
          There's no messages in this convo yet, Send the first message now!
        </div>
      )}

      {Object.keys(groupedMessages).map((day) => (
        <div key={day}>
          <div className="flex justify-center">
            <p className="p-2 px-3 bg-gray/50 rounded-lg text-sm">{day}</p>
          </div>
          {groupedMessages[day].map((m) => (
            <div
              key={m._id}
              className={`flex ${
                m.senderId === selectedChat._id ? '' : 'flex-row-reverse'
              } items-center gap-3 my-8 duration-300 text-lightgray hover:text-light`}
            >
              <div
                className={`p-4 mb-2 rounded-2xl w-fit lg:max-w-[40%] max-w-[65%] text-light ${
                  m.senderId === selectedChat._id
                    ? 'bg-gradient-to-t from-gray to-gray/80'
                    : 'bg-gradient-to-t from-primary to-primary-dimmer'
                }`}
              >
                {m.message}
              </div>
              <p className="text-sm">{moment(m.createdAt).format('hh:mm A')}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// const mockMessages = [
//   {
//     _id: 'message_1',
//     senderId: '65f4f02d9f31ed4ca11eb680',
//     receiverId: 'user_2',
//     message: "Hey, what's up?",
//     createdAt: '2024-03-18T08:14:20.137Z', // Sunday, March 18, 2024
//     updatedAt: '2024-03-18T08:14:20.137Z'
//   },
//   {
//     _id: 'message_2',
//     senderId: 'user_2',
//     receiverId: '65f4f02d9f31ed4ca11eb680',
//     message: 'Not much, just chilling 🥶',
//     createdAt: '2024-03-18T08:15:30.246Z',
//     updatedAt: '2024-03-18T08:15:30.246Z'
//   },
//   {
//     _id: 'message_2a',
//     senderId: 'user_2',
//     receiverId: '65f4f02d9f31ed4ca11eb680',
//     message: 'How about you?',
//     createdAt: '2024-03-18T08:15:30.246Z',
//     updatedAt: '2024-03-18T08:15:30.246Z'
//   },
//   {
//     _id: 'message_3',
//     senderId: '65f4f02d9f31ed4ca11eb680',
//     receiverId: 'user_2',
//     message: 'Same here. Thinking of grabbing some lunch soon.',
//     createdAt: '2024-03-19T12:17:45.359Z', // Monday, March 19, 2024
//     updatedAt: '2024-03-19T12:17:45.359Z'
//   },
//   {
//     _id: 'message_4',
//     senderId: 'user_2',
//     receiverId: '65f4f02d9f31ed4ca11eb680',
//     message:
//       "Sounds dope. Want to meet up and do you suggest any new restaurants? I'm kinda bored of the regular.",
//     createdAt: '2024-03-19T14:18:55.462Z',
//     updatedAt: '2024-03-19T14:18:55.462Z'
//   },
//   {
//     _id: 'message_5',
//     senderId: '65f4f02d9f31ed4ca11eb680',
//     receiverId: 'user_2',
//     message: "Sure, let's go to that new burger joint downtown.",
//     createdAt: '2024-03-20T10:20:10.578Z', // Tuesday, March 20, 2024
//     updatedAt: '2024-03-20T10:20:10.578Z'
//   }
// ]
