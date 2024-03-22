import Avatar from 'boring-avatars'
import User from '../../interfaces/Modals/UserModal'
import { useChatsContext } from '../../contexts/chatsContext'

interface props {
  user: User
}

export default function ContactCard({ user }: props) {
  const { selectedChat, handelSelectChat } = useChatsContext()

  const isSelected = selectedChat?._id == user._id

  return (
    <div
      onClick={() => handelSelectChat(user._id)}
      className={` flex items-center gap-4 p-4 cursor-pointer rounded-xl duration-300 hover:bg-darker mb-2 ml-1 ${
        isSelected ? ' bg-gray' : ' '
      } `}
    >
      <Avatar
        size={45}
        name={user.username}
        variant="beam"
        colors={['#1400FF', '#1400FF', '#F0AB3D', '#00F0FF', '#C20D90']}
      />
      <div>
        <p className="mb-1">{user.username}</p>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              user.active ? 'bg-green-600' : 'bg-gray'
            } `}
          ></div>
          <p className="text-lightgray text-sm">
            {user.active ? 'online' : 'offline'}
          </p>
        </div>
      </div>
    </div>
  )
}
