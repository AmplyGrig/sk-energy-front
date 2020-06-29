<template>
  <div>
    <Header>
      <template v-slot:empty-block>
        <h3 class="news-title">Новости энергосбережения</h3>
      </template>
    </Header>
    <section
      :class="['content-block-1', { small: el.is.small, tablet: el.is.tablet }]"
    >
      <div class="container">
        <h2 class="blog-crumb">
          Home <img src="@/assets/img/chevron-small-right.png" alt="" /> Blog
        </h2>
        <div class="three-dots">
          <img src="@/assets/img/dot.png" />
          <img src="@/assets/img/dot.png" />
          <img src="@/assets/img/dot.png" />
        </div>
        <div class="news-list">
          <div
            v-for="(post, index) in displayedPosts"
            :key="index"
            class="news-item"
          >
            <router-link :to="'/blog/' + post.id">
              <img
                v-if="post.featured_image"
                :src="post.featured_image"
                alt=""
              />
              <img v-else src="http://via.placeholder.com/360x230" alt="" />
              <div class="news-item-text">
                <p class="news-item-text-title">
                  {{ post.title }}
                </p>
                <span class="news-item-text-preview">
                  {{ post.body }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
        <Pagination
          :total="posts.length"
          :perPage="perPaginationPage"
          :currentPage="startPaginationPage"
          @pageschanges="changeDisplayedList"
        ></Pagination>
      </div>
    </section>
    <section
      :class="['content-block-2', { small: el.is.small, tablet: el.is.tablet }]"
    >
      <div class="container">
        <h2 class="block-title-inverse">Полезная информация</h2>
        <h3 class="block-h3-subtitle">
          для предпринимателей и руководителей организаций по энергосбережению
        </h3>
      </div>
    </section>
    <section
      :class="['content-block-1', { small: el.is.small, tablet: el.is.tablet }]"
    >
      <div class="container">
        <div class="block-1-content">
          <p class="content-text">
            Sagittis ipsum rutrum tellus, in enim integer blandit mi. Volutpat
          </p>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import axios from "axios";
import { ResponsiveMixin } from "vue-responsive-components";
export default {
  name: "blogPost",
  components: {
    Header,
    Pagination,
    Footer
  },
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 750,
    tablet: el => el.width <= 1350 && el.width > 750
  },
  data(){
    return {
      posts: [],
      displayedPosts: [],
      startPaginationPage: 1,
      perPaginationPage: 3,
      errors: []
    }
  },
  methods: {
    getPosts() {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(response => {
          this.posts = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    changeDisplayedList(number, from, to) {
      this.startPaginationPage = number;
      this.displayedPosts = this.posts.slice(from, to);
    },
    
  },
  created() {
    this.getPosts()
  },
  watch: {
    posts() {
      this.changeDisplayedList(
        this.startPaginationPage,
        0,
        this.perPaginationPage
      );
    }
  }
};
</script>

<style>
.blog-crumb {
  text-align: center;
  color: #1d1d1b;
  font-family: "Exo 2";
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
}
.blog-crumb img {
  margin: 0px 6px;
}
.content-block-2 .block-h3-subtitle {
  color: white;
}
.news-title {
  color: #ffffff;
  font-family: "Open Sans";
  font-size: 48px;
  font-weight: 700;
  line-height: 44.03px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 100px;
}
p.news-item-text-title {
  color: #1d1d1b;
  font-family: "Exo 2";
  font-size: 21px;
  font-weight: 400;
  line-height: 30px;
}
span.news-item-text-preview {
  display: block;
  color: #626769;
  font-family: "Exo 2";
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  border-top: 1px solid #626769;
  padding-top: 20px;
}
.news-list {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  margin-top: 24px;
}
.news-item-text {
  margin: 0px 30px 0px 20px;
}
.news-item a {
  display: flex;
  padding: 15px;
  margin: 15px;
  border: 1px solid #626769;
  background-color: rgba(248, 249, 250, 0.4);
  max-width: 870px;
  min-height: 260px;
}
</style>
