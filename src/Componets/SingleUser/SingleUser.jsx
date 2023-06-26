import { Link } from "react-router-dom";

const SingleUser = ({ singleUser }) => {
  return (
    <Link to={`/massages/${singleUser._id}`}>
      <div className="flex w-full p-5 flex-row space-x-5 items-center border-0 border-b">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={singleUser.photo} />
          </div>
        </div>
        <div className="">
          <h2 className="card-title">{singleUser.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default SingleUser;
