import "./App.css";
import { useState } from "react";
import VisTimeline from './components/VisTimeline'

function App() {
  const [enable, setEnable] = useState(false)
  const [eventPop, seteventPop] = useState(false)
  const [groupPop, setGroupPop] = useState(false)
  return (
    <div className="relative w-full h-full">
      {(enable || eventPop || groupPop) ? <div className="bg-black/80 bg-opacity-50 w-full h-full z-10 absolute"></div> : null}
      <div className="w-full h-full flex flex-col px-30 pt-5 gap-11 items-center justify-start">
        <p className="text-[#efefee] font-semibold text-4xl">Timeline</p>
        <VisTimeline enable={enable} setEnable={setEnable} eventPop={eventPop} seteventPop={seteventPop} groupPop={groupPop} setGroupPop={setGroupPop}/>
      </div>
    </div>
  );
}

export default App;
