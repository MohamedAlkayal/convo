import Avatar from "boring-avatars";

export default function ChatPage() {
  return (
    <div className="flex w-full h-dvh min-h-[650px] bg-darkest text-light">
      <div className="flex flex-col gap-4 p-4 pr-0 h-full w-[450px]">
        <div className=" flex justify-between items-center p-6 w-full h-[120px] rounded-2xl bg-dark">
          <div className="flex gap-6">
            <Avatar size="60px" name="keko" variant="beam" colors={["#1400FF", "#1400FF", "#F0AB3D", "#00F0FF", "#C20D90"]} />
            <div>
              <p>username</p>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-600"></div>
                <p className="text-light">online</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full rounded-2xl bg-dark">2</div>
      </div>
      <div className="flex flex-col gap-4 p-4 h-full w-full">
        <div className="h-full rounded-2xl bg-dark">1</div>
        <div className="min-h-[60px] bg-dark rounded-2xl">2</div>
      </div>
    </div>
  );
}
