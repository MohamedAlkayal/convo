import { useState, ChangeEvent } from 'react'
import Picker from 'emoji-picker-react'
import ChatContact from './ChatContact'
import ChatMessages from './ChatMessages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons'

export default function ChatBox(): JSX.Element {
  const [message, setMessage] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value)
  }

  const handleEmojiSelect = (emojiObject: any): void => {
    const emoji = emojiObject.emoji
    setMessage((prevMessage) => prevMessage + emoji)
  }

  const handleSubmit = (): void => {
    // Handle message submission
    console.log('Message submitted:', message)
    // Clear message input
    setMessage('')
  }

  return (
    <div className="flex flex-col gap-4 p-4 h-full w-full">
      <div className="flex flex-col gap-4 h-full p-4 rounded-2xl bg-dark">
        <ChatContact />
        <ChatMessages />
      </div>
      <div className="min-h-[60px] bg-dark rounded-2xl p-4 flex gap-2 items-center relative">
        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={handleInputChange}
          className="bg-transparent outline-none resize-none w-full custom-scrollbar"
        />
        {/* Emoji Picker Button */}
        <button
          className="p-2 hover:text-secondary absolute right-12 top-2"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FontAwesomeIcon icon={faSmile} />
        </button>
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-[70px] right-2">
            <Picker onEmojiClick={handleEmojiSelect} />
          </div>
        )}
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="p-2 hover:text-secondary absolute right-2 bottom-2"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  )
}
