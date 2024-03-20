import Avatar from 'boring-avatars'
import User from '../../interfaces/Modals/UserModal'

export default function ChatContact({ selectedChat }: { selectedChat: User }) {
  return (
    <div className="flex items-center justify-between p-4 bg-dark rounded-3xl">
      <div className="flex items-center gap-6">
        <Avatar
          size={45}
          name={selectedChat.username}
          variant="beam"
          colors={['#1400FF', '#1400FF', '#F0AB3D', '#00F0FF', '#C20D90']}
        />
        <p>{selectedChat.username}</p>
      </div>
      <div
        className={`h-3 w-3 rounded-full mr-3 ${
          selectedChat.active ? ' bg-green-500 ' : ' bg-gray'
        } `}
      ></div>
    </div>
  )
}
