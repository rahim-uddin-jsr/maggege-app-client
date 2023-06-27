import { useContext } from "react";
import { WsContext } from "../../../Context/MassageProvider/MassageProvider";

const SingleActiveUser = ({ singleUser }) => {
  const { handleSelectUser, selectedUserId } = useContext(WsContext);
  return (
    <div onClick={() => handleSelectUser(singleUser.userId)}>
      <div
        className={`flex w-full p-5 flex-row space-x-5 items-center border-0 border-b ${
          selectedUserId === singleUser.userId && "bg-blue-100"
        }`}
      >
        <div className="avatar">
          <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={singleUser.userPhoto} />
          </div>
        </div>
        <div className="">
          <h2 className="card-title">{singleUser.userName}</h2>
        </div>
      </div>
    </div>
  );
};

export default SingleActiveUser;
