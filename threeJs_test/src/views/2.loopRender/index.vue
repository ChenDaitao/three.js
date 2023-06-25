<!--
 * @Date: 2023-06-19 16:14:05
 * @LastEditTime: 2023-06-25 14:26:20
 * @Description: 循环动画
-->

<script setup>
import * as THREE from "three";
import { onMounted } from "vue";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
// requestAnimationFrame test
let i = 0;
const render = () => {
  i++;
  if (i == 60) return;
  console.log("执行次数" + i);
  requestAnimationFrame(render);
  // NOTE: requestAnimationFrame 周期循环执行，默认每秒60次，具体需要看代码性能
};

// 旋转动画 && 动画设置
const scence = new THREE.Scene(); //创建场景

const cuboid = new THREE.BoxGeometry(100, 60, 20); //创建一个长宽高为100的长方体对象
const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  transparent: true, //开启透明
  opacity: 0.1, //设置透明度
}); //创建一个黑色网格基础材质对象 基础网格材质不受光照影响
const mesh = new THREE.Mesh(cuboid, material); //具象的三维实体对象 具有几何体和材质参数
scence.add(mesh); //通过add将实体添加到场景中

const camera = new THREE.PerspectiveCamera(30, 1, 1, 3000); //创建透视摄影机
camera.position.set(200, 200, 200); //设置摄影机位置
camera.lookAt(mesh.position); //摄影机观察位置指向实体位置

const renderer = new THREE.WebGLRenderer();
const renderWidth = 800; //定义渲染画布宽高
const renderHeight = 500;
renderer.setSize(renderWidth, renderHeight);
onMounted(() => {
  document.querySelector("#rotateRender").appendChild(renderer.domElement);
});

// const clock = new THREE.Clock();
const renderRotate = () => {
  // const spt = clock.getDelta() * 1000; //毫秒
  // console.log("两帧渲染时间间隔(毫秒)", spt);
  // console.log("帧率FPS", 1000 / spt);
  renderer.render(scence, camera);
  mesh.rotateY(0.01);
  requestAnimationFrame(renderRotate);
};
renderRotate();
render();

// 三维场景可视化
const gui = new GUI();
// 改变交互界面的Style
gui.domElement.style.right = "0px";
// gui.domElement.style.width = "300px";

// .add(控制对象，对象具体属性，其他参数)
//创建一个对象，对象属性的值可以被GUI库创建的交互界面改变
const obj = {
  x: 30,
  y: 60,
  z: 300,
};
// gui增加交互界面，用来改变obj对应属性
gui.add(obj, "x", 0, 100);
gui.add(obj, "y", 0, 50);
gui.add(obj, "z", 0, 60);

setInterval(function () {
  console.log("x", obj.x);
  console.log("y", obj.y);
  console.log("z", obj.z);
}, 10);
</script>
<template>
  <div id="rotateRender"></div>
</template>

<style lang="scss" scoped>
#rotateRender {
  width: 1000px;
  height: 700px;
  margin: 100px auto;
}
</style>
