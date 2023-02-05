<template>
  <q-page>
    <div class="container">
      <div class="row items-center">
        <div class="q-ml-md col">
          <h5>Share one of your own</h5>
        </div>
      </div>

      <div class="q-mt-none">
        <q-form @submit.prevent="postIdeaFn">
          <q-card class="this-card rounded-card" bordered flat>
            <q-card-section>
              <q-input
                filled
                type="text"
                v-model="newIdea.title"
                label="Title"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                autocomplete="off"
              />

              <q-input
                filled
                type="textarea"
                multi
                v-model="newIdea.description"
                label="Description"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                autocomplete="off"
              />

              <div class="row">
                <q-file
                  v-model="newIdea.thumbnailFile"
                  label="Pick a thumbnail file"
                  accept=".mp4, .jpeg, .png, .gif, .ppt, .pptx, .doc, .docx"
                  :rules="[ val => val ? val: null || 'Please select a thumbnail file']"
                  filled
                  counter
                  :counter-label="counterLabelFn"
                  class="full-width"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>

              <div class="row justify-end q-mt-md">
                  <q-btn
                    type="submit"
                    label="Submit"
                    color="primary"
                    class="q-mr-sm"
                  />
                  <q-btn
                    to="/"
                    label="Cancel"
                    color="primary"
                    class="q-ml-sm"
                    flat
                  />
              </div>

            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useIdeaStore } from 'stores/idea-store';
import { useSessionStore } from 'stores/session-store';

const router = useRouter();
const $q = useQuasar();

// STORES
const ideaStore = useIdeaStore();
const sessionStore = useSessionStore();

// REFS
const newIdea = ref({});

// FUNCTIONS
const counterLabelFn = ({ totalSize }) => {
        return `${totalSize}`
}


const postIdeaFn = () => {
  const nextId = Math.max(...ideaStore.ideas.map(idea => idea.id));
  const newIdeaDto =
  {
        id: nextId,
        title: newIdea.value.title,
        author: sessionStore.fullName,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        createDate: new Date(),
        content: newIdea.value.description,
        link: '',
        linkType: '',
        likes: [],
        likeCount: 0,
        liked: false
  }

  ideaStore.addIdea(newIdeaDto);
  $q.notify({
    message: 'Idea created successfully.',
      position: 'top',
      avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      actions: [
        { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
      ]
  });
  router.push('/');
  newIdea.value = {};
}

</script>

<style scoped>
.this-card {
  margin-bottom:5px;
}
</style>
