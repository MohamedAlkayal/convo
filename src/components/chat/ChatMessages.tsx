export default function ChatMessages() {
  return (
    <div className="w-full h-full overflow-y-scroll custom-scrollbar">
      <div className="flex justify-center">
        <p className="p-2 rounded-xl bg-gray">Today</p>
      </div>
      <div className="flex items-center gap-3 my-4 duration-300 text-lightgray hover:text-light">
        <div className="p-4 mb-2 rounded-2xl bg-gray w-fit max-w-[50%] text-light">Where are you the game ia about to start!</div>
        <p>8:12</p>
      </div>
      <div className="flex flex-row-reverse items-center gap-3 my-4 duration-300 text-lightgray hover:text-light">
        <div className="p-4 mb-2 rounded-2xl bg-primary w-fit max-w-[50%] text-light">Omw, give me just 10 mins</div>
        <p>8:13</p>
      </div>
      <div className="flex flex-row-reverse items-center gap-3 my-4 duration-300 text-lightgray hover:text-light">
        <div className="p-4 mb-2 rounded-2xl bg-primary w-fit max-w-[50%] text-light">I'll grap som snacks with me do you want anything specific</div>
        <p>8:13</p>
      </div>
    </div>
  );
}
