import "./App.css";
import { useState, useEffect } from "react";
import VisTimeline from "./components/VisTimeline";
import { popups } from "../store/popups";

function App() {
  const enable = popups((state) => state.enable);
  const eventPop = popups((state) => state.eventPop);
  const groupPop = popups((state) => state.groupPop);
  const timelineAdd = popups((state) => state.timelineAdd);

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
        <VisTimeline />
      </div>
    </div>
  );
}

export default App;
