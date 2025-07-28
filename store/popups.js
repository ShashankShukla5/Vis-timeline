import { create } from "zustand";
import { combine } from "zustand/middleware";

export const popups = create(
  combine(
    {
      enable: false,
      eventPop: false,
      groupPop: false,
      timelineAdd: false,
    },
    (set) => ({
      setEnable: (val) => set({ enable: val }),
      seteventPop: (val) => set({ eventPop: val }),
      setGroupPop: (val) => set({ groupPop: val }),
      setTimelineAdd: (val) => set({ timelineAdd: val }),
    })
  )
);
