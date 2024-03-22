import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import Message from '../../interfaces/Modals/MessageModal'
import { useChatsContext } from '../../contexts/chatsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

interface GroupedMsgsType {
  [key: string]: Message[]
}

// <FontAwesomeIcon icon={faClock} />

export default function ChatMessages() {
  const { selectedChat } = useChatsContext()
  const [groupedMsgs, setGroupedMsgs] = useState<GroupedMsgsType>({})
  const messages = selectedChat?.messages

  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    const groupMessagesByDay = () => {
      const messagesByDay: GroupedMsgsType = {}
      if (messages) {
        messages.forEach((message: Message) => {
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
        setGroupedMsgs(messagesByDay)
      }
    }
    groupMessagesByDay()
  }, [messages, selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [groupedMsgs])

  return (
    <div
      ref={scrollRef}
      className="stripes rounded-2xl w-full h-full overflow-y-scroll custom-scrollbar p-6 pb-0"
    >
      {messages && messages.length === 0 && (
        <div className="text-center p-4 bg-dark rounded-xl text-light w-fit mx-auto">
          There's no messages in this convo yet, Send the first message now!
        </div>
      )}
      {Object.keys(groupedMsgs).map((day) => (
        <div key={day}>
          <div className="flex justify-center">
            <p className="p-2 px-3 bg-gray/50 rounded-lg text-sm">{day}</p>
          </div>
          {groupedMsgs[day].map((m) => (
            <div
              key={m._id}
              className={`flex ${
                m.senderId === selectedChat?._id ? '' : 'flex-row-reverse'
              } items-center gap-3 my-4 duration-300 text-lightgray hover:text-light/100`}
            >
              <div
                className={`p-4 mb-2 break-words rounded-2xl w-fit lg:max-w-[40%] min-w-[80px] max-w-[65%] text-light ${
                  m.senderId === selectedChat?._id
                    ? 'bg-gradient-to-t from-gray to-gray/80'
                    : 'bg-gradient-to-t from-primary to-primary-dimmer'
                } ${m.status == 'failed' ? ' from-gray/90 to-gray/50 ' : ''}`}
              >
                {m.message.split(' ')[0] === '&&IMG?LINK' ? (
                  <div className="mb-2 rounded-xl overflow-hidden">
                    <img src={m.message.split(' ')[1]} alt="image" />
                  </div>
                ) : (
                  <p className="mb-2 ">{m.message}</p>
                )}
                <p
                  className={`text-[12px] text-light/90 ${
                    m.status == 'failed' ? ' text-red-500 ' : ''
                  }`}
                >
                  {m.status === 'pending' ? (
                    <>
                      <FontAwesomeIcon icon={faClock} /> pending
                    </>
                  ) : m.status === 'failed' ? (
                    'failed'
                  ) : (
                    moment(m.createdAt).format('hh:mm A')
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
