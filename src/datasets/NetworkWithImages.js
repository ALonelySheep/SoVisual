
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
    width: 2,
    color: { inherit: "from" },
    smooth: {
      type: "continuous",
    },
  },

};

var nodes = [
  {
    id: "Lannister",
    label: "Lannister",
    group: 1,
    shape: "circularImage",
    image: "./images/1.jpg"
  },
  {
    id: "Tully",
    label: "Tully",
    group: 1,
    shape: "circularImage",
    image: "./images/2.jpg"
  },
  {
    id: "Baratheon",
    label: "Baratheon",
    group: 1,
    shape: "circularImage",
    image: "./images/3.jpg"
  },
  {
    id: "Stark",
    label: "Stark",
    group: 1,
    shape: "circularImage",
    image: "./images/4.jpg"
  },
  {
    id: "Darry",
    label: "Darry",
    group: 1,
    shape: "circularImage",
    image: "./images/5.jpg"
  },
  {
    id: "Greyjoy",
    label: "Greyjoy",
    group: 1,
    shape: "circularImage",
    image: "./images/6.jpg"
  },
  {
    id: "Bolton",
    label: "Bolton",
    group: 1,
    shape: "circularImage",
    image: "./images/7.jpg"
  },
  {
    id: "Brotherhood without Banners",
    label: "Brotherhood without Banners",
    group: 2,
    shape: "circularImage",
    image: "./images/8.jpg"
  },
  {
    id: "Brave Companions",
    label: "Brave Companions",
    group: 2,
    shape: "circularImage",
    image: "./images/9.jpg"
  },
  {
    id: "Frey",
    label: "Frey",
    group: 2,
    shape: "circularImage",
    image: "./images/10.jpg"
  },
  {
    id: "Mallister",
    label: "Mallister",
    group: 2,
    shape: "circularImage",
    image: "./images/11.jpg"
  },
  {
    id: "Free folk",
    label: "Free folk",
    group: 1,
    shape: "circularImage",
    image: "./images/12.jpg"
  },
  {
    id: "Night's Watch",
    label: "Night's Watch",
    group: 3,
    shape: "circularImage",
    image: "./images/13.jpg"
  },
  {
    id: "Tyrell",
    label: "Tyrell",
    group: 3,
    shape: "circularImage",
    image: "./images/15.jpg"
  },
  {
    id: "Bracken",
    label: "Bracken",
    group: 3,
    shape: "circularImage",
    image: "./images/14.jpg"
  },
  {
    id: "Blackwood",
    label: "Blackwood",
    group: 1,
    shape: "circularImage",
    image: "./images/22.jpg"
  }
]
var edges = [
  { from: "Lannister", to: "Tully" },
  { from: "Lannister", to: "Baratheon" },
  { from: "Stark", to: "Lannister" },
  { from: "Lannister", to: "Darry" },
  { from: "Greyjoy", to: "Stark" },
  { from: "Stark", to: "Greyjoy" },
  { from: "Bolton", to: "Stark" },
  { from: "Baratheon", to: "Lannister" },
  { from: "Darry", to: "Lannister" },
  { from: "Brotherhood without Banners", to: "Brave Companions" },
  { from: "Lannister", to: "Stark" },
  { from: "Lannister", to: "Brave Companions" },
  { from: "Frey", to: "Stark" },
  { from: "Frey", to: "Mallister" },
  { from: "Free folk", to: "Night's Watch" },
  { from: "Free folk", to: "Baratheon" },
  { from: "Bolton", to: "Greyjoy" },
  { from: "Baratheon", to: "Greyjoy" },
  { from: "Greyjoy", to: "Tyrell" },
  { from: "Bracken", to: "Blackwood" },
  { from: "Baratheon", to: "Bolton" },
  { from: "Baratheon", to: "Frey" }
]


var labels = ['群组编号']
var name = "NetworkWithImages"

module.exports = { options, nodes, edges, labels, name };

