<template>
  <div class="o-container ">

    <header class="ArticlesHeader">
      <h2 class="t-headline-section ">{{sectionTitle}}</h2>
      <div class="ArticlesSelector" v-if="showSelector">
        <p class="ArticlesSelectorTxt">Filtrar:</p>
        <button class="ArticlesSelectorButton" @click="toggleType('blog')" :class="{'--active': checkType('blog')}">
          <p>Blog</p><IClose />
        </button>
        <button class="ArticlesSelectorButton" @click="toggleType('portfolio')" :class="{'--active': checkType('portfolio')}">
          <p>Proyectos</p><IClose />
        </button>
      </div>
    </header>

    <section class="Articles">

      <!-- Content -->
      <article class="Article" 
        v-for="(entry, index) in getFeed()" 
        :key="entry.title" 
        :style="{'animation-delay': (index * 100) + 'ms'}"
      >
        <a target="_blank" :href="entry.link" class="ArticleContainer">
          <div class="ArticleImage" :style="`background-image: url(${entry.image})`" role="presentation"></div>
          <div class="ArticleText">
            <h3 class="ArticleTitle">{{entry.title}}</h3>
            <p class="ArticleData">
              <span class="ArticleDate">{{entry.date | dateformat}}</span>
              <span class="ArticleSpacer">|</span>
              <span class="ArticleType" :style="{backgroundColor: getTypeColor(entry.type)}">{{getTypeLiteral(entry.type)}}</span>
            </p>
          </div>
        </a>
      </article>

      <!-- Skeleton -->
      <div class="Article" v-for="(_, index) in (checkType('blog') && posts.length === 0 && showPosts ? Array.from({length: 6}).fill({}) : [])" :key="'blog' + index">
        <div class="ArticleContainer --skeleton">
          <div class="ArticleImage --loading" role="presentation"></div>
          <div class="ArticleText --loading">
            <p></p>
            <p></p>
          </div>
        </div>
      </div>

      <!-- Skeleton -->
      <div class="Article" v-for="(_, index) in (checkType('portfolio') && projects.length === 0 && showProjects ? Array.from({length: 6}).fill({}) : [])" :key="'portfolio' + index">
        <div class="ArticleContainer --skeleton">
          <div class="ArticleImage --loading" role="presentation"></div>
          <div class="ArticleText --loading">
            <p></p>
            <p></p>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
import { Parser } from 'rss-parser'

export default {
  props: ['showPosts', 'showProjects', 'showSelector', 'sectionTitle'],
  data() {
    return {
      _resizeListener: null,
      showEntries: ['blog', 'portfolio'],
      posts: [],
      projects: []
    }
  },
  mounted() {
    if (this.showProjects) {
      this.getPortfolio();
    }
    if (this.showPosts) {
      this.getBlog();
    }
  },
  methods: {
    getPortfolio: async function() {
      const behance = await this.$axios.get('/api/portfolio', {params: {'client_id': 'LU2mz0ZNPRKg6kLjC46e1Fd9aL1NA1CX'}});
      const projects = behance.data.projects.map(project => ({
        type: 'portfolio',
        title: project.name,
        date: moment(Number(project.published_on + '000')).toISOString(),
        link: project.url,
        image: project.covers['808']
      }))
      this.projects = projects
    },
    getBlog: async function() {
      const medium = await this.$axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@derlan');
      const posts = medium.data.items.map(entry => ({
        type: 'blog',
        title: entry.title,
        date: moment(entry.pubDate).toISOString(),
        link: entry.guid,
        image: entry.content.split('src=\"')[1].split('\"')[0]
      })) || []
      this.posts = posts
    },
    getFeed: function() {
      return _
        .orderBy([...this.posts, ...this.projects], ['date'], ['desc'])
        .filter(entry => this.checkType(entry.type))
    },
    checkType: function(queryType) {
      return Boolean(this.showEntries.find(type => type === queryType));
    },
    toggleType: function(queryType) {
      const hasType = this.checkType(queryType)
      if (hasType && this.showEntries.length > 1) this.showEntries = this.showEntries.filter(type => type !== queryType);
      if (!hasType) this.showEntries = [...this.showEntries, queryType];
    },
    getTypeLiteral: function(type) {
      const literals = {
        'blog': 'Blog',
        'portfolio': 'Proyecto'
      }
      return literals[type] || `[[${type}]]`
    },
    getTypeColor: function(type) {
      const colors = {
        'blog': '#13b9a0',
        'portfolio': '#c75cc7'
      }
      return colors[type] || `[[${type}]]`
    }
  },
  filters: {
    dateformat: function (value) {
      if (!value) return ''
      return moment(value).locale('es').format('LL')
    }
  }
}
</script>

<style scoped lang="scss">

  @import 'assets/configs';

  @keyframes ArticleImage_loading {
    from {
      transform: translateX(-50%) ScaleY(2)
    }
    to {
      transform: translateX(150%) ScaleY(2)
    }
  }

  @keyframes Article_fadein {
    from {
      opacity: 0;
      transform: translateY(8px)
    }
    to {
      opacity: 1;
      transform: translateY(0px)
    }
  }


  .Articles {
    transition: opacity .35s, transform .35s;
    &.--enter-active, &.--leave-active {
      transform: translateY(30px);
      opacity: 0;
    }
    @include tablet {
      display: grid;
      grid-template-columns: repeat(12, [col-start] 1fr);
      grid-column-gap: 2rem;
    }
  }

  .Article {
    margin-bottom: 3rem;
    opacity: 0;
    scale: translateY(8px);
    animation: Article_fadein .45s cubic-bezier(0.77, 0, 0.175, 1) forwards;
    @include tablet {
      margin-bottom: 4rem;
      grid-column: span 6;
    }
    @include desktop {
      grid-column: span 4;
      &:nth-child(1) {
        grid-column: span 8;
        grid-row: span 2;
      }
      &:nth-child(5), &:nth-child(9) {
        grid-column: span 8;
      }
    }
  }

  .ArticleContainer {
    display: flex;
    color: var(--t-color-tint-60);
    text-decoration: none;
    height: 100%;
    flex-direction: column;
    width: 100%;
  }

  .ArticleImage {
    width: 100%;
    min-height: 200px;
    flex: 1 1 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    &.--loading {
      overflow: hidden;
      position: relative;
      &:before {
        content: ' ';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, var(--color-skeleton) 0%, var(--color-skeleton-light) 20%, var(--color-skeleton) 40%);
        transform: translateX(-50%) ScaleY(2);
        animation: ArticleImage_loading 1s linear forwards infinite;
      }
      background-color: var(--color-skeleton);
    }
    @include tablet {
      min-height: 300px;
    }
  }

  .ArticleText {
    flex: 0 0 auto;
    margin-top: .75rem;
    &.--loading {
      min-height: 52px;
      & > * {
        background-color: var(--color-skeleton);
        height: 22px;
        margin-bottom: .45rem;
      }
      & > :nth-child(1) {
        width: 70%
      }
      & > :nth-child(2) {
        width: 55%
      }
    }
  }

  .ArticleTitle {
    color: var(--t-color-tint-60);
    text-decoration: none;
    font-weight: bolder;
    font-size: 1.25rem;
    line-height: 1.4;
    margin-bottom: .15rem;
    display: block;
  }

  .ArticleData {
    display: flex;
    align-items: center;
  }

  .ArticleDate {
    color: var(--t-color-tint-60);
  }

  .ArticleSpacer {
    font-size: 1.125rem;
    padding: 0 .5rem;
    font-weight: lighter;
    position: relative;
    bottom: 1px;
  }

  .ArticleType {
    color: var(--t-color-tint-50);
    text-transform: uppercase;
    font-size: 0.75rem;
    position: relative;
    bottom: -1px;
    padding: .3rem .5rem;
    color: white;
    border-radius: 4px;
    /* font-weight: bold */
  }

  .ArticlesAnchor {
    margin-bottom: 5rem;
    display: block;
    height: 1px;
    width: 100%;
    background: transparent;
  }

  .ArticlesHeader {
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @include tablet {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }
  }

  .ArticlesSelector {
    display: flex;
    align-items: center;
    @include mobile-only {
      margin-top: 1.5rem;
    }
  }

  .ArticlesSelectorTxt {
    color: var(--t-color-tint-60);
    margin-right: .75rem;
    position: relative;
    bottom: 1px;
    /* text-transform: uppercase;
    font-size: .875rem; */
  }

  .ArticlesSelectorButton {
    display: flex;
    color: var(--color-primary);
    background-color: var(--t-color-tint-10);
    align-items: center;
    justify-content: center;
    border-radius: 1000px;
    padding: .5rem .75rem .5rem 1.25rem;
    box-sizing: border-box;
    transition: all .3s ease-in-out;
    &:not(:last-child) {
      margin-right: 1rem;
    }
    & > svg {
      transition: transform .25s ease-in-out;
      display: block;
      position: relative;
      width: 20px;
      height: 20px;
      stroke: var(--color-primary);
      margin-left: .35rem;
      transform: rotate(45deg);
    }
    & > p {
      position: relative;
      bottom: 2px;
    }
    &.--active {
      background-color: var(--color-primary);
      color: white;
      & > svg { transform: rotate(0deg); stroke: white; }
    }
  }

</style>
