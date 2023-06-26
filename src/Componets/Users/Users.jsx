import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SingleUser from "../SingleUser/SingleUser";

const Users = () => {
  const [axiosSecure] = useAxiosSecure();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  }, [axiosSecure]);
  return (
    <div className="w-full overflow-auto">
      {users.map((singleUser) => (
        <SingleUser key={singleUser._id} singleUser={singleUser} />
      ))}
    </div>
  );
};

export default Users;
