import { useEffect, useRef, useState } from 'react'
import User from '../../interfaces/Modals/UserModal'
import { ax } from '../../utilities/axios.config'
import Message from '../../interfaces/Modals/MessageModal'
import moment from 'moment'

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

  useEffect(() => {
    scrollToBottom()
  }, [groupedMessages])

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
