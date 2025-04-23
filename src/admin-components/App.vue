<template>
  <div class="admin-wrap">
    <div class="header">
      <router-link to="/" class="logo" title="Admin Dashboard">Admin Dashboard</router-link>
      <router-link to="/meetups">Meetups</router-link>
      <router-link to="/events">Events</router-link>
    </div>

    <div class="admin-content-wrap">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';
import ogrodjeLogoIcon from "../assets/ogrodje-logo-base.png";
const ogrodjeLogoSrc = `url(${ogrodjeLogoIcon.src})`;
</script>

<style lang="scss">
@use "../global";
@use "../_variables";

$cell-height: 60px;

body {
  padding: 0; margin: 0;
  font-size: 11pt;
  line-height: 1.5;
}


.admin-wrap {

  & .header {
    background-color: #393939;
    color: white;
    padding-left: 20px;

    a {
      color: white;
      padding-left: 10px;
      padding-right: 10px;
      height: $cell-height;
      line-height: $cell-height;
      display: inline-block;
      text-decoration: none !important;

      &.logo {
        background-image: v-bind(ogrodjeLogoSrc);
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
        text-indent: -500px;
        // overflow: hidden;
        width: 90px;
        image-rendering: crisp-edges;
      }
    }
  }

  & .admin-content-wrap {
    padding: 20px
  }
}

.data-table {
  border-collapse: collapse;

  td, th {
    padding: 2px;
    text-align: left;
  }

  thead {
    th, td {
      background-color: #191919;
    }
  }

}
</style>
