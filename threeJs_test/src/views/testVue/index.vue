<!--
 * @Date: 2023-06-16 15:41:00
 * @LastEditTime: 2023-06-16 17:50:47
 * @Description: THREE test
-->
<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* 1.创建基本场景 NOTE: */
const scence = new THREE.Scene(); //创建场景

const cuboid = new THREE.BoxGeometry(100, 60, 20); //创建一个长宽高为100的长方体对象

const material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  transparent: true, //开启透明
  opacity: 0.1, //设置透明度
}); //创建一个黑色网格基础材质对象 基础网格材质不受光照影响

const lambertMaterial = new THREE.MeshLambertMaterial(); //Lambert材质 受光照影像

const mesh = new THREE.Mesh(cuboid, lambertMaterial); //具象的三维实体对象 具有几何体和材质参数

mesh.position.set(0, 0, 0); //可为实体设置位置坐标 x,y,z

scence.add(mesh); //通过add将实体添加到场景中

/* 2.建立摄影机 <正投影和透视投影> NOTE:*/
const width = 800; //定义画布渲染大小 px
const height = 800;

// PerspectiveCamera( fov, aspect, near, far )
// fov:视椎体与竖直方向角度 aspect视椎体水平和垂直的宽高比 near视椎体近截面相对相机的距离 far远截面相对相机的距离
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000); //创建透视摄影机

camera.position.set(200, 200, 200); //设置摄影机位置

// camera.lookAt(0, 0, 0); //设置摄影机观察目标位置
camera.lookAt(mesh.position); //摄影机观察位置指向实体位置

/* 3.渲染器 NOTE:*/
const renderer = new THREE.WebGL1Renderer(); //创建WebGL渲染器

const renderWidth = 800; //定义渲染画布宽高
const renderHeight = 500;

renderer.setSize(renderWidth, renderHeight); //设置渲染画布大小

renderer.render(scence, camera); //渲染相机视角场景

/* 渲染图片可显示到页面 */
// document.body.appendChild(renderer.domElement); //WebGLRenderer的domElement属性本质上就是一个HTML元素：Canvas画布。
document.getElementById("app").appendChild(renderer.domElement);

// 辅助观察坐标系
const axesHelper = new THREE.AxesHelper(150);
scence.add(axesHelper);

// 相机控件 通过鼠标控制摄像机
const cameraControl = new OrbitControls(camera, renderer.domElement);
/* 若控件改变相机位置参数，则重新渲染 */
cameraControl.addEventListener("change", () => {
  renderer.render(scence, camera);
  console.log("camera.position", camera.position);
});

/* 创建光源 */
const pointLight = new THREE.PointLight(0xffffff, 1.0); //创建点光源
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); //创建环境光 无辅助光源
const directionLight = new THREE.DirectionalLight(0xffffff, 1); //创建平行光

pointLight.position.set(-400, -200, -300);
scence.add(directionLight); //将光源添加到场景中

// 辅助光源 可视化真实光源观察
const pointLightHelper = new THREE.DirectionalLightHelper(pointLight, 10);
screen.add(pointLightHelper);
</script>

<template>
  <div></div>
</template>
<style lang="scss" scoped></style>
