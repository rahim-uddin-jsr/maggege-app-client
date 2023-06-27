import { useContext } from "react";
import { WsContext } from "../../Context/MassageProvider/MassageProvider";

const Massages = () => {
  const { selectedUserId } = useContext(WsContext);

  return (
    <>
      {!selectedUserId && (
        <div className="bg-slate-500">
          <div>
            <h2>Start Conversation</h2>
          </div>
        </div>
      )}
      {selectedUserId && <div className="bg-slate-500">massages</div>}
    </>
  );
};

export default Massages;
