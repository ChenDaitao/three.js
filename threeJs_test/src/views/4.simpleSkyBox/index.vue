<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const skyBoxRef = ref(null);
const scence = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true, //抗锯齿
});
const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
const controls = new OrbitControls(camera, renderer.domElement); //相机控件

const initRender = () => {
  renderer.setSize(800, 500); //渲染画布尺寸设置
};

const initCamera = () => {
  camera.position.set(292, 109, 268);
  camera.lookAt(scence.position); //相机焦点指向场景
};

const initLight = () => {
  const ambientLight = new THREE.AmbientLight(10);
  scence.add(ambientLight);
};

const AxesHelper = () => {
  const AxesHelper = new THREE.AxesHelper(250);
  scence.add(AxesHelper);
};

const autoAnimation = () => {
  controls.update(); //更新相机位置
  requestAnimationFrame(autoAnimation);
  renderer.render(scence, camera); //执行渲染
};

const initScence = () => {
  const skyImgbc = new URL("@/assets/skybox.jpeg", import.meta.url).href;
  const skyBoxTextTure = [
    skyImgbc,
    skyImgbc,
    skyImgbc,
    skyImgbc,
    skyImgbc,
    skyImgbc,
  ];
  scence.background = new THREE.CubeTextureLoader().load(skyBoxTextTure);
};

//全部执行
const initAllScence = () => {
  initRender();
  initCamera();
  initLight();
  AxesHelper();
  autoAnimation();
  initScence();
};

onMounted(() => {
  initAllScence();
  skyBoxRef.value.appendChild(renderer.domElement);
});
</script>
<template>
  <div ref="skyBoxRef"></div>
</template>
<style lang="scss" scoped></style>
