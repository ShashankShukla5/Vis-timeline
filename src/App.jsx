import "./App.css";
import { useState, useEffect } from "react";
import VisTimeline from "./components/VisTimeline";

function App() {
  const [enable, setEnable] = useState(false);
  const [eventPop, seteventPop] = useState(false);
  const [groupPop, setGroupPop] = useState(false);
  const [timelineAdd, setTimelineAdd] = useState(false);

  useEffect(() => {
    if (enable || eventPop || groupPop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [enable, eventPop, groupPop]);

  return (
    <div className="relative w-full h-full">
      {enable || eventPop || groupPop || timelineAdd ? (
        <div className="duration-900 ease-in bg-black/80 bg-opacity-50 w-full h-full z-10 absolute"></div>
      ) : null}
      <div className="w-full h-full flex flex-col px-30 pt-5 gap-11 items-center justify-start">
        <p className="text-[#efefee] font-semibold text-4xl">Timeline</p>
        <VisTimeline
          enable={enable}
          setEnable={setEnable}
          eventPop={eventPop}
          seteventPop={seteventPop}
          groupPop={groupPop}
          setGroupPop={setGroupPop}
          timelineAdd={timelineAdd}
          setTimelineAdd={setTimelineAdd}
        />
      </div>
    </div>
  );
}

export default App;
