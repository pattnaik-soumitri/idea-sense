<template>
  <q-layout view="hHh lpR fFf">
  <!-- <q-layout view="lHr lpR fFf"> -->

    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar inset>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <router-link to="/">OPEN THOUGHTS</router-link>
        </q-toolbar-title>
        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer class="q-mobile-only" show-if-above v-model="leftDrawerOpen" side="left" width="570" style="background-color: #f3f2ee">
      <!-- drawer content -->
      <q-card v-if="sessionStore.isLoggedIn" class="left-drawer-card float-right q-mt-xl q-mr-md" bordered flat>
        <q-card-section>
          <q-item>
          <q-list>
            <!-- HOME NAV LINK -->
            <q-item to="/" v-ripple clickable exact>
              <q-item-section avatar>
                <q-icon name="home" size="md" />
              </q-item-section>
              <q-item-section class="text-subtitle1 text-weight-bold">Home</q-item-section>
            </q-item>

            <!-- SHARE NAV LINK -->
            <q-item to="/ideas/add" v-ripple clickable exact>
              <q-item-section avatar>
                <q-icon name="share" size="md" />
              </q-item-section>
              <q-item-section class="text-subtitle1 text-weight-bold">Share your idea</q-item-section>
            </q-item>


            <!-- PROFILE NAV LINK -->
            <q-item to="profile" v-ripple clickable exact>
              <q-item-section avatar>
                <q-icon name="person" size="md" />
              </q-item-section>
              <q-item-section class="text-subtitle1 text-weight-bold">Profile</q-item-section>
            </q-item>

            <q-separator />

            <!-- LOGOUT NAV LINK -->
            <q-item @click="logout()" v-ripple clickable exact>
              <q-item-section avatar>
                <q-icon name="logout" size="md" />
              </q-item-section>
              <q-item-section class="text-subtitle1 text-weight-bold">Logout</q-item-section>
            </q-item>
          </q-list>
          </q-item>
        </q-card-section>
      </q-card>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" width="570" style="background-color: #f3f2ee">
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from 'src/stores/session-store';

const router = useRouter();
const sessionStore = useSessionStore();

// REFS
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)

// METHODS
const toggleLeftDrawer =  () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

const logout = () => {
  sessionStore.logout();
  router.push('/');
}
</script>

<style scoped>
.left-drawer-card {
  width: 350px;
  border-radius: 14px;
  margin-top: 113px;
}

</style>
