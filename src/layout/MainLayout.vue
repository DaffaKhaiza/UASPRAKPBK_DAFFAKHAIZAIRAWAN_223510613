<template>
  <q-layout view="hHh lpR fFf bg-image">
    <q-header elevated class="bg-primary text-white custom-header" height-hint="98">
      <q-toolbar class="custom-toolbar">
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" class="menu-btn" />
        <q-toolbar-title class="header-title">
          <div class="header-content">
            <q-icon name="cloud" class="header-icon" /> DAFFA KHAIZA IRAWAN [223510613]
          </div>
        </q-toolbar-title>
        <div class="spacer" />
        <q-tabs align="center" class="animated-tabs header-tabs">
          <q-route-tab to="/" label="CUACA" />
          <q-route-tab to="/Task" label="TUGAS" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item to="/" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="cloud" />
          </q-item-section>
          <q-item-section>
            CUACA
          </q-item-section>
        </q-item>

        <q-item to="/Task" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            TUGAS
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scoped>
.bg-image {
  background-image: url('../assets/background.gif');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.custom-header {
  background-color: #2196f3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-toolbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  font-size: 32px;
}

.menu-btn {
  margin-right: auto;
}

.header-tabs {
  flex-grow: 1;
}

.spacer {
  flex-grow: 1;
}
</style>
