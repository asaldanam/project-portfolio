<template>
  <section class="Articles o-container">
    <article class="Article" v-for="entry in feed" :key="entry.title">
      <div class="ArticleImage" :style="`background-image: url(${entry.image})`"></div>
      <!-- <img :src="entry.image" alt=""> -->
      <a :href="entry.link">{{entry.title}}</a>
      <div>{{entry.date}}</div>
      <div>{{entry.type}}</div>
    </article>
  </section>
</template>

<script>
import moment from 'moment';
import orderBy from 'lodash/orderBy';

export default {
  // Key for <NuxtChild> (transitions)
  key: to => to.fullPath,
  // Called to know which transition to apply
  transition (to, from) {
    // if (!from) { return 'slide-left' }
    // return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
    return {
      name: '-',
      mode: 'in-out'
    }
  },
  async asyncData ({ $axios }) {
    const medium = await $axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@derlan');
    const behance = await $axios.get('/api/portfolio', {params: {'client_id': 'LU2mz0ZNPRKg6kLjC46e1Fd9aL1NA1CX'}});
    const feed = {  
      portfolio: {
        projects: behance.data.projects.map(project => ({
          type: 'portfolio',
          title: project.name,
          date: moment(Number(project.published_on + '000')).toISOString(),
          link: project.url,
          image: project.covers['808']
        }))
      },
      blog: {
        entries: medium.data.items.map(entry => ({
          type: 'blog',
          title: entry.title,
          date: moment(entry.pubDate).toISOString(),
          link: entry.guid,
          image: entry.content.split('src=\"')[1].split('\"')[0]
        })) || []
      },
    } 
    return {
      feed: orderBy([...feed.portfolio.projects, ...feed.blog.entries], ['date'], ['desc'])
    }
  },
  data() {
    return {}
  },
  mounted() {
    // console.log(process.env)
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .Articles {
    display: flex;
    flex-wrap: wrap;
    transition: opacity .35s, transform .35s;
    &.--enter-active, &.--leave-active {
      transform: translateY(30px);
      opacity: 0;
    }

    /* &.--enter-active, &.--leave-active {
      transform: translateY(0%);
    }
    &.--enter, &.--leave-active {
      transform: translateY(10%);
      opacity: 0
    } */
  }

  .Article {
    width: 33.3333%;
    padding: 1rem;
    box-sizing: border-box;
  }

  .ArticleImage {
    width: 100%;
    height: 300px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
</style>
