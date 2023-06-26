const SideBar = () => {
  return (
    <div className="p-5 space-y-4 flex flex-col w-full justify-center items-center">
      <h2 className="text-2xl text-left w-full block">Chats</h2>
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered input-primary hover:file-input-accent w-full max-w-full"
      />
    </div>
  );
};

export default SideBar;
