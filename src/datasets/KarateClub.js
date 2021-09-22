
var locales = {
   en: {
      edit: '编辑',
      del: '删除所选对象',
      back: '返回',
      addNode: '添加节点',
      addEdge: '添加边',
      editNode: '编辑节点',
      editEdge: '编辑边',
      addDescription: '点击空白处来添加节点',
      edgeDescription: '点击某一结点并且拖拽以编辑',
      editEdgeDescription: '点击并拖拽以编辑',
      createEdgeError: '无法将节点与集群相连接',
      deleteClusterError: '集群对象无法删除',
      editClusterError: '集群对象无法编辑'
   }
}

var options = {
   locale: 'en',
   locales: locales,
   nodes: {
      shape: "dot",
      size: 16,
   },

   edges: {
      width: 0.15,
      color: { inherit: "from" },
      smooth: {
         type: "continuous",
      },
   },
   physics: false,
   interaction: {
      tooltipDelay: 200,
      hideEdgesOnDrag: true,
      hideEdgesOnZoom: true,
   },
   manipulation: {
      enabled: true,
      initiallyActive: false,
      addNode: true,
      addEdge: true,
      editEdge: true,
      deleteNode: true,
      deleteEdge: true,
   },

};


var nodes = [
   {
      label: 13,
      x: -448.3699645996094,
      y: 194.4602813720703,
      id: 13
   },
   {
      label: 3,
      x: -75.39453125,
      y: 163.75331115722656,
      id: 3
   },
   {
      label: 15,
      x: 313.7953796386719,
      y: 220.38807678222656,
      id: 15
   },
   {
      label: 1,
      x: 453.6425476074219,
      y: -159.96229553222656,
      id: 1
   },
   {
      label: 22,
      x: -371.4848937988281,
      y: 436.6468811035156,
      id: 22
   },
   {
      label: 24,
      x: 89.84811401367188,
      y: -405.9891357421875,
      id: 24
   },
   {
      label: 32,
      x: 143.72909545898438,
      y: 216.44581604003906,
      id: 32
   },
   {
      label: 8,
      x: 469.7720031738281,
      y: -130.0166473388672,
      id: 8
   },
   {
      label: 29,
      x: -174.7086181640625,
      y: -342.4861755371094,
      id: 29
   },
   {
      label: 7,
      x: 122.12893676757812,
      y: -462.7961120605469,
      id: 7
   },
   {
      label: 33,
      x: -332.5189514160156,
      y: 345.9900207519531,
      id: 33
   },
   {
      label: 6,
      x: 34.810577392578125,
      y: -299.8601989746094,
      id: 6
   },
   {
      label: 25,
      x: 319.2100524902344,
      y: -333.1614074707031,
      id: 25
   },
   {
      label: 26,
      x: 190.43954467773438,
      y: 324.8196716308594,
      id: 26
   },
   {
      label: 14,
      x: -503.9301452636719,
      y: -354.8351745605469,
      id: 14
   },
   {
      label: 18,
      x: -495.4770812988281,
      y: -512.7191772460938,
      id: 18
   },
   {
      label: 10,
      x: -348.1376037597656,
      y: -346.7396545410156,
      id: 10
   },
   {
      label: 21,
      x: -413.8212585449219,
      y: -306.5780944824219,
      id: 21
   },
   {
      label: 17,
      x: 46.350921630859375,
      y: 409.2046203613281,
      id: 17
   },
   {
      label: 12,
      x: -410.4650573730469,
      y: 377.1598815917969,
      id: 12
   },
   {
      label: 20,
      x: -7.190642356872559,
      y: 404.0404968261719,
      id: 20
   },
   {
      label: 19,
      x: 291.6732482910156,
      y: 194.37892150878906,
      id: 19
   },
   {
      label: 5,
      x: -334.50372314453125,
      y: 355.7530822753906,
      id: 5
   },
   {
      label: 30,
      x: 63.012115478515625,
      y: 187.3303985595703,
      id: 30
   },
   {
      label: 4,
      x: -206.91818237304688,
      y: -64.63700866699219,
      id: 4
   },
   {
      label: 31,
      x: 399.9858703613281,
      y: -397.5914001464844,
      id: 31
   },
   {
      label: 9,
      x: 378.2152404785156,
      y: 270.5609436035156,
      id: 9
   },
   {
      label: 23,
      x: 310.4322814941406,
      y: -64.41752624511719,
      id: 23
   },
   {
      label: 11,
      x: 312.9632873535156,
      y: 246.50257873535156,
      id: 11
   },
   {
      label: 27,
      x: -131.60726928710938,
      y: 207.3105010986328,
      id: 27
   },
   {
      label: 16,
      x: 132.89364624023438,
      y: -29.76038932800293,
      id: 16
   },
   {
      label: 34,
      x: 330.9775695800781,
      y: -289.9029846191406,
      id: 34
   },
   {
      label: 28,
      x: 73.34597778320312,
      y: 221.48585510253906,
      id: 28
   },
   {
      label: 2,
      x: -222.69851684570312,
      y: -274.7777404785156,
      id: 2
   }
]
var edges = [
   { from: 34, to: 24 },
   { from: 8, to: 4 },
   { from: 3, to: 1 },
   { from: 4, to: 3 },
   { from: 20, to: 2 },
   { from: 30, to: 27 },
   { from: 34, to: 32 },
   { from: 34, to: 31 },
   { from: 33, to: 31 },
   { from: 34, to: 19 },
   { from: 34, to: 21 },
   { from: 11, to: 6 },
   { from: 33, to: 32 },
   { from: 34, to: 15 },
   { from: 30, to: 24 },
   { from: 14, to: 1 },
   { from: 18, to: 2 },
   { from: 34, to: 14 },
   { from: 28, to: 25 },
   { from: 33, to: 19 },
   { from: 13, to: 4 },
   { from: 18, to: 1 },
   { from: 9, to: 3 },
   { from: 34, to: 29 },
   { from: 13, to: 1 },
   { from: 34, to: 9 },
   { from: 8, to: 2 },
   { from: 29, to: 3 },
   { from: 14, to: 3 },
   { from: 8, to: 1 },
   { from: 2, to: 1 },
   { from: 7, to: 5 },
   { from: 3, to: 2 },
   { from: 33, to: 30 },
   { from: 11, to: 5 },
   { from: 14, to: 2 },
   { from: 28, to: 24 },
   { from: 34, to: 28 },
   { from: 17, to: 7 },
   { from: 34, to: 16 },
   { from: 32, to: 25 },
   { from: 7, to: 1 },
   { from: 34, to: 23 },
   { from: 33, to: 21 },
   { from: 5, to: 1 },
   { from: 32, to: 29 },
   { from: 33, to: 24 },
   { from: 34, to: 20 },
   { from: 26, to: 25 },
   { from: 7, to: 6 },
   { from: 12, to: 1 },
   { from: 22, to: 2 },
   { from: 20, to: 1 },
   { from: 32, to: 26 },
   { from: 4, to: 1 },
   { from: 34, to: 27 },
   { from: 8, to: 3 },
   { from: 34, to: 10 },
   { from: 33, to: 9 },
   { from: 34, to: 33 },
   { from: 26, to: 24 },
   { from: 31, to: 2 },
   { from: 33, to: 3 },
   { from: 6, to: 1 },
   { from: 33, to: 16 },
   { from: 28, to: 3 },
   { from: 34, to: 30 },
   { from: 10, to: 3 },
   { from: 17, to: 6 },
   { from: 33, to: 23 },
   { from: 4, to: 2 },
   { from: 14, to: 4 },
   { from: 32, to: 1 },
   { from: 9, to: 1 },
   { from: 33, to: 15 },
   { from: 31, to: 9 },
   { from: 11, to: 1 },
   { from: 22, to: 1 }
]


var labels = ['群组编号']
var name = "karateclub"

module.exports = { options, nodes, edges, labels, name };