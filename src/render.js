//* ///////////////
//? render.js
//? 负责:
//? - 可视化主界面的显示
//? - 网络数据的处理
//? - 朋友筛选逻辑的实现
//? - 显示朋友列表
//* ///////////////

var vis = require("vis-network/standalone/umd/vis-network.min")

// 获取容器
var container = document.getElementById("myNetwork");
// 数据集详细信息
var data;
var nodesDataset;
var edgesDataset;
var options;
var network;
//保存原始数据, 方便后来重置
var originalData;
var tableLabel;
var datasetName;

function loadDataset(path) {
   const dataset = require(path);
   nodesDataset = new vis.DataSet(dataset.nodes);
   edgesDataset = new vis.DataSet(dataset.edges);
   options = dataset.options;
   tableLabel = dataset.labels;
   datasetName = dataset.name;
   data = {
      nodes: nodesDataset,
      edges: edgesDataset,
   };
   originalData = {
      originalNodes: nodesDataset,
      originalEdges: edgesDataset,
   };

}

// 选择数据部分
datasetPath = document.getElementById('dataset')
getDataset = document.getElementById('getDataset')

getDataset.onclick = function mainLoad() {
   loadDataset(datasetPath.options[datasetPath.selectedIndex].value);
   // console.log(options)
   network = new vis.Network(container, data, options);
   refreshNetwork();
}

//启动预加载 初始化关系图
loadDataset(datasetPath.options[datasetPath.selectedIndex].value);
network = new vis.Network(container, data, options);
refreshNetwork();


//! ///////////////////////////
//! 下面是社交网络关系分析主要部分
//! ///////////////////////////
var allNodes;
var selectedNode;
var highlightActive = false;
var firstLevelNodes;
var secondLevelNodes;

function refreshNetwork() {

   network = new vis.Network(container, data, options);

   // get a JSON object
   allNodes = nodesDataset.get({ returnType: "Object" });

   network.on("click", neighbourhoodHighlight);
}

function neighbourhoodHighlight(params) {
   // 如果鼠标点击了某一个对象
   if (params.nodes.length > 0) {
      highlightActive = true;
      var i, j;
      selectedNode = params.nodes[0];
      var degrees = 2;

      // 先"变灰"所有的节点
      for (var nodeId in allNodes) {
         allNodes[nodeId].color = "rgba(100,100,100,0.1)";
         if (allNodes[nodeId].hiddenLabel === undefined) {
            allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
            allNodes[nodeId].label = undefined;
         }
      }
      // 获取目标对象的"直接朋友"(一级节点)
      firstLevelNodes = network.getConnectedNodes(selectedNode);
      secondLevelNodes = [];

      //  获取目标对象"朋友的朋友"(二级节点)
      for (i = 1; i < degrees; i++) {
         for (j = 0; j < firstLevelNodes.length; j++) {
            secondLevelNodes = secondLevelNodes.concat(
               network.getConnectedNodes(firstLevelNodes[j])
            );
         }
      }

      // 将所有的二级节点做特殊标注: 颜色变为黄色, 标签还原
      for (i = 0; i < secondLevelNodes.length; i++) {
         allNodes[secondLevelNodes[i]].color = "rgba(255,202,40,70)";
         if (allNodes[secondLevelNodes[i]].hiddenLabel !== undefined) {
            allNodes[secondLevelNodes[i]].label =
               allNodes[secondLevelNodes[i]].hiddenLabel;
            allNodes[secondLevelNodes[i]].hiddenLabel = undefined;
         }
      }
      // console.log(allNodes[secondLevelNodes[0]])
      // 所有的一级节点进行特殊标注: 颜色还原, 标签还原
      for (i = 0; i < firstLevelNodes.length; i++) {
         allNodes[firstLevelNodes[i]].color = undefined;
         if (allNodes[firstLevelNodes[i]].hiddenLabel !== undefined) {
            allNodes[firstLevelNodes[i]].label =
               allNodes[firstLevelNodes[i]].hiddenLabel;
            allNodes[firstLevelNodes[i]].hiddenLabel = undefined;
         }
      }

      // 主节点进行特殊处理
      allNodes[selectedNode].color = undefined;
      if (allNodes[selectedNode].hiddenLabel !== undefined) {
         allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
         allNodes[selectedNode].hiddenLabel = undefined;
      }
   } else if (highlightActive === true) {
      // 移动时还原节点
      for (var nodeId in allNodes) {
         allNodes[nodeId].color = undefined;
         if (allNodes[nodeId].hiddenLabel !== undefined) {
            allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
            allNodes[nodeId].hiddenLabel = undefined;
         }
      }
      highlightActive = false;

   }

   showFriends()

   // 将处理后的数据导出, 刷新图像
   var updateArray = [];
   for (nodeId in allNodes) {
      if (allNodes.hasOwnProperty(nodeId)) {
         updateArray.push(allNodes[nodeId]);
      }
   }
   nodesDataset.update(updateArray);
}


//! /////////////
//! 排序潜在朋友
//! /////////////

async function countUniqueFriends() {
   var secondNodeID = [];
   var secondNodeNum = [];
   secondLevelNodes.forEach(nodeID => {
      var index = secondNodeID.indexOf(nodeID);
      if (index === -1) {
         secondNodeID.push(nodeID);
         secondNodeNum.push(1);
      } else {
         secondNodeNum[index]++;
      }
   })
   let secondNodePairs = [];
   for (let i = 0; i < secondNodeID.length; i++) {
      secondNodePairs.push({
         ID: secondNodeID[i],
         Num: secondNodeNum[i]
      })
   }
   return secondNodePairs;
}

const swapPair = (a, b) => {
   let t = a;
   a = b;
   b = t;
   return [a, b]
}


function partition(a, left, right, pivotIndex) {
   pivotValue = a[pivotIndex].Num;
   // Move Pivot to the End
   // console.log('a[pivotIndex]', a[pivotIndex])
   // console.log('a[right]', a[right])
   [a[pivotIndex].ID, a[right].ID] = swapPair(a[pivotIndex].ID, a[right].ID);// This Semicolon
   [a[pivotIndex].Num, a[right].Num] = swapPair(a[pivotIndex].Num, a[right].Num);// This Semicolon
   storeIndex = left;
   for (let i = left; i <= right - 1; i++) {
      if (a[i].Num <= pivotValue) {
         [a[storeIndex].ID, a[i].ID] = swapPair(a[storeIndex].ID, a[i].ID);// This Semicolon
         [a[storeIndex].Num, a[i].Num] = swapPair(a[storeIndex].Num, a[i].Num);// This Semicolon
         storeIndex = storeIndex + 1
      }
   }
   // Move Pivot to the right place
   [a[storeIndex].ID, a[right].ID] = swapPair(a[storeIndex].ID, a[right].ID);// This Semicolon
   [a[storeIndex].Num, a[right].Num] = swapPair(a[storeIndex].Num, a[right].Num);// This Semicolon
   return storeIndex
}

async function sortNodePairs(arr, left, right) {
   // return new Promise(resolve => {
   if (right > left) {
      var pivotIndex = Math.floor(arr.length / 2)
      var pivotNewIndex = partition(arr, left, right, pivotIndex)
      sortNodePairs(arr, left, pivotNewIndex - 1)
      sortNodePairs(arr, pivotNewIndex + 1, right)
   }
   // }
   // )
}


async function filterSecondLevel(arr) {
   for (let i = 0; i < arr.length; i++) {
      if (arr[i].ID === selectedNode || firstLevelNodes.indexOf(arr[i].ID) !== -1) {
         arr.splice(i, 1);
      }
   }
   return arr;
}




//! ////////////
//! 打印潜在朋友
//! ////////////

function showFriends() {
   $(document).ready(async function () {
      //先对所有潜在朋友进行排序:
      let Pairs = await countUniqueFriends();
      console.log(Pairs)
      Pairs = await filterSecondLevel(Pairs);
      await sortNodePairs(Pairs, 0, Pairs.length - 1);
      Pairs = Pairs.reverse();
      console.log(Pairs)


      //生成表格内容
      let scrollTable = '';
      scrollTable += '<tr>';
      scrollTable += '   <th>排名</th>';
      scrollTable += '   <th>姓名</th>';
      scrollTable += `   <th>${tableLabel[0]}</th>`;
      scrollTable += '   <th>共同好友数</th>';
      scrollTable += '</tr>';

      for (let i = 0; i < Pairs.length; i++) {
         scrollTable += '<tr>';
         scrollTable += `<td>${i + 1}</td>`;
         scrollTable += `<td>${allNodes[Pairs[i].ID].label}</td>`;

         if (datasetName === "SocialNetwork")
            scrollTable += `<td>${allNodes[Pairs[i].ID].group}</td>`;
         else if (datasetName === "WorldCup")
            scrollTable += `<td>${allNodes[Pairs[i].ID].title}</td>`;
         else if (datasetName === "NetworkWithImages")
            scrollTable += `<td>${allNodes[Pairs[i].ID].group}</td>`;
         else if (datasetName === "karateclub")
            scrollTable += `<td>${allNodes[Pairs[i].ID].id}</td>`;
         scrollTable += `<td>${Pairs[i].Num}</td>`;
         scrollTable += '</tr>';
      }

      $('#right-table2').html(scrollTable);
      //滚动
      $('#right-div2').on('scroll', function () {
         let top = $(this).scrollTop();
         $('#left-div2').scrollTop(top);
      })

   }
   )
}

//! ////////////////
//! 重载按钮部分
//! ////////////////
//* Reset
function resetGraph() {
   const { getCurrentWindow } = require('electron').remote;
   var reload = () => {
      getCurrentWindow().reload()
   }
   reload();
}

var reseter = document.getElementById("reset");
reseter.onclick = function () {
   resetGraph();
}




// 调试所用数据与配置模板

// 调试数据
// let Pairs = [
//    { ID: 'C', Num: 21 },
//    { ID: 'B', Num: 45 },
//    { ID: 'F', Num: 0 },
//    { ID: 'E', Num: 1 },
//    { ID: 'D', Num: 9 },
//    { ID: 'A', Num: 100 }
// ];


// 创建节点数据数组
// var nodesDataset = new vis.DataSet([
//    { id: 1, label: "1" },
//    { id: 2, label: "2" },
//    { id: 3, label: "3" },
//    { id: 4, label: "4" },
//    { id: 5, label: "5" },
//    { id: 6, label: "6" },
// ]);

// 创建边数据数组
// var edgesDataset = new vis.DataSet([
//    { id: '1-2', from: 1, to: 2, label: '2' },
//    { id: '1-3', from: 1, to: 3, label: '4' },
//    { id: '2-3', from: 2, to: 3, label: '2' },
//    { id: '2-4', from: 2, to: 4, label: '4' },
//    { id: '2-5', from: 2, to: 5, label: '2' },
//    { id: '3-5', from: 3, to: 5, label: '3' },
//    { id: '4-5', from: 4, to: 5, label: '3' },
//    { id: '4-6', from: 4, to: 6, label: '2' },
//    { id: '5-6', from: 5, to: 6, label: '2' },
// ]);

//! ////////////
//! 配置模板
//! ////////////
//
// var options = {
//    //? Basic Options
//    autoResize: true,
//    height: '100%',
//    width: '100%',
//    locale: 'en',
//    locales: locales,
//    clickToUse: false,
//    //? SideBar Setting Menu Config
//    configure: {
//       enabled: false,
//       filter: true,//'nodes,edges',
//       container: undefined,
//       showButton: true
//    },
//    //?  Manually Edit Node etc..
//    manipulation: {
//       enabled: true,
//       initiallyActive: false,
//       addNode: true,
//       addEdge: true,
//       editNode: undefined,
//       editEdge: true,
//       deleteNode: true,
//       deleteEdge: true,
//       controlNodeStyle: {
//          //? all node options are valid.
//       },
//    },
//    //? Edges: Global Settings, Top Priority
//    //? You can use "id" to config a single edge
//    edges: {
//       width: 2,
//       smooth: {
//          enabled: false,
//          type: "dynamic",
//          roundness: 0.5
//       },
//       selectionWidth: 3,
//       color: {
//          color: '#848484',
//          highlight: '#848484',
//          hover: '#848484',
//          inherit: 'from',
//          opacity: 1.0
//       },
//       //?and many other configs....
//    },
//    //? Nodes Global Settings, Top Priority
//    //? You can use "id" to config a single Node
//    nodes: {
//       shape: "circle",
//       size: 20,
//       font: {
//          align: 'center',
//          size: 15, // px
//       },
//       scaling: {
//          label: {
//             enabled: true,
//          }
//       },
//       margin: 15,
//       borderWidth: 3,
//       color: {
//          // border: '#2B7CE9',
//          border: '#5D5858',
//          background: '#848484',
//          highlight: {
//             border: '#ED9312',
//             background: '#FFCA28'
//          }
//       }
//    },
//    //? Groups
//    // groups: {
//    //    A: {
//    //       color: { background: "blue", border: "blue" },
//    //    },
//    //    B: {
//    //       color: { background: "yellow", border: "red" },

//    //    },
//    // },
//    layout: {
//       randomSeed: 0.6385904628412029,
//    },
//    interaction: {
//       navigationButtons: true,
//       keyboard: true,
//    },

//    physics: false

// };