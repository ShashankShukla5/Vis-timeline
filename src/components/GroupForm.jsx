import React, { useRef } from "react";

function GroupForm({ setgroupName, addGroup, groupList, setgroup }) {
  const nameRef = useRef(null);
  const groupRef = useRef(null)

  function newGroup() {
    addGroup();
    nameRef.current.value = "";
    groupRef.current.value = "";
  }

  const nameChange = (e) => {
    setgroupName(e.target.value);
  };
  
  const groupChange = (e) => {
    setgroup(e.target.value);
  };

  return (
    <div className="flex flex-col w-fit gap-2 bg-white shadow-2xl text-black rounded-2xl p-2">
      <p className="mb-5">Add New Group</p>
      <div className="flex gap-2">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          placeholder="Enter group name"
          onChange={nameChange}
          className="w-50 py-1 bg-gray-200 rounded-md px-2 focus:outline-none placeholder:text-gray-600"
        />
      </div>
      <div className="flex gap-2"></div>
      <div className="flex gap-2">
        <label htmlFor="addevent">Parent: </label>
        <select
          name="addevent"
          id="addevent"
          defaultValue=""
          ref={groupRef}
          onChange={groupChange}
          className="text-gray-600 hover:cursor-pointer bg-gray-200 rounded-2xl px-2"
        >
          <option value="" className="text-black">
            Select a group
          </option>
          {groupList.map((group) => (
            <option key={group.id} value={group.id} className="text-black">
              {group.content}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={newGroup}
        className="bg-blue-500 text-white w-fit px-5 py-1 rounded-2xl m-auto mt-5 hover:cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}

export default GroupForm;
