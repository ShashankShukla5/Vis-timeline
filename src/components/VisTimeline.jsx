import React, { useEffect, useRef, useState } from "react";
import { Timeline } from "vis-timeline/standalone";
import { DataSet } from "vis-data";
import "vis-timeline/styles/vis-timeline-graph2d.css";
import "../App.css";
import data from "../utils/data";
import groups from "../utils/groups";
import GroupForm from "./GroupForm";
import Popup from "./Popup";

const VisTimeline = ({
  enable,
  setEnable,
  eventPop,
  seteventPop,
  groupPop,
  setGroupPop,
}) => {
  const timelineRef = useRef(null);
  const groupsRef = useRef(null);
  const itemsRef = useRef(new DataSet([]));
  const timelineInstance = useRef(null);
  const [group, setgroup] = useState(null);
  const [name, setname] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [eventDetail, setEventDetail] = useState();
  const [eventsList, setEventsList] = useState([]);
  const [groupName, setgroupName] = useState(null);
  const [groupList, setgroupList] = useState(groups);
  const groupSelectRef = useRef(null);
  const [doubleClickId, setdoubleClickId] = useState(null);
  const [defGroup, setdefGroup] = useState(null);
  const [defName, setdefName] = useState("");
  const [defSDate, setdefSDate] = useState(null);
  const [defEDate, setdefEDate] = useState(null);

  const start = new Date("2024-01-01T12:00");
  const end = new Date(start);
  end.setDate(end.getDate() + 65);

  useEffect(() => {
    if (timelineRef.current) {
      if (timelineInstance.current) {
        timelineInstance.current.destroy();
      }

      groupsRef.current = new DataSet(groups);

      itemsRef.current = new DataSet(data);

      const options = {
        multiselect: true,
        stack: true,
        margin: { item: 0 },
        showCurrentTime: true,
        zoomable: true,
        showTooltips: true,
        height: "220px",
        maxHeight: "600px",
        verticalScroll: true,
        cluster: {
          maxItems: 1,
          titleTemplate: "Overlapping items",
        },
        preferZoom: true,
        orientation: "top",
        editable: true,
        editable: {
          add: false,
          updateTime: true,
          updateGroup: true,
          remove: true,
          overrideItems: false,
        },
      };
      timelineInstance.current = new Timeline(
        timelineRef.current,
        itemsRef.current,
        groupsRef.current,
        options
      );
    }

    adjustTimeLineBounds();

    if (timelineInstance.current) {
      timelineInstance.current.redraw();
      const range = timelineInstance.current.getWindow();
      timelineInstance.current.setWindow(range.start, range.end);
    }

    timelineInstance.current.on("doubleClick", function (props) {
      if (props.item) {
        var sDate = new Date(itemsRef.current.get(props.item).start);
        var eDate = new Date(itemsRef.current.get(props.item).end);

        setEnable(true);
        setdoubleClickId(props.item);
        setdefGroup(itemsRef.current.get(props.item).group);
        setdefName(itemsRef.current.get(props.item).content);

        const offset = sDate.getTimezoneOffset();

        const localStartDate = new Date(sDate.getTime() - offset * 60000);
        const localEndDate = new Date(eDate.getTime() - offset * 60000);

        setdefSDate(localStartDate.toISOString().slice(0, 16));
        setdefEDate(localEndDate.toISOString().slice(0, 16));
        console.log(localStartDate.toISOString().slice(0, 16));
      }
    });

    timelineInstance.current.on("click", function (props) {
      if (props.item) {
        const eventId = props.item;
        setEventDetail(itemsRef.current.get(eventId));
      }
      timelineInstance.current.redraw();
    });

    return () => {
      if (timelineInstance.current) {
        timelineInstance.current.destroy();
        timelineInstance.current = null;
      }
    };
  }, [data]);

  function adjustTimeLineBounds() {
    const events = itemsRef.current.get();
    if (events.length === 0) return;

    const minDate = new Date(
      Math.min(...events.map((event) => new Date(event.start).getTime()))
    );
    const maxDate = new Date(
      Math.max(
        ...events.map((event) =>
          event.end
            ? new Date(event.end).getTime()
            : new Date(event.start).getTime()
        )
      )
    );

    minDate.setDate(minDate.getDate() - 60);
    maxDate.setDate(maxDate.getDate() + 60);

    timelineInstance.current.setWindow(minDate, maxDate);
    
    reset();
    timelineInstance.current.redraw();
  }

  function countObjects(obj) {
    let count = 0;

    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        count += 1;
      }
    }

    return count;
  }

  const addEvent = () => {
    const colors = ["red", "blue", "green", "yellow", "purple"];
    const newId = countObjects(timelineInstance.current.itemSet.items) + 1;

    const newEvent = {
      id: newId,
      content: name ? name : `Event ${newId}`,
      title: `It is event ${newId} <br>Start: ${
        startDate
          ? startDate.toString()
          : new Date(start).toISOString().split("T")[0]
      } <br>End: ${
        endDate ? endDate.toString() : new Date(end).toISOString().split("T")[0]
      }`,
      start: startDate ? startDate.toString() : new Date(start).toISOString(),
      end: endDate ? endDate.toString() : new Date(end).toISOString(),
      group: group ? group : 1,
      className: colors[Math.floor(Math.random() * colors.length)],
    };
    itemsRef.current.add(newEvent);
    setgroup(null);
    alert("New Item added");
    adjustTimeLineBounds();
    return;
  };

  const addGroup = () => {
    const newId = groupsRef.current.length;

    if (group) {
      console.log(group);
      var groupId = parseInt(group);
      const getGroup = groupsRef.current.get(groupId);

      if (!getGroup.nestedGroups) {
        getGroup.nestedGroups = [];
      }

      getGroup.nestedGroups.push(newId + 1);
      groupsRef.current.update({
        id: groupId,
        nestedGroups: getGroup.nestedGroups,
        showNested: true,
      });

      let parentId = groupId;
      while (parentId) {
        const parentGroup = groupsRef.current.get(parentId);
        if (parentGroup) {
          parentGroup.showNested = true;
          groupsRef.current.update(parentGroup);
          parentId = parentGroup.parentGroup;
        } else {
          break;
        }
      }
    }

    const newGroup = {
      id: newId + 1,
      content: groupName ? groupName : `New Grp ${newId + 1}`,
      parentGroup: groupId,
    };

    groupsRef.current.add(newGroup);
    groupsRef.current.update(groupsRef.current.get());
    setgroupList(groupsRef.current.get());
    alert("New group added");
    return;
    console.log(groupList);
  };

  const popUpUpdate = () => {
    const item = itemsRef.current.get(doubleClickId);
    const sDate = new Date(item.start).toISOString().split("T")[0];
    const eDate = item.end
      ? new Date(item.end).toISOString().split("T")[0]
      : null;
    console.log(item);
    itemsRef.current.update({
      id: doubleClickId,
      content: name ? name : item.content,
      start: startDate ? startDate : sDate,
      end: endDate ? endDate : eDate,
      group: group ? group : item.group,
    });
    timelineInstance.current.redraw();
  };

  const deleteSelectedEvent = () => {
    if (!timelineInstance.current) return;

    const selectedItems = timelineInstance.current.getSelection();
    if (selectedItems.length === 0) {
      alert("Please select an event to delete.");
      return;
    }
    itemsRef.current.remove(selectedItems[0]);
    alert("Event deleted!");
    adjustTimeLineBounds();
  };

  const deleteGroup = () => {
    const groupId = parseInt(group, 10);
    if (!groupId) {
      alert("Select group to delete");
      return;
    }
    const parentId = getParentGroup(groupId);
    if (parentId) {
      const parentGrp = groupsRef.current.get(parentId);
      const newNestedParent = parentGrp.nestedGroups.filter(
        (id) => id !== groupId
      );
      parentGrp.nestedGroups = newNestedParent;
      if (newNestedParent.length === 0) {
        delete parentGrp.nestedGroups;
      }
      groupsRef.current.update({ ...parentGrp });
    }

    const groupItems = itemsRef.current.get({
      filter: (item) => item.group === groupId,
    });
    itemsRef.current.remove(groupItems.map((item) => item.id));

    groupsRef.current.remove(groupId);
    alert("Group Deleted");
    groupSelectRef.current.value = "";
    setgroupList(groupsRef.current.get());
  };

  const showEvents = () => {
    const events = itemsRef.current.get();
    setEventsList(JSON.stringify(events, null, 2));
  };

  function reset() {
    if (timelineInstance.current) {
      timelineInstance.current.fit();
    }
  }

  const groupChange = (e) => {
    setgroup(e.target.value);
  };

  ///////////////////////////////////////////////////////////////////////////
  const getParentGroup = (childGroupId) => {
    const childGroup = groupsRef.current.get(childGroupId);

    if (!childGroup || !childGroup.parentGroup) {
      console.log("No parent group found for this group.");
      return null;
    }

    const parentGroup = groupsRef.current.get(childGroup.parentGroup);
    console.log(`Parent of Group ${childGroupId} is:`, parentGroup);
    return parentGroup.id;
  };
  //////////////////////////////////////////////////////////////////////////////

  return (
    <div className="relative flex flex-col w-full h-fit gap-5 pb-10">
      {enable ? (
        <Popup
          setEnable={setEnable}
          setgroup={setgroup}
          setname={setname}
          addEvent={addEvent}
          groupList={groupList}
          setstartDate={setstartDate}
          setendDate={setendDate}
          popUpUpdate={popUpUpdate}
          enable={enable}
          setdefGroup={setdefGroup}
          defGroup={defGroup}
          defName={defName}
          defSDate={defSDate}
          defEDate={defEDate}
          setdefName={setdefName}
          setdefSDate={setdefSDate}
          setdefEDate={setdefEDate}
          eventPop={eventPop}
          seteventPop={seteventPop}
        />
      ) : null}
      <div
        ref={timelineRef}
        className="timeline w-full h-[14.0625rem] overflow-y-auto"
      />
      <div className="flex gap-10">
        {eventPop ? (
          <Popup
            setEnable={setEnable}
            setgroup={setgroup}
            setname={setname}
            addEvent={addEvent}
            groupList={groupList}
            setstartDate={setstartDate}
            setendDate={setendDate}
            popUpUpdate={popUpUpdate}
            enable={enable}
            setdefGroup={setdefGroup}
            defGroup={defGroup}
            defName={defName}
            defSDate={defSDate}
            defEDate={defEDate}
            eventPop={eventPop}
            seteventPop={seteventPop}
            setdefName={setdefName}
            setdefSDate={setdefSDate}
            setdefEDate={setdefEDate}
          />
        ) : null}
        {groupPop ? (
          <GroupForm
            setgroupName={setgroupName}
            addGroup={addGroup}
            groupList={groupList}
            setgroup={setgroup}
            groupPop={groupPop}
            setGroupPop={setGroupPop}
          />
        ) : null}

        <div className="flex flex-wrap gap-7 h-fit">
          <button
            onClick={() => setGroupPop(true)}
            className="btn-component bg-[#222834] w-fit px-3 px-1 rounded-2xl hover:cursor-pointer"
          >
            Add Group
          </button>
          <button
            onClick={() => seteventPop(true)}
            className="btn-component bg-[#222834] w-fit px-3 px-1 rounded-2xl hover:cursor-pointer"
          >
            Add Event
          </button>
          <button
            className="btn-component bg-[#222834] w-fit px-3 px-1 rounded-2xl hover:cursor-pointer"
            onClick={deleteSelectedEvent}
          >
            Delete Selected Event
          </button>
          <div className="btn-component bg-[#222834] flex gap-2 shadow-2xl rounded-2xl pl-2">
            <label htmlFor="addevent" className="text-white">
              Group:{" "}
            </label>
            <select
              name="addevent"
              id="addevent"
              ref={groupSelectRef}
              defaultValue=""
              onChange={groupChange}
              className="text-gray-600 bg-[#222834] w-30 hover:cursor-pointer focus:outline-none focus:border-none"
            >
              <option value="" className="text-gray-400">
                Groups
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
            <button
              onClick={deleteGroup}
              className="bg-[#4666ae] font-semibold rounded-2xl px-2 hover:cursor-pointer"
            >
              Delete
            </button>
          </div>
          <button
            className="btn-component bg-[#222834] w-fit px-3 px-1 rounded-2xl hover:cursor-pointer"
            onClick={showEvents}
          >
            Show All Events
          </button>
          <button
            onClick={reset}
            className="btn-component bg-[#222834] w-20 rounded-2xl hover:cursor-pointer"
          >
            Resize
          </button>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="container-component bg-[#1d2127] flex flex-col w-full border border-gray-300 pl-4 h-[300px] rounded-lg mt-4 text-black">
          <h3 className="text-lg text-white font-semibold mb-2 mt-4">
            All events:{" "}
          </h3>

          <textarea
            value={eventsList}
            readOnly
            onChange={(e) => setJsonData(e.target.value)}
            className="bg-[#ffffff00] w-full h-full p-2 font-mono focus:outline-none text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default VisTimeline;
