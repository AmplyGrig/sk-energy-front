<template>
  <div>
      <Header></Header>
      <div :class="['container', 'first-block', { small: el.is.small }]">
            <h1 class='first-block-title about-title'>{{ post.title }}</h1>
      </div>
      <section :class="['content-block-1', { small: el.is.small, tablet:  el.is.tablet}]">
        <div class="container">
          <div :class="['post', {small: el.is.small, tablet:  el.is.tablet}]">
            <img src="http://via.placeholder.com/800x500" alt="">
            <p>{{ post.body }}</p>
          </div>
        </div>
      </section>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ResponsiveMixin } from "vue-responsive-components"
import axios from "axios"

export default {
    name: "blogPost",
    data() {
      return {
        post: {}
      }
    },
    methods: {
      getPost(){
          axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                this.post = response.data[0]
            })
            .catch(e => {
                this.errors.push(e)
          })
      }
    },
    created(){
      this.getPost()
    },
    components: {
        Header,
        Footer
    },
    mixins: [ResponsiveMixin],
    breakpoints: {
      small: el => el.width <= 500,
      tablet: el => (el.width <= 1200)&&(el.width > 500)
    } 
}
</script>

<style>
.post img {
    display: block;
    margin: 20px auto;
}

.post p {
    margin: 40px auto;
    max-width: 600px;
    font-family: "Exo 2";
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 28px;
}

.post.tablet img {
    width: 80%;
}
.post.small img {
    width: 80%;
}
</style>