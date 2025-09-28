import React from "react";
import { IoMdClose } from "react-icons/io";

const ConfirmBox = ({cancel, confirm, close}) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-700 opacity-90 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-4 rounded">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold">Permanent Delete</h1>
          <button onClick={close}>
            <IoMdClose size={25} />
          </button>
        </div>
        <p className="my-4 ">Are you sure to delete permanent ?</p>
        <div className="w-fit ml-auto flex items-center gap-3">
          <button 
          onClick={cancel} 
          className="px-4 py-1 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Cancel</button>
          <button 
          onClick={confirm} 
          className="px-4 py-1 rounded border border-green-500 hover:bg-green-500 hover:text-white ">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
