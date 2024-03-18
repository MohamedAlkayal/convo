import Avatar from "boring-avatars";

export default function ContactCard() {
  return (
    <div className="flex items-center gap-4 p-4 cursor-pointer rounded-xl duration-300 hover:bg-darker">
      <Avatar size={45} name="hsasa" variant="beam" colors={["#1400FF", "#1400FF", "#F0AB3D", "#00F0FF", "#C20D90"]} />
      <div>
        <p className="mb-1">username</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-600"></div>
          <p className="text-lightgray text-sm">online</p>
        </div>
      </div>
    </div>
  );
}
