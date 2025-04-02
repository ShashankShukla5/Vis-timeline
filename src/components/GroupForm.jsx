import React, { useRef, useEffect } from "react";

function GroupForm({ setgroupName, addGroup, groupList, setgroup, groupPop, setGroupPop }) {
  const nameRef = useRef(null);
  const groupRef = useRef(null);
  const popUpRef = useRef(null)

  function newGroup() {
    addGroup();
    nameRef.current.value = "";
    groupRef.current.value = "";
    setGroupPop(false)
  }

  const nameChange = (e) => {
    setgroupName(e.target.value);
  };

  const groupChange = (e) => {
    setgroup(e.target.value);
  };

  useEffect(() => {
      const handleMouseClick = (e) => {
        if (popUpRef.current && !popUpRef.current.contains(e.target)) {
          setGroupPop(false);
        }
        if (e.key === "Escape") {
          setGroupPop(false);
        }
      };
      if (groupPop) {
        document.addEventListener("mousedown", handleMouseClick);
        document.addEventListener("keydown", handleMouseClick);
      }
      return () => {
        document.removeEventListener("mousedown", handleMouseClick);
        document.removeEventListener("keydown", handleMouseClick);
      };
    });

  return (
    <div ref={popUpRef} className="fixed z-20 top-25 left-122 w-70 group-form flex flex-col  gap-2 bg-white shadow-2xl text-black rounded-2xl p-2">
      <p className="mb-5 text-[#f5f6f8]">Add New Group</p>
      <div className="flex gap-2">
        <label htmlFor="name" className="text-[#f5f6f8]">
          Name:
        </label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          placeholder="Enter group name"
          onChange={nameChange}
          className="w-50 py-1 bg-[#222834] rounded-md px-2 focus:outline-none placeholder:text-gray-600"
        />
      </div>
      <div className="flex gap-2"></div>
      <div className="flex gap-2">
        <label htmlFor="addevent" className="text-[#f5f6f8]">
          Parent:{" "}
        </label>
        <select
          name="addevent"
          id="addevent"
          defaultValue=""
          ref={groupRef}
          onChange={groupChange}
          className="text-gray-600 hover:cursor-pointer w-full bg-[#222834] rounded-2xl px-2"
        >
          <option value="" className="text-gray-400">
            Select a group
          </option>
          {groupList.map((group) => {
            if (group.nestedGroups && group.nestedGroups.length > 0) {
              return (
                <optgroup
                  key={group.id}
                  label={group.content}
                  className="text-gray-400"
                >
                  {group.nestedGroups.map((nestedId) => {
                    const nestedGroup = groupList.find(
                      (g) => g.id === nestedId
                    );
                    return (
                      nestedGroup && (
                        <option
                          key={nestedGroup.id}
                          value={nestedGroup.id}
                          className="text-white"
                        >
                          ─ {nestedGroup.content}
                        </option>
                      )
                    );
                  })}
                </optgroup>
              );
            }
          })}

          {groupList
            .filter(
              (group) =>
                !groupList.some((parentGroup) =>
                  parentGroup.nestedGroups?.includes(group.id)
                )
            )
            .map((group) => (
              <option key={group.id} value={group.id} className="text-white">
                {group.content}
              </option>
            ))}
        </select>
      </div>
      <button
        onClick={newGroup}
        className="bg-[#4666ae] text-white font-bold w-fit px-5 py-1 rounded-2xl m-auto mt-5 hover:cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}

export default GroupForm;
