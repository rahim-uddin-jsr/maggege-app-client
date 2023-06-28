import { uniqBy } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export const WsContext = createContext();
const MassageProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState();
  const [messages, setMassages] = useState([]);
  const [messagesUnic, setMassagesUnic] = useState([]);
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
    } else if ("text" in massagesData) {
      setMassages((prev) => [...prev, { ...massagesData }]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    console.log(userId);
  };
  const sendMassage = (newMassage) => {
    console.log(newMassage);
    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        sender: user.uid,
        text: newMassage,
      })
    );
    setMassages((prev) => [
      ...prev,
      {
        text: newMassage,
        recipient: user.uid,
        id: Date.now(),
        date: Date.now(),
      },
    ]);
  };
  useEffect(() => {
    setMassagesUnic(uniqBy(messages, "id"));
  }, [messages]);

  console.log(onlinePeople);
  const wssInfo = {
    onlinePeople,
    handleSelectUser,
    selectedUserId,
    sendMassage,
    messagesUnic,
  };
  return <WsContext.Provider value={wssInfo}>{children}</WsContext.Provider>;
};

export default MassageProvider;
