import UserCard from "./UserCard";
import ContactCard from "./ContactCard";

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-4 p-4 pr-0 h-full w-[450px]">
      <UserCard />
      <div className="w-full h-full p-2 rounded-2xl bg-dark overflow-y-scroll custom-scrollbar">
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
        <ContactCard />
      </div>
    </div>
  );
}
