<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-page>

      <div class="container">

        <div class="row q-mb-none items-center">
          <div class="col">
            <h5 class="q-ml-md">Ideas...</h5>
          </div>
          <div class="col">
            <q-btn to="/ideas/add" color="primary" class="float-right" icon="share" label="Share your idea" />
          </div>
        </div>

        <div class="q-mt-none">
          <q-card v-for="idea in ideas" :key="idea.id" class="my-card" bordered flat>

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
              <p>{{ idea.content }}</p>
            </q-card-section>

            <q-video v-if="idea.linkType === 'video'" :src="idea.link" :ratio="16/9" fetchpriority="high" />
            <q-img v-if="idea.linkType === 'image'" :src="idea.link" />

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
import { ref } from 'vue';

const ideaListObj = [
  {
    id: 1,
    title: 'Sales intercept with computer vision',
    author: 'John Doe',
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    createDate: new Date(),
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet omnis rerum quaerat veritatis fugit explicabo pariatur enim facere quisquam doloremque?',
    link: 'https://www.youtube.com/embed/1OtW7NLVjiw?rel=0',
    linkType: 'video',
    likes: [],
    likeCount: 0,
    liked: false
  },
  {
    id: 2,
    title: 'Video Analytics solution for Quick Service resultants',
    author: 'Jane Doe',
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    createDate: new Date(),
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet omnis rerum quaerat veritatis fugit explicabo pariatur enim facere quisquam doloremque?',
    link: 'https://m365contenthub.wpengine.com/en-us/wp-content/uploads/1600x600_7PresentationDesign.jpg',
    linkType: 'image',
    likes: [],
    likeCount: 0,
    liked: false
  },
  {
    id: 3,
    title: 'Block Chain enabled inventory system',
    author: 'Jean Dupont',
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    createDate: new Date(),
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet omnis rerum quaerat veritatis fugit explicabo pariatur enim facere quisquam doloremque? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet omnis rerum quaerat veritatis fugit explicabo pariatur enim facere quisquam doloremque?',
    link: '',
    linkType: '',
    likes: [],
    likeCount: 0,
    liked: false
  },
];

const ideas = ref(ideaListObj);
// const ideas = ref([]);

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
.my-card {
  margin-bottom:5px;
  border-radius: 14px;
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
