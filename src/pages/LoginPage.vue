<template>
  <div class="container">

    <h4 class="q-mb-lg q-ml-md">Login</h4>

    <q-card bordered flat class="q-mt-none">
      <q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          autocomplete="off"
        >
          <q-input
            filled
            type="email"
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            autocomplete="off"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            autocomplete="off"
          />

          <q-toggle v-model="keepLoggedIn" label="Keep me logged in" />

          <div class="row justify-center">
            <q-btn label="Login" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>

    </q-card>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

import { useSessionStore } from 'src/stores/session-store';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const sessionStore = useSessionStore();

// REFS
const email = ref('');
const password = ref('');
const keepLoggedIn = ref(false);

// METHODS
const onSubmit = function() {
  console.log(`Executing onSubmit() ...`);

  if(email.value === 'biki636@gmail.com' && password.value === 'password') {
    sendNotification(true);
    sessionStore.login();

    // If there is a redirect, then redirect to that | else redirect to home
    const redirect = route.query.redirect;
    if(redirect) {
      router.push(redirect);
    } else {
      router.push('/');
    }

  } else {
    sendNotification(false);
  }
}

const sendNotification = (success) => {

  if(success) {
    $q.notify({
      message: 'You are successfully logged in.',
      position: 'top',
      color: 'green-5',
      avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    });
  } else {
    $q.notify({
      message: 'Invalid credentials',
      position: 'top',
      color: 'negative',
      avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
    });
  }

}

</script>
