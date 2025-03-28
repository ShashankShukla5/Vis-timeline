import React, { useRef } from "react";
import groups from "../utils/groups";

function Form({setgroup, setname, addEvent, groupList, setendDate, setstartDate}) {
    const nameRef = useRef(null)
    const startRef = useRef(null)
    const endRef = useRef(null)
    const groupRef = useRef(null)


    function newEvent(){
        addEvent();
        nameRef.current.value = ""
        startRef.current.value = ""
        endRef.current.value = "" 
        groupRef.current.value = ""
    }

    const nameChange = (e) => {
        setname(e.target.value);
    }

    const startChange = (e) => {
        setstartDate(e.target.value);
    }

    const endChange = (e) => {
        setendDate(e.target.value);
    }

    const groupChange = (e) => {
        setgroup(e.target.value);
      };

  return (
    <div className="flex flex-col w-fit gap-2 bg-black text-orange-500 rounded-2xl p-2">
      <p className="mb-5">Add New Event</p>
      <div className="flex gap-2">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          placeholder="Enter event name"
          onChange={nameChange}
          className="w-50 bg-white rounded-md px-2 focus:outline-none placeholder:text-gray-400"
        />
      </div>
      <div className="flex gap-2 justify-between">
        <label htmlFor="name">Start date:</label>
        <input
          id="name"
          type="date"
          ref={startRef}
          onChange={startChange}
          className="w-40 bg-white rounded-md px-2 focus:outline-none placeholder:text-gray-400"
        />
      </div>
      <div className="flex gap-2 justify-between">
        <label htmlFor="name">End date:</label>
        <input
          id="name"
          type="date"
          ref={endRef}
          onChange={endChange}
          className="w-40 bg-white rounded-md px-2 focus:outline-none placeholder:text-gray-400"
        />
      </div>
      <div className="flex gap-2 justify-between">
        <label htmlFor="addevent">Group: </label>
        <select
          name="addevent"
          id="addevent"
          ref={groupRef}
          defaultValue=""
          onChange={groupChange}
          className="text-gray-600 hover:cursor-pointer "
        >
          <option value="" className="text-black">
            Select a group
          </option>
          {groupList.map((group)=>(
            <option key={group.id} value={group.id} className="text-black">
            {group.content}
          </option>
          ))}
        </select>
      </div>
      <button onClick={newEvent} className="bg-orange-500 text-black w-fit px-5 py-1 rounded-2xl m-auto mt-5 hover:cursor-pointer">Add</button>
    </div>
  );
}

export default Form;
