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
      <router-link to="/events">Events</router-link>
      <router-link to="/meetups">Meetups</router-link>

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
        margin-right: 20px;
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

table.data-table {
  border-collapse: collapse;
  width: 100%;

  thead, tbody {
    td, th {
      border-bottom: 1px solid #323232;
      padding: 15px
    }

    tr:nth-child(even) {
      background-color: #1b1b1b;
    }
  }

  tbody tr {
    &:hover {
      background-color: #323232;
    }

    cursor: pointer;
  }
}

.action-tools {
  display: flex;
  width: 100%;
  gap: 1rem; /* Optional: adds space between the halves */

  .tools-left, .tools-right {
    display: flex;
    align-items: center;
    flex: 1 1 0;

    padding: 10px;
  }

  .tools-left {
    justify-content: flex-start;
  }

  .tools-right {
    align-items: center;
    justify-content: flex-end; /* Buttons aligned right */
    gap: 0.5rem; /* Space between buttons if more than one */
  }
}
</style>
