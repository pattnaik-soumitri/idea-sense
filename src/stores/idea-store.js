import { defineStore } from 'pinia';

export const useIdeaStore = defineStore('idea', {
  state: () => ({
    ideas: [
      {
        id: 1,
        title: 'Sales intercept with computer vision',
        author: 'John Doe',
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        createDate: new Date(),
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet omnis rerum quaerat veritatis fugit explicabo pariatur enim facere quisquam doloremque?',
        thumbnailType: 'video',
        thumbnailLink: 'https://www.youtube.com/embed/1OtW7NLVjiw?rel=0',
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
        thumbnailType: 'image',
        thumbnailLink: 'https://m365contenthub.wpengine.com/en-us/wp-content/uploads/1600x600_7PresentationDesign.jpg',
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
        thumbnailType: '',
        thumbnailLink: '',
        likes: [],
        likeCount: 0,
        liked: false
      },
    ],
  }),
  actions: {
    addIdea(newIdea) {
      this.ideas.unshift(newIdea);
    }
  },
});
