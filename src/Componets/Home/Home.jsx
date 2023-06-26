import ChatContent from "../ChatContent/ChatContent";
import NavigationBar from "../NavigationBar/NavigationBar";
import SideBar from "../SideBar/SideBar";

const Home = () => {
  return (
    <>
      <NavigationBar />
      <div className="flex min-h-screen h-full">
        <div className="w-[20%]  border-0 border-r-2">
          <SideBar />
        </div>
        <div className="flex-grow bg-gray-200">
          <ChatContent />
        </div>
      </div>
    </>
  );
};

export default Home;
