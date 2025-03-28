import React, { useEffect, useRef, useState } from "react";

function Popup({
  setgroup,
  setname,
  addEvent,
  groupList,
  setendDate,
  setstartDate,
  setEnable,
  popUpUpdate,
  enable,
  setdefGroup,
  defGroup,
  seteventPop,
  eventPop,
  validation,
  setValidation,
  defName,
  defSDate,
  defEDate,
  setdefName,
  setdefSDate,
  setdefEDate,
}) {
  const [nameValidation, setNameValidation] = useState(false);
  const [sDateValidation, setSDateValidation] = useState(false);
  const [eDateValidation, setEDateValidation] = useState(false);
  const [groupValidation, setGroupValidation] = useState(false);

  const popUpRef = useRef(null);
  const nameRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const groupRef = useRef(null);

  // useEffect(()=>{

  // })

  function updateEvent() {
    if (
      groupRef.current.value === "" ||
      nameRef.current.value === "" ||
      startRef.current.value === "" ||
      endRef.current.value === ""
    ) {
      if (nameRef.current.value === "") {
        setNameValidation(true);
      } else {
        setNameValidation(false);
      }
      if (startRef.current.value === "") {
        setSDateValidation(true);
      } else {
        setSDateValidation(false);
      }
      if (endRef.current.value === "") {
        setEDateValidation(true);
      } else {
        setEDateValidation(false);
      }
      if (groupRef.current.value === "") {
        setGroupValidation(true);
      } else {
        setGroupValidation(false);
      }
      return;
    }

    if (eventPop) {
      addEvent();
      seteventPop(false);
    }
    if (enable) {
      popUpUpdate();
      setEnable(false);
      setdefGroup(null);
    }

    groupRef.current.value = "";
    nameRef.current.value = "";
    startRef.current.value = "";
    endRef.current.value = "";
  }

  const nameChange = (e) => {
    setname(e.target.value);
    setNameValidation(false);
  };

  const startChange = (e) => {
    setstartDate(e.target.value);
    setSDateValidation(false);
  };

  const endChange = (e) => {
    setendDate(e.target.value);
    setEDateValidation(false);
  };

  const groupChange = (e) => {
    setgroup(e.target.value);
    setGroupValidation(false);
  };

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        setEnable(false);
        seteventPop(false);
      }
      if (e.key === "Escape") {
        setEnable(false);
        seteventPop(false);
      }
    };
    if (enable || eventPop) {
      document.addEventListener("mousedown", handleMouseClick);
      document.addEventListener("keydown", handleMouseClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleMouseClick);
      document.removeEventListener("keydown", handleMouseClick);
    };
  }, [validation, setValidation]);

  return (
    <div
      ref={popUpRef}
      className="absolute z-20 top-[-1.875rem] left-95 flex flex-col w-fit gap-4 bg-white shadow-2xl text-black rounded-2xl p-2"
    >
      <p className="mb-5">{eventPop ? "Add new event" : "Edit Event"}</p>
      <div className="flex gap-2">
        <label htmlFor="name">Name:</label>
        <div className="flex flex-col items-start">
          <input
            id="name"
            type="text"
            ref={nameRef}
            defaultValue={eventPop ? "" : defName}
            placeholder="Enter event name"
            onChange={nameChange}
            className="w-50 py-1 bg-gray-200 rounded-md px-2 focus:outline-none placeholder:text-gray-600"
          />
          {nameValidation ? (
            <p className="text-red-500 text-[0.625rem]">Name is required</p>
          ) : null}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <label htmlFor="name">Start date:</label>
        <div className="flex flex-col items-start">
          <input
            id="name"
            type="date"
            ref={startRef}
            defaultValue={eventPop ? "" : defSDate}
            onChange={startChange}
            className="w-40 bg-gray-200 rounded-md px-2 focus:outline-none placeholder:text-gray-400"
          />
          {sDateValidation ? (
            <p className="text-red-500 text-[0.625rem]">Date is required</p>
          ) : null}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <label htmlFor="name">End date:</label>
        <div className="flex flex-col items-start">
          <input
            id="name"
            type="date"
            ref={endRef}
            defaultValue={eventPop ? "" : defEDate}
            onChange={endChange}
            className="w-40 bg-gray-200 rounded-md px-2 focus:outline-none placeholder:text-gray-400"
          />
          {eDateValidation ? (
            <p className="text-red-500 text-[0.625rem]">Date is required</p>
          ) : null}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-2">
            <div>
              <label htmlFor="addevent">Group: </label>
            </div>
            <div>
              <select
                name="addevent"
                id="addevent"
                ref={groupRef}
                defaultValue={eventPop ? "" : defGroup}
                onChange={groupChange}
                className="text-gray-600 hover:cursor-pointer bg-gray-200 rounded-2xl px-2"
              >
                <option value="" className="text-black">
                  Select a group
                </option>
                {groupList.map((group) =>
                  !group.parentGroup ? (
                    <option
                      key={group.id}
                      value={group.id}
                      className="text-black"
                    >
                      {group.content}
                    </option>
                  ) : null
                )}
              </select>
              {groupValidation ? (
                <p className="text-red-500 text-[0.625rem]">
                  Group is required
                </p>
              ) : null}
            </div>
          </div>
          {/* <div className="flex justify-between gap-2">
            <label htmlFor="addevent">Sub-Group: </label>
            <div>
              <select
                name="addevent"
                id="addevent"
                ref={groupRef}
                defaultValue={eventPop ? "" : defGroup}
                onChange={groupChange}
                className=" text-gray-600 hover:cursor-pointer bg-gray-200 rounded-2xl px-2 text-[0.75rem]"
              >
                <option value="" className="text-black">
                  Select a sub-group
                </option>
                {groupList.map((group) => (
                  <option
                    key={group.id}
                    value={group.id}
                    className="text-black"
                  >
                    {group.content}
                  </option>
                ))}
              </select>
              {groupValidation ? (
                <p className="text-red-500 text-[0.625rem]">
                  Group is required
                </p>
              ) : null}
            </div>
          </div> */}
        </div>
      </div>
      <button
        onClick={updateEvent}
        className="bg-blue-500 text-white w-fit px-5 py-1 rounded-2xl m-auto mt-5 hover:cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}

export default Popup;
