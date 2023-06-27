import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ActiveUsers from "../ActiveUsers/ActiveUsers";
import Users from "../Users/Users";
const SideBar = ({ onlinePeople }) => {
  return (
    <div className="sticky left-0 top-[69px]">
      <div className="space-y-4 flex flex-col w-full justify-center items-center ">
        <div className="p-5 w-full">
          <h2 className="text-2xl text-left block">
            Chats {"Online user" + onlinePeople.length}
          </h2>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered input-primary hover:file-input-accent w-full max-w-full"
          />{" "}
        </div>
        <div className="w-full">
          <Tabs>
            <TabList>
              <Tab>All Users</Tab>
              <Tab>Active Users</Tab>
            </TabList>
            <TabPanel>
              <Users />
            </TabPanel>
            <TabPanel>
              <ActiveUsers users={onlinePeople}></ActiveUsers>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
