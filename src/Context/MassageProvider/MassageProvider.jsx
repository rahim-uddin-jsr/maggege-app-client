import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export const WsContext = createContext();
const MassageProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    setWs(ws);
    ws?.addEventListener("message", handleMassage);
  }, [user]);

  const showOnlinePeople = (peopleArray) => {
    const uniquePeople = Array.from(
      new Set(peopleArray.map((person) => person.userId))
    ).map((userId) => {
      return peopleArray.find((person) => person.userId === userId);
    });
    const excludeMyUser = uniquePeople.filter(
      (people) => people.userId !== user.uid
    );
    setOnlinePeople(excludeMyUser);
  };

  const handleMassage = (e) => {
    const massagesData = JSON.parse(e.data);
    if ("online" in massagesData) {
      showOnlinePeople(massagesData.online);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    console.log(userId);
  };
  console.log(onlinePeople);
  const wssInfo = {
    onlinePeople,
    handleSelectUser,
    selectedUserId,
  };
  return <WsContext.Provider value={wssInfo}>{children}</WsContext.Provider>;
};

export default MassageProvider;
