<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-page>

      <div class="container">

        <div class="row q-mb-none items-center">
          <div class="col">
            <h5 class="q-ml-md">Thoughts...</h5>
          </div>
          <div class="col">
            <q-btn to="/ideas/add" color="primary" class="float-right" icon="share" label="Share yours" />
          </div>
        </div>

        <div class="q-mt-none">
          <q-card v-for="idea in ideas" :key="idea.id" class="this-card rounded-card" bordered flat>

            <!-- AVATAR HEADER -->
            <q-card-section>
              <q-item>
                <q-item-section avatar thumbnail>
                  <!-- <q-avatar size="xl"> -->
                    <div class="outer-circle">
                      <div class="inner-circle">
                        <img class="inner-image" :src="idea.avatar" :alt="idea.author" />
                      </div>
                    </div>
                  <!-- </q-avatar> -->
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-subtitle2">{{ idea.title }}</q-item-label>
                  <q-item-label caption>
                    {{idea.author}}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>

            <q-separator />

            <q-card-section class="text-body1 q-pt-sm">
              <p v-html="idea.content"></p>
            </q-card-section>

            <q-video v-if="idea.thumbnailType === 'video'" :src="idea.thumbnailLink" :ratio="16/9" fetchpriority="high" />
            <q-img v-if="idea.thumbnailType === 'image'" :src="idea.thumbnailLink" />

            <q-separator />

            <q-card-actions align="around">
                <q-btn @click="like(idea.id)" flat round icon="favorite" :color="idea.liked ? 'pink-6' : 'grey'">
                  <q-tooltip>Like</q-tooltip>
                </q-btn>
                <q-btn flat round color="grey" icon="public">
                  <q-tooltip>Collaborate</q-tooltip>
                </q-btn>
                <q-btn flat round color="grey" icon="download">
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
                <q-btn flat round color="grey" icon="share">
                  <q-tooltip>Share</q-tooltip>
                </q-btn>
            </q-card-actions>
          </q-card>

        </div>
      </div>

    </q-page>
  </q-pull-to-refresh>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useIdeaStore } from 'stores/idea-store';
const ideaStore = useIdeaStore();

// const ideas = ref(ideaListObj);
const ideas = ref([]);
onMounted(() => {
  ideas.value = ideaStore.ideas;
});
// const ideas = ideaStore.ideas;

// METHODS

// REFRESH FEED
const refresh = done => {
  console.log(`Executing refresh() ...`);
  // TODO: fetch data
  done();
}

// LIKE BUTTON CLICK
const like = id => {
  console.log(`Executing like() ... | id=${id}`)
  const found = ideas.value
                      .find(idea => id === idea.id);
  found.liked = !found.liked;
}

</script>

<style scoped lang="scss">
.this-card {
  margin-bottom:5px;
}

.outer-circle {
  width: 56px;
  height: 56px;
  border: 4px solid #1875D1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.inner-circle {
  width:42px;
  height:42px;
  border-radius: 50%;
  overflow: hidden;
}
img.inner-image {
  width: 100%;
  height: auto;
}
</style>
