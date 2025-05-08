<script setup>
import {computed} from 'vue'
import {RouterView, RouterLink} from 'vue-router';
import {useKeycloak} from '@josempgon/vue-keycloak'

import ogrodjeLogoIcon from "../assets/ogrodje-logo-base.png";

const ogrodjeLogoSrc = `url(${ogrodjeLogoIcon.src})`;

const {hasRoles, username, userId, isAuthenticated, keycloak, roles, resourceRoles} = useKeycloak()
const hasAccess = computed(() => hasRoles(['RoleName']))

const logout = (e) => {
  if (e.preventDefault) e.preventDefault()
  keycloak.value.logout()
}

</script>
<template>
  <div class="admin-wrap">
    <div class="header">
      <router-link to="/" class="logo" title="Admin Dashboard">Admin Dashboard</router-link>
      <router-link to="/meetups">Meetups</router-link>
      <router-link to="/events">Events</router-link>

      <div class="tools">
        <div class="username">{{ username }} <!-- w/ {{ roles }} & {{ resourceRoles }} --></div>
        <a @click="logout($event)">Logout</a>
      </div>
    </div>

    <div class="admin-content-wrap">
      <router-view/>
    </div>
  </div>
</template>
<style lang="scss">
@use "../global";
@use "../_variables";

$cell-height: 60px;

body {
  padding: 0;
  margin: 0;
  font-size: 11pt;
  line-height: 1.5;
}

.admin-wrap {

  & .header {
    background-color: #393939;
    color: white;
    padding-left: 20px;
    position: relative;

    .tools {
      position: absolute;
      right: 0;
      display: inline-block;
      height: $cell-height;
      margin-right: 20px;

      .username {
        display: inline-block;
        font-weight: bold;
        margin-right: 20px;
      }
    }

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

      &.router-link-active {
        text-decoration: underline !important;
      }
    }
  }

  & .admin-content-wrap {
    padding: 20px
  }
}

.data-table {
  border-collapse: collapse;
  width: 100%;

  td, th {
    padding: 4px;
    text-align: left;
    border-bottom: 1px solid #2b2b2b;
  }

  thead {
    th, td {
      background-color: #191919;
    }
  }

}
</style>
