import { useContext } from "react";
import { WsContext } from "../../Context/MassageProvider/MassageProvider";
import Massages from "../Massages/Massages";
import NavigationBar from "../NavigationBar/NavigationBar";
import SideBar from "../SideBar/SideBar";

const Home = () => {
  const { onlinePeople } = useContext(WsContext);
  console.log(onlinePeople);
  return (
    <div className="h-screen">
      <NavigationBar />
      <div className="flex">
        <div className="w-[20%] h-screen border-0 border-r-2">
          <SideBar onlinePeople={onlinePeople} />
        </div>
        <div className="flex-grow  bg-gray-200">
          <div className="w-full h-full">
            <div className="px-5 flex flex-col justify-between h-full relative ">
              <div className="flex-grow">
                <Massages />
              </div>
              <div className="join w-full h-14 sticky bottom-5">
                <input
                  className="input input-bordered join-item w-full"
                  placeholder="Type your text here"
                />
                <button className="btn join-item rounded-r-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className=" bg-gray-200">
    //   <NavigationBar />
    //   <div className="flex">
    //     <div className="w-[20%] bg-white border-0 border-r-2">
    //       <SideBar onlinePeople={onlinePeople} />
    //     </div>

    //     <div className="">
    //       <Massages />
    //       <div className="join h-14">
    //         <input
    //           className="input input-bordered join-item"
    //           placeholder="Type your text here"
    //         />
    //         <button className="btn join-item rounded-r-full">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             strokeWidth={1.5}
    //             stroke="currentColor"
    //             className="w-6 h-6"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
