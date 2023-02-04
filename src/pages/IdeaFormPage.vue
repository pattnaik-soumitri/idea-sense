<template>
  <q-page>
    <div class="container">
      <div class="row items-center">
        <div class="q-ml-md col">
          <h5>Share one of your own</h5>
        </div>
      </div>

      <div class="q-mt-none">
        <q-form greedy>
          <q-card class="my-card" bordered flat>
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

// REFS
const newIdea = ref({})

const counterLabelFn = ({ totalSize }) => {
        return `${totalSize}`
}
</script>

<style scoped>
.my-card {
  margin-bottom:5px;
  border-radius: 14px;
}
</style>
