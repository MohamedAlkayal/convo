import Picker from 'emoji-picker-react'
import useToggle from '../../utilities/useToggle'
import { useState, ChangeEvent, useRef, KeyboardEvent } from 'react'
import { useChatsContext } from '../../contexts/chatsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane,
  faSmile,
  faImage,
  faCheck,
  faCircleExclamation
} from '@fortawesome/free-solid-svg-icons'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../utilities/firebase'
import Spinner from '../shared/Spinner'

export function ChatInput({ reciverId }: { reciverId: string }) {
  const [message, setMessage] = useState<string>('')
  const [uploadStatus, setUploadStatus] = useState<
    'noUpload' | 'uploading' | 'uploaded' | 'failedUpload'
  >('noUpload') // New state
  const [showEmojiPicker, setShowEmojiPicker, elementRef] = useToggle()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { sendMessage } = useChatsContext()

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target
    setMessage(value)
    autoResizeTextarea()
  }

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiSelect = (emojiObject: any): void => {
    const emoji = emojiObject.emoji
    setMessage((prevMessage) => prevMessage + emoji)
    autoResizeTextarea()
  }

  const handelUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadStatus('uploading')
    try {
      const imgRef = ref(
        storage,
        `/images/${file.name + Date.now() || 'new' + Date.now()}`
      )
      await uploadBytes(imgRef, file)
      const downloadURL = await getDownloadURL(imgRef)
      setMessage((prevMessage) => prevMessage + `&&IMG?LINK ${downloadURL}`)
      setUploadStatus('uploaded')
    } catch (error) {
      console.error('Error uploading file:', error)
      setUploadStatus('failedUpload')
    }
  }

  const handleSubmit = (): void => {
    if (!message.trim()) return
    sendMessage(message, reciverId)
    setMessage('')
    setUploadStatus('noUpload')
  }

  const handleSubmitByEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const { key, shiftKey } = e
    if (key === 'Enter' && !shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="bg-dark rounded-2xl p-6 flex gap-6 items-start">
      <label htmlFor="img">
        {uploadStatus == 'uploading' ? (
          <Spinner />
        ) : uploadStatus == 'uploaded' ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : uploadStatus == 'failedUpload' ? (
          <FontAwesomeIcon icon={faCircleExclamation} />
        ) : (
          <FontAwesomeIcon
            icon={faImage}
            className="text-2xl duration-300 hover:text-secondary cursor-pointer"
          />
        )}
      </label>
      <input
        id="img"
        type="file"
        disabled={uploadStatus !== 'noUpload'}
        onChange={(e) => handelUploadImage(e)}
        className="absolute -top-full left-full w-full h-full opacity-0 cursor-pointer"
      />
      {uploadStatus == 'uploading' ? (
        <div className="text-lightgray text-sm w-full">uploading...</div>
      ) : uploadStatus == 'uploaded' ? (
        <div className="max-h-72 w-full rounded-xl overflow-hidden ">
          <img src={message.split(' ')[1]} alt="preview message" />
        </div>
      ) : (
        <textarea
          id="textField"
          onKeyDown={handleSubmitByEnter}
          placeholder="Enter your message"
          value={message}
          onChange={handleInputChange}
          rows={1}
          ref={textareaRef}
          className="bg-transparent outline-none max-h-32 resize-none w-full custom-scrollbar"
        />
      )}
      <button
        disabled={uploadStatus !== 'noUpload'}
        type="button"
        className={`hover:text-secondary ${
          uploadStatus !== 'noUpload'
            ? ' text-light/60 hover:text-light/60 '
            : ''
        } `}
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      >
        <FontAwesomeIcon icon={faSmile} className="text-2xl" />
      </button>
      {showEmojiPicker && (
        <div ref={elementRef} className="absolute bottom-12 -right-16">
          <Picker onEmojiClick={handleEmojiSelect} />
        </div>
      )}
      <button
        onClick={handleSubmit}
        disabled={uploadStatus !== 'noUpload' && uploadStatus !== 'uploaded'}
        type="button"
        className={`hover:text-secondary ${
          uploadStatus !== 'noUpload' && uploadStatus !== 'uploaded'
            ? ' text-light/60 hover:text-light/60 '
            : ''
        } `}
      >
        <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" />
      </button>
    </div>
  )
}
