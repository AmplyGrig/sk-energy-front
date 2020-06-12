<template>
   <ul class="pagination-list">
    <li :class="['pagination-item', {small: el.is.small}]">
        <button type="button"
            :disabled="currentPage === 1"
            @click="onClickPage(1)"
        >
            Начало
        </button>
    </li>
    <li class="pagination-item">
      <button
        type="button"
        :disabled="currentPage === 1"
        @click="onClickPage(currentPage - 1)"
      >
        Назад
      </button>
    </li>
    <li class="pagination-item" v-for="page in pages" :key="page.number">
      <button
        type="button"
        :disabled="page.isDisabled"
        @click="onClickPage(page.number)"
      >
        {{ page.number }}
      </button>
    </li>
    <li class="pagination-item">
      <button
        type="button"
        :disabled="currentPage === totalPages"
        @click="onClickPage(currentPage + 1)"
      >
        Вперед
      </button>
    </li>
    <li :class="['pagination-item', {small: el.is.small}]">
        <button type="button"
            :disabled="currentPage === totalPages"
            @click="onClickPage(totalPages)"
        >
            Конец
        </button>
    </li>
  </ul>
</template>

<script>
import { ResponsiveMixin } from "vue-responsive-components"

export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: false,
      default: 1
    },
    perPage: {
      type: Number,
      required: false,
      default: 10
    },
    maxVisibleNumber: {
      type: Number,
      required: false,
      default: 4
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
    startPage() {
      if (this.currentPage === 1) {
        return this.currentPage;
      } else if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleNumber;
      } else if (this.currentPage + this.maxVisibleNumber > this.totalPages) {
        let newCurrPage = this.currentPage;

        while (newCurrPage + this.maxVisibleNumber > this.totalPages) {
          newCurrPage--;
        }

        return newCurrPage;
      } else {
        return this.currentPage - 1;
      }
    },
    pages() {
      let range = [];

      for (
        let index = this.startPage;
        index <=
        Math.min(this.startPage + this.maxVisibleNumber, this.totalPages);
        index++
      ) {
        range.push({
          number: index,
          isDisabled: index === this.currentPage
        });
      }
      return range;
    }
  },
  methods: {
    getRangeForPage(number) {
      return [number * this.perPage - this.perPage, number * this.perPage];
    },
    onClickPage(number) {
      let range = this.getRangeForPage(number);
      this.$emit("pageschanges", number, range[0], range[1]);
    }
  },
  mixins: [ResponsiveMixin],
  breakpoints: {
    small: el => el.width <= 500,
    tablet: el => (el.width <= 1200)&&(el.width > 500)
  } 
}
</script>

<style>
ul.pagination-list {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-bottom: 65px;
  padding: 0;
}

.pagination-item {
  display: inline-block;
}

li.pagination-item button {
  cursor: pointer;
  border: none;
  margin: 2px;
  transition: 0.2s;
  outline: none;
  min-width: 35px;
  padding: 10px;
}
li.pagination-item button[disabled] {
  background: #f4db33;
  color: black;
}
li.pagination-item button:hover {
  background: #f4db33;
}

.pagination-item.small, .pagination-item.tablet {
    display: none;
}
</style>