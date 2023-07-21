<!--
 * @Date: 2023-07-11 12:31:46
 * @LastEditTime: 2023-07-21 10:12:09
 * @Description: earth-ball-roll
-->
<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ref, onMounted } from "vue";

const containerRef = ref(null); //场景挂载DOM节点

const scence = new THREE.Scene(); //创建场景

/**
 * @description: 设置渲染器
 */
const renderer = new THREE.WebGLRenderer({
  antialias: true, //抗锯齿
  precision: "highp", //着色精度选择
  logarithmicDepthBuffer: true, //消除模型交错闪烁
  preserveDraingBuffer: true, //是否可以提取canvas绘图缓冲
});
const initRender = () => {
  // renderer.setClearColor(0x000, 0); //设置场景显示区背景色
  renderer.setSize(containerRef.value, window.innerWidth, window.innerHeight); //设置场景显示区尺寸(铺满)

  renderer.setPixelRatio(window.devicePixelRatio); //设置像素比 如果移动端掉帧可以取消设置像素比
  // containerRef.value.appendChild(renderer.domElement);
};

// mounted时挂载元素 setup挂载元素存在appendChild追加失败情况
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement);
});
/**
 * @description: 设置光源（灯光）
 */
const initLight = () => {
  const ambientLight = new THREE.AmbientLight(0xf1e2e2, 1.25); //环境光设置
  scence.add(ambientLight); //加到场景里面

  const pointLight = new THREE.PointLight(0xbfbfbf, 0.6); //点光源设置
  pointLight.position.set(0, 40, 80);
  scence.add(pointLight);
};

/**
 * @description: 设置摄影机
 */
const camera = new THREE.PerspectiveCamera(
  30, //视界大小
  window.innerWidth / window.innerHeight, //投影宽高比
  1,
  100000
);
const controls = new OrbitControls(camera, renderer.domElement); // 处理鼠标可操作相机
const initCamera = () => {
  camera.position.set(697.1343985659603, 1784.0457888299613, 1566.095679557605);
  camera.up.set(0, 1, 0); //x y z 限制y只能在正方向 防止贯穿地面
  camera.lookAt(0, 0, 0); //相机监视位置

  controls.target = new THREE.Vector3(0, 1, 0); //相机初始焦点设置
  controls.enableZoom = true; //允许相机缩放
  controls.autoRotate = false; //相机自动旋转
  controls.maxPolarAngle = Math.PI / 2; //最大纵向旋转角度
  controls.enablePan = true; //是否允许相机右键拖拽
  controls.rotateSpeed = 1; //旋转速度
  controls.enableDamping = true; //动画循环时，使用阻尼或自传 即是否有惯性
  controls.minDistance = 1; //设置相机距离原点最近距离
  controls.maxDistance = 20000; //设置相机距离远点的最大距离
};

/**
 * @description: 触发动画渲染
 */
const startAnimate = () => {
  controls.update(); //更新相机位置
  renderer.render(scence, camera);
  requestAnimationFrame(startAnimate); //执行动画请求
};

/**
 * @description: 初始化辅助场景
 */
// 引入场景天空盒素材
const top = new URL("@/assets/skybox.jpeg", import.meta.url).href; //vite的动态导入静态资源 require为webpack方法
const initHelpScence = () => {
  scence.matrixAutoUpdate = false; //关闭矩阵更新
  const axes = new THREE.AxesHelper(20); //设置辅助坐标系
  scence.add(axes); //将辅助坐标系加入到场景中
  const skyBox = [top, top, top, top, top, top];
  scence.background = new THREE.CubeTextureLoader().load(skyBox); //加载天空盒模型
};

/**
 * @description: 初始化3D场景
 */
function init3DScence() {
  // // 创建组元素
  // const whole = new THREE.Group();
  // const originGroup = new THREE.Group();
  // const originBuildGroup = new THREE.Group();
  initRender(); //渲染渲染器
  initHelpScence(); //渲染辅助场景
  initCamera(); //渲染相机
  initLight(); //渲染灯光设置
  startAnimate(); //执行动画
}
init3DScence();
</script>
<template>
  <div ref="containerRef"></div>
</template>
<style lang="scss" scoped></style>
