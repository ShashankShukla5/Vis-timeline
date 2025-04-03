import React, { useEffect, useRef, useState } from "react";
import { Timeline } from "vis-timeline";

function Popup({
  addEvent,
  groupList,
  setEnable,
  popUpUpdate,
  enable,
  seteventPop,
  eventPop,
  validation,
  setValidation,
  formData,
  setFormData,
  timelineAdd,
  setTimelineAdd,
}) {
  const [nameValidation, setNameValidation] = useState(false);
  const [sDateValidation, setSDateValidation] = useState(false);
  const [eDateValidation, setEDateValidation] = useState(false);
  const [groupValidation, setGroupValidation] = useState(false);
  const [sDateColor, setSDateColor] = useState(false);
  const [eDateColor, setEDateColor] = useState(false);
  const [dropColor, setDropColor] = useState(false);

  const popUpRef = useRef(null);
  const nameRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const groupRef = useRef(null);

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
      setFormData((prev) => ({
        ...prev,
        startDate: null,
        group: null,
      }));
    }
    if (enable) {
      popUpUpdate();
      setEnable(false);
      setFormData((prev) => ({
        ...prev,
        group: null,
      }));
    }
    if (timelineAdd) {
      addEvent();
      setTimelineAdd(false);
      setFormData((prev) => ({
        ...prev,
        startDate: null,
        group: null,
      }));
    }

    groupRef.current.value = "";
    nameRef.current.value = "";
    startRef.current.value = "";
    endRef.current.value = "";

    setFormData((prev) => ({
      ...prev,
      startDate: null,
    }));

    setFormData((prev) => ({
      ...prev,
      group: null,
    }));
  }

  const nameChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
    setNameValidation(false);
  };

  const startChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      startDate: e.target.value,
    }));
    setSDateValidation(false);
    setSDateColor(true);
  };

  const endChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      endDate: e.target.value,
    }));
    setEDateValidation(false);
    setEDateColor(true);
  };

  const groupChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      group: e.target.value,
    }));
    setGroupValidation(false);
    setDropColor(true);
  };

  useEffect(() => {
    const handleMouseClick = (e) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        setEnable(false);
        seteventPop(false);
        setTimelineAdd(false);
        setFormData((prev) => ({
          ...prev,
          startDate: null,
          group: null,
        }));
      }
      if (e.key === "Escape") {
        setEnable(false);
        seteventPop(false);
        setTimelineAdd(false);
        setFormData((prev) => ({
          ...prev,
          startDate: null,
          group: null,
        }));
      }
    };
    if (enable || eventPop || timelineAdd) {
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
      className="fixed z-20 top-25 left-122 group-form flex flex-col w-90 gap-4 bg-[#161a1f] shadow-2xl text-black rounded-2xl p-7"
    >
      <p className="mb-5 text-white">
        {eventPop ? "Add new event" : "Edit Event"}
      </p>
      <div className="flex gap-2 justify-between">
        <label htmlFor="name" className="text-white">
          Name:
        </label>
        <div className="flex flex-col items-start">
          <input
            id="name"
            type="text"
            ref={nameRef}
            defaultValue={eventPop ? "" : formData.name}
            placeholder="Enter event name"
            onChange={nameChange}
            className="w-50 py-1 bg-[#222834] text-white rounded-md px-2 focus:outline-none placeholder:text-gray-600"
          />
          {nameValidation ? (
            <p className="text-red-500 text-[0.625rem]">Name is required</p>
          ) : null}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <label htmlFor="name" className="text-white">
          Start date:
        </label>
        <div className="flex flex-col items-start">
          <input
            id="name"
            type="datetime-local"
            ref={startRef}
            defaultValue={
              eventPop
                ? formData.startDate
                  ? formData.startDate
                  : ""
                : formData.startDate
            }
            onChange={startChange}
            className={`w-50 bg-[#222834] rounded-md px-2 focus:outline-none ${
              eventPop
                ? sDateColor
                  ? "text-white"
                  : "text-gray-600"
                : formData.startDate
                ? "text-white"
                : "text-gray-600"
            }`}
          />
          {sDateValidation ? (
            <p className="text-red-500 text-[0.625rem]">Date is required</p>
          ) : null}
        </div>
      </div>
      <div className="flex gap-2 justify-between">
        <label htmlFor="name" className="text-white">
          End date:
        </label>
        <div className="flex flex-col items-start">
          <input
            id="name"
            type="datetime-local"
            ref={endRef}
            defaultValue={eventPop ? "" : formData.endDate}
            onChange={endChange}
            className={`w-50 bg-[#222834] rounded-md px-2 focus:outline-none placeholder:text-gray-600 ${
              eventPop || timelineAdd
                ? eDateColor
                  ? "text-white"
                  : "text-gray-600"
                : formData.endDate
                ? "text-white"
                : "text-gray-600"
            }`}
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
              <label htmlFor="addevent" className="text-white">
                Group:{" "}
              </label>
            </div>
            <div>
              <select
                name="addevent"
                id="addevent"
                ref={groupRef}
                defaultValue={
                  eventPop
                    ? formData.group
                      ? formData.group
                      : ""
                    : formData.group
                }
                onChange={groupChange}
                className={`w-50 text-gray-600 hover:cursor-pointer bg-[#222834] rounded-2xl px-2 ${
                  eventPop
                    ? dropColor
                      ? "text-white"
                      : "text-gray-600"
                    : formData.group
                    ? "text-white"
                    : "text-gray-600"
                }`}
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
                    <option
                      key={group.id}
                      value={group.id}
                      className="text-white"
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
          </div>
        </div>
      </div>
      <button
        onClick={updateEvent}
        className="bg-[#4464ab] text-white w-fit px-5 py-1 rounded-2xl m-auto mt-5 hover:cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}

export default Popup;
