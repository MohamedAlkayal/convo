import Avatar from "boring-avatars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function UserCard() {
  return (
    <div className="flex justify-between items-center p-6 w-full h-[120px] rounded-2xl bg-dark">
      <div className="flex gap-4">
        <Avatar size={45} name="keko" variant="beam" colors={["#1400FF", "#1400FF", "#F0AB3D", "#00F0FF", "#C20D90"]} />
        <div>
          <p className="mb-1">username</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-600"></div>
            <p className="text-lightgray text-sm">online</p>
          </div>
        </div>
      </div>
      <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-lg cursor-pointer" />
    </div>
  );
}
