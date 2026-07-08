const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const jsPath = path.join(dist, 'assets', 'index-DqFr4PgG.js');

function copyFile(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

const assets = [
  ['ZANSHITUP/主图直通车/直通车-吸尘器.jpg', 'works/main-visual/ztc-vacuum.jpg'],
  ['ZANSHITUP/主图直通车/直通车-奶粉.jpg', 'works/main-visual/ztc-milk-powder.jpg'],
  ['ZANSHITUP/主图直通车/直通车-奶粉1.jpg', 'works/main-visual/ztc-milk-powder-02.jpg'],
  ['ZANSHITUP/主图直通车/直通车-投影仪.jpg', 'works/main-visual/ztc-projector.jpg'],
  ['ZANSHITUP/主图直通车/直通车-浴柜.jpg', 'works/main-visual/ztc-bathroom-cabinet.jpg'],
  ['ZANSHITUP/主图直通车/直通车-淋浴头.jpg', 'works/main-visual/ztc-shower-head.jpg'],
  ['ZANSHITUP/主图直通车/直通车-蛋黄酥.jpg', 'works/main-visual/ztc-pastry.jpg'],
  ['ZANSHITUP/主图直通车/直通车-螺狮粉.jpg', 'works/main-visual/ztc-noodles.jpg'],
  ['ZANSHITUP/主图直通车/直通车-音响.jpg', 'works/main-visual/ztc-speaker.jpg'],
  ['ZANSHITUP/主图直通车/图层 24.jpg', 'works/main-visual/ztc-layer-24.jpg'],

  ['ZANSHITUP/详情页/详情页首页-冰箱.jpg', 'works/detail-head/detail-fridge.jpg'],
  ['ZANSHITUP/详情页/详情页首页-水壶.jpg', 'works/detail-head/detail-kettle.jpg'],
  ['ZANSHITUP/详情页/详情页首页-水壶2.jpg', 'works/detail-head/detail-kettle-02.jpg'],
  ['ZANSHITUP/详情页/详情页首页-面霜.jpg', 'works/detail-head/detail-cream.jpg'],
  ['ZANSHITUP/详情页/需衔接-详情页/牙刷1.jpg', 'works/detail-head/detail-toothbrush-01.jpg'],
  ['ZANSHITUP/详情页/需衔接-详情页/牙刷2.jpg', 'works/detail-head/detail-toothbrush-02.jpg'],
  ['ZANSHITUP/详情页/需衔接-详情页/牙刷3.jpg', 'works/detail-head/detail-toothbrush-03.jpg'],
  ['ZANSHITUP/详情页/需衔接-详情页/贞操锁1.jpg', 'works/detail-head/detail-lock-01.jpg'],
  ['ZANSHITUP/详情页/需衔接-详情页/贞操锁2.jpg', 'works/detail-head/detail-lock-02.jpg'],

  ['ZANSHITUP/三维渲染/子弹震荡器白底.jpg', 'works/3d-design/bullet-white.jpg'],
  ['ZANSHITUP/三维渲染/手表渲染.jpg', 'works/3d-design/watch-render.jpg'],
  ['ZANSHITUP/三维渲染/手表白膜.jpg', 'works/3d-design/watch-white.jpg'],
  ['ZANSHITUP/三维渲染/榨汁机渲染.jpg', 'works/3d-design/juicer-render.jpg'],
  ['ZANSHITUP/三维渲染/榨汁机白膜.jpg', 'works/3d-design/juicer-white.jpg'],
  ['ZANSHITUP/三维渲染/空气净化器渲染1.jpg', 'works/3d-design/air-purifier-render.jpg'],
  ['ZANSHITUP/三维渲染/空气净化器白膜.jpg', 'works/3d-design/air-purifier-white.jpg'],
  ['ZANSHITUP/三维渲染/耳机渲染.jpg', 'works/3d-design/headphone-render.jpg'],
  ['ZANSHITUP/三维渲染/耳机白膜.jpg', 'works/3d-design/headphone-white.jpg'],
  ['ZANSHITUP/三维渲染/面霜白底.jpg', 'works/3d-design/cream-white.jpg'],
  ['ZANSHITUP/三维渲染/贞操锁白底.jpg', 'works/3d-design/lock-white.jpg'],
  ['ZANSHITUP/三维渲染/贞操锁白底（红）.jpg', 'works/3d-design/lock-red-white.jpg'],
];

for (const [fromRel, toRel] of assets) {
  const from = path.join(root, fromRel);
  if (!fs.existsSync(from)) {
    console.warn(`[skip] Missing ${fromRel}`);
    continue;
  }
  copyFile(from, path.join(dist, toRel));
}

let js = fs.readFileSync(jsPath, 'utf8');

const extraMainVisuals = ',{src:"./works/main-visual/ztc-vacuum.jpg",alt:"平面主图｜吸尘器卖点视觉",width:800,height:800},{src:"./works/main-visual/ztc-milk-powder.jpg",alt:"平面主图｜奶粉促销视觉",width:800,height:800},{src:"./works/main-visual/ztc-milk-powder-02.jpg",alt:"平面主图｜奶粉质感延展",width:800,height:800},{src:"./works/main-visual/ztc-projector.jpg",alt:"平面主图｜投影仪场景视觉",width:800,height:800},{src:"./works/main-visual/ztc-bathroom-cabinet.jpg",alt:"平面主图｜浴柜产品视觉",width:800,height:800},{src:"./works/main-visual/ztc-shower-head.jpg",alt:"平面主图｜淋浴头卖点视觉",width:800,height:800},{src:"./works/main-visual/ztc-pastry.jpg",alt:"平面主图｜蛋黄酥食品视觉",width:800,height:800},{src:"./works/main-visual/ztc-noodles.jpg",alt:"平面主图｜螺蛳粉食品视觉",width:800,height:800},{src:"./works/main-visual/ztc-speaker.jpg",alt:"平面主图｜音响科技视觉",width:800,height:800},{src:"./works/main-visual/ztc-layer-24.jpg",alt:"平面主图｜产品场景合成",width:800,height:800}';
js = js.replace(
  '{src:fn.fridge,alt:"平面主图｜无霜冰箱促销"}].map(id);',
  `{src:fn.fridge,alt:"平面主图｜无霜冰箱促销"}${extraMainVisuals}].map(id);`
);

const extraDetails = ',{src:"./works/detail-head/detail-fridge.jpg",alt:"冰箱详情首屏｜家电促销视觉",width:750,height:1200,aspectRatio:"750 / 1200",fit:"cover"},{src:"./works/detail-head/detail-kettle.jpg",alt:"水壶详情首屏｜厨房小家电视觉",width:750,height:1200,aspectRatio:"750 / 1200",fit:"cover"},{src:"./works/detail-head/detail-kettle-02.jpg",alt:"水壶详情首屏｜功能卖点延展",width:750,height:1200,aspectRatio:"750 / 1200",fit:"cover"},{src:"./works/detail-head/detail-cream.jpg",alt:"面霜详情首屏｜护肤产品视觉",width:750,height:1200,aspectRatio:"750 / 1200",fit:"cover"},{src:"./works/detail-head/detail-toothbrush-01.jpg",alt:"牙刷详情页｜清洁护理卖点",width:750,height:1200,aspectRatio:"750 / 1200",fit:"cover"},{src:"./works/detail-head/detail-toothbrush-02.jpg",alt:"牙刷详情页｜产品功能说明",width:750,height:1200,aspectRatio:"750 / 1200",fit:"cover"},{src:"./works/detail-head/detail-toothbrush-03.jpg",alt:"牙刷详情页｜使用场景展示",width:750,height:1200,aspectRatio:"750 / 1200",fit:"cover"},{src:"./works/detail-head/detail-lock-01.jpg",alt:"产品详情页｜结构卖点展示",width:750,height:1200,aspectRatio:"750 / 1200",fit:"cover"},{src:"./works/detail-head/detail-lock-02.jpg",alt:"产品详情页｜场景卖点延展",width:750,height:1200,aspectRatio:"750 / 1200",fit:"cover"}';
js = js.replace(
  'fit:"cover"}],Tc=[xn[1],xn[3],xn[0],xn[2],xn[4],xn[5]],$g=',
  `fit:"cover"}${extraDetails}],Tc=xn,$g=`
);

const extra3d = ',{src:"./works/3d-design/bullet-white.jpg",alt:"子弹震荡器白底产品图",width:1600,height:1600},{src:"./works/3d-design/watch-render.jpg",alt:"手表产品场景渲染",width:1600,height:1600},{src:"./works/3d-design/watch-white.jpg",alt:"手表白底产品图",width:1600,height:1600},{src:"./works/3d-design/juicer-render.jpg",alt:"榨汁机产品场景渲染",width:1600,height:1600},{src:"./works/3d-design/juicer-white.jpg",alt:"榨汁机白底产品图",width:1600,height:1600},{src:"./works/3d-design/air-purifier-render.jpg",alt:"空气净化器产品渲染",width:1600,height:1600},{src:"./works/3d-design/air-purifier-white.jpg",alt:"空气净化器白底产品图",width:1600,height:1600},{src:"./works/3d-design/headphone-render.jpg",alt:"耳机产品场景渲染",width:1600,height:1600},{src:"./works/3d-design/headphone-white.jpg",alt:"耳机白底产品图",width:1600,height:1600},{src:"./works/3d-design/cream-white.jpg",alt:"面霜白底产品图",width:1600,height:1600},{src:"./works/3d-design/lock-white.jpg",alt:"产品白底渲染图",width:1600,height:1600},{src:"./works/3d-design/lock-red-white.jpg",alt:"红色产品白底渲染图",width:1600,height:1600}';
js = js.replace(
  '{src:"/works/3d-design/reference-02.jpg",alt:"\\u590d\\u53e4\\u684c\\u9762\\u573a\\u666f\\u6e32\\u67d3",width:1480,height:1200}];',
  `{src:"/works/3d-design/reference-02.jpg",alt:"\\u590d\\u53e4\\u684c\\u9762\\u573a\\u666f\\u6e32\\u67d3",width:1480,height:1200}${extra3d}];`
);

fs.writeFileSync(jsPath, js);
console.log(`[update] Copied ${assets.length} files and updated ${path.relative(root, jsPath)}`);
