let groups = [
  { id: 1, content: "Group A", nestedGroups: [2], showNested: false},
  { id: 2, content: "Group A1", parentGroup: 1, showNested: false, },
  { id: 3, content: "Group B", nestedGroups: [4], showNested: false },
  { id: 4, content: "Group B1", parentGroup: 3, showNested: false },
  { id: 5, content: "Group C", showNested: false},
  // { id: 6, content: "Group D", showNested: false},
  // { id: 7, content: "Group E", showNested: false},
];

export default groups;
