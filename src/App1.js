import React from 'react';
import BarChart from './BarChart';
import ThreeChart1 from './TreeChart1';
import data from './data.json'
import './App.css';
import Tree from 'react-d3-tree';

// var treeData =
// {
//   "name": "Top Level",
//   "children": [
//     {
//       "name": "Level 2: A",
//       "children": [
//         { "name": "Son of A" },
//         { "name": "Daughter of A" }
//       ]
//     },
//     { "name": "Level 2: B" }
//   ]
// };

export default function StyledNodesTree() {
  return (
    <div id="treeWrapper" style={{ width: '300em', height: '150em' }}>
      <Tree
        data={data}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
      />
    </div>
  );
}