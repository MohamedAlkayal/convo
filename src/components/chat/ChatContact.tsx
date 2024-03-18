import Avatar from "boring-avatars";

export default function ChatContact() {
  return (
    <div className="flex items-center justify-between p-6 bg-gray rounded-3xl">
      <div className="flex items-center gap-6">
        <Avatar size={45} name="shdrtyafa" variant="beam" colors={["#1400FF", "#1400FF", "#F0AB3D", "#00F0FF", "#C20D90"]} />
        <p>username</p>
      </div>
      <div className=" h-3 w-3 rounded-full bg-green-500"></div>
    </div>
  );
}
