import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { WsContext } from "../../Context/MassageProvider/MassageProvider";

const Massages = () => {
  const { selectedUserId, messagesUnic } = useContext(WsContext);
  const { user } = useContext(AuthContext);
  return (
    <>
      {!selectedUserId && (
        <div className="bg-slate-500">
          <div>
            <h2>Start Conversation</h2>
          </div>
        </div>
      )}
      {!!selectedUserId && (
        <div className="">
          {messagesUnic.map((massage, idx) => (
            <div
              key={idx}
              className={` chat ${
                massage.recipient !== user.id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
                </div>
              </div>
              <div
                className={` chat-bubble ${
                  massage.recipient !== user.id
                    ? "  bg-blue-400"
                    : "bg-slate-100 text-black"
                }`}
              >
                {massage.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Massages;
