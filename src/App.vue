<!--
 * @Author: 伍习文
 * @Date: 2021-01-23 19:43:48
 * @Description: 
-->
<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>
  </div>
</template>
