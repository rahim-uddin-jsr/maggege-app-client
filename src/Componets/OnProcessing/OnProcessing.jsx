import { FallingLines } from "react-loader-spinner";

const OnProcessing = () => {
  return (
    <div className="w-full z-10 min-h-screen h-full bg-slate-100 bg-opacity-30 absolute mx-auto">
      <div className="text-center flex flex-col justify-center items-center h-full">
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
        <h2 className="text-primary text-2xl">Working! please wait...</h2>
      </div>
    </div>
  );
};

export default OnProcessing;
