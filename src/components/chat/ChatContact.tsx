import Avatar from 'boring-avatars'
import { useChatsContext } from '../../contexts/chatsContext'

export default function ChatContact() {
  const { selectedChat } = useChatsContext()

  return (
    <>
      {selectedChat && (
        <div className="flex items-center justify-between p-4 bg-dark rounded-3xl">
          <div className="flex items-center gap-6">
            <Avatar
              size={45}
              name={selectedChat.user.username}
              variant="beam"
              colors={['#1400FF', '#1400FF', '#F0AB3D', '#00F0FF', '#C20D90']}
            />
            <p>{selectedChat.user.username}</p>
          </div>
          <div
            className={`h-3 w-3 rounded-full mr-3 ${
              selectedChat.user.active ? ' bg-green-500 ' : ' bg-gray'
            } `}
          ></div>
        </div>
      )}
    </>
  )
}
