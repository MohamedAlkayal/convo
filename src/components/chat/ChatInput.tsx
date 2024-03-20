import { useState, ChangeEvent, useRef } from 'react'
import Picker from 'emoji-picker-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons'
import useToggle from '../../utilities/useToggle'
import { ax } from '../../utilities/axios.config'

export function ChatInput({ reciverId }: { reciverId: string }) {
  const [message, setMessage] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker, elementRef] = useToggle()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiSelect = (emojiObject: any): void => {
    const emoji = emojiObject.emoji
    setMessage((prevMessage) => prevMessage + emoji)
  }

  const handleSubmit = async (): Promise<void> => {
    const body = { message }
    try {
      await ax.post(`/message/send/${reciverId}`, body)
    } catch (err) {
      console.log(err)
    }

    setMessage('')
  }

  return (
    <div className="bg-dark rounded-2xl p-6 flex gap-6 items-start">
      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={handleInputChange}
        rows={1}
        ref={textareaRef}
        className="bg-transparent outline-none max-h-32 resize-none w-full custom-scrollbar"
      />
      <div className="relative">
        <button
          className="hover:text-secondary "
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FontAwesomeIcon icon={faSmile} className="text-2xl" />
        </button>
        {showEmojiPicker && (
          <div ref={elementRef} className="absolute bottom-12 -right-16">
            <Picker onEmojiClick={handleEmojiSelect} />
          </div>
        )}
      </div>
      <button onClick={handleSubmit} className="hover:text-secondary ">
        <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" />
      </button>
    </div>
  )
}
