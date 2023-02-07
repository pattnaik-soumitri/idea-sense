<template>
  <q-page>
    <div class="container">

      <!-- HEADER -->
      <div class="row items-center">
        <div class="col q-ml-md ">
          <h5 class="q-color-primary">Share one of your own</h5>
        </div>
      </div>

      <div class="q-mt-none">
        <q-form @submit.prevent="submitIdeaFormFn">
          <q-card class="this-card rounded-card" bordered flat>
            <q-card-section>

              <!-- TITLE -->
              <q-input
                filled
                type="text"
                v-model="newIdea.title"
                label="Title"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                autocomplete="off"
              />

              <!-- DESCRIPTION -->
              <q-editor
                v-model="newIdea.description"
                required
                placeholder="Description"
                min-height="20rem"
                class="q-mb-md"
                content-class="bg-grey-2"
                :toolbar="[
                            [
                              {
                                icon: $q.iconSet.editor.formatting,
                                fixedIcon: true,
                                fixedLabel:true,
                                list: 'no-icons',
                                options: [
                                  'h4',
                                  'h5',
                                  'h6',
                                  'p',
                                  'code'
                                ]
                              },
                            ],
                            ['bold', 'italic', 'underline'],
                            ['unordered', 'link', 'quote'],
                            ['removeFormat']
                          ]"

              />

              <!-- THUMBNAIL -->
              <div class="row q-mb-md">
                <q-file
                  v-model="newIdea.thumbnailFile"
                  label="Pick a thumbnail file"
                  accept=".mp4, .jpeg, .png, .gif, .ppt, .pptx, .doc, .docx"
                  hint="Add a thumbnail to appear along with idea title and description"
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

              <!-- TAG -->
              <q-select
                v-model="newIdea.tags"
                multiple
                max-values="5"
                new-value-mode="add-unique"
                filled
                hide-dropdown-icon
                use-input
                use-chips
                input-debounce="0"
                label="Tags"
                :options="options"
                @filter="filterFn"
                hint="Add up to 5 tags to describe what your idea is about"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <!-- PRIVATE TOGGLE -->
              <q-toggle
                label="Private"
                v-model="newIdea.isPrivate"
                class="q-mt-md q-mb-md"
              />

              <!-- {{ newIdea }} -->

              <!-- INFO PANEL -->
              <q-card
              class="info"
              flat
              bordered
              >
              <q-card-section style="background-color: #e3f2fd;">
                <div class="row justify-content">
                  <div class="col-1">
                    <q-icon
                      name="info"
                      size="sm"
                      color="blue-8"
                    />
                  </div>
                  <div class="col-11">
                    <span class="text-body2">
                      All public posts go thorough moderator approval process before appearing publicly.
                    </span>
                  </div>
                </div>
              </q-card-section>
              </q-card>

              <!-- ACTION BUTTONS -->
              <div class="row justify-end q-mt-xl">
                  <q-btn
                    type="submit"
                    label="Publish"
                    color="primary"
                    class="q-mr-md"
                  />

                  <q-btn
                    type="submit"
                    label="Save as draft"
                    color="primary"
                    class="q-mr-md"
                    outline
                  />

                  <q-btn
                    to="/"
                    label="Discard"
                    color="primary"
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
import { ref, onDeactivated } from 'vue';
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

// 1. new idea ref
const newIdeaBlankObj = {
  id: null,
  title: '',
  description: '',
  tags: [],
  isPrivate: false,
}
const newIdea = ref(newIdeaBlankObj);

// 2. Tag options ref
const stringOptions = [
  'Information Technology', 'Machine Learning', 'Computer Vision', 'NLP', 'Cloud'
]
const options = ref(stringOptions);


// HOOKS

// This is tp clear the form after Cancel button is clicked.
onDeactivated(() => {
  // Clear/reset the state
  newIdea.value = {...newIdeaBlankObj};
});

// FUNCTIONS
const counterLabelFn = ({ totalSize }) => {
        return `${totalSize}`
}

const filterFn = (val, update, abort) => {
  // call abort() at any time if you can't retrieve data somehow

  setTimeout(() => {
    update(() => {
      if (val === '') {
        options.value = stringOptions
      }
      else {
        const needle = val.toLowerCase()
        options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      }
    })
  }, 1500)
}


const submitIdeaFormFn = (e) => {
  console.log(`Executing submitIdeaFormFn()... | Submitter: ${e.submitter.innerText}`);
  const saveAsDraft = e.submitter.innerText === 'SAVE AS DRAFT';
  const nextId = Math.max(...ideaStore.ideas.map(idea => idea.id));
  const newIdeaDto =
  {
        id: nextId,
        title: newIdea.value.title,
        content: newIdea.value.description,
        thumbnailType: '',
        thumbnailLink: '',
        tags: newIdea.value.tags,
        isPrivate: newIdea.value.isPrivate,

        isDraft: saveAsDraft,
        isApproved: false,

        likes: [],
        likeCount: 0,
        liked: false,

        author: sessionStore.fullName,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,

        createDate: new Date(),
        createdBy: sessionStore.fullName,

        lastUpdatedBy: sessionStore.fullName,
        lastUpdated: new Date(),
  }
  console.log("newIdeaDto:", newIdeaDto);

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
