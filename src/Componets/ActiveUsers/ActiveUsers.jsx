import SingleActiveUser from "./SingleActiveUser/SingleActiveUser";

const ActiveUsers = ({ users }) => {
  return (
    <div className="w-full overflow-auto">
      {users.map((singleUser) => (
        <SingleActiveUser
          key={singleUser.userId}
          singleUser={singleUser}
        />
      ))}
    </div>
  );
};

export default ActiveUsers;
