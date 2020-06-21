<template>  
        <v-container
          class="fill-height lk-body lk-admin"
          fluid
          >
          <v-card  class="mx-auto"
              width="100%"
              >
              <v-row  class="mx-10" >
                <v-text-field
                    v-model="search"
                    label="Искать"
                    prepend-inner-icon="mdi-magnify"
                    ></v-text-field>
              </v-row>
          </v-card>
          <v-spacer style="max-height: 30px; height:30px; width: 100%;"></v-spacer>
          <div class="logoUsers">
              <v-list-item-content>Пользователи</v-list-item-content>
          </div>
          <v-card  class="mx-auto"
              width="100%"
              >
              <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th v-for="(column, index) in columns" :key="index">
                        <a href="#" @click="sortBy(column)" :class="{ active: sortKey === getsrc[column] }">
                          {{ column }}
                        </a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr  v-for="(item, index) in filteredList" :key="index">
                        <td>{{ item.user_name }}</td>
                        <td>{{ item.object_name }}
                        <td><v-btn   :to="'/lkadmin/' + item.object_id"  color="#232020" dark>Смотреть</v-btn></td>
                      </tr>
                    </tbody>
                  </template>
              </v-simple-table>
          </v-card>
        </v-container>
</template>
<script>
import axiosAuth from "@/api/axios-auth"

export default {
  props: {
    source: String,
  },
  data: () => ({
    usersList: [],
    sortKey: 'user_name',
    reverse: false,
    search: '',
    columns: [ 'ФИО', 'Название объекта', '' ],
    getsrc: {'ФИО' : 'user_name', 'Название объекта' : 'object_name'}
  }),
  methods: {
    logout(){
      this.$store.dispatch('auth/logout')
    },
    getUserList(){
      axiosAuth.get("/get-users").then((response) => {
        console.log(response.data)
        this.usersList = response.data.users
      }).catch(error => {
        console.log(error)
      })
    },
    sortBy(sortKey) {
      this.reverse = (this.sortKey == this.getsrc[sortKey]) ? !this.reverse : false;
      this.sortKey = this.getsrc[sortKey];
      console.log(this.sortKey)
    }
  },
  created(){
    this.getUserList()
  },
  computed: {
    sortedUsers() {
      const k = this.sortKey
      let tmp = this.usersList
      return tmp.sort((a, b) => {
        return (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0) * [ 1, -1 ][+this.reverse];
      });
    },
    filteredList() {
      return this.sortedUsers.filter(post => {
        return post.user_name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
}
</script>
<style>
.lk-admin .v-list-item__content{
      margin-left: 50px;
}
div.logoUsers {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logoUsers .v-list-item__content {
    font-size: 25px;
}
.logoUsers .v-input {
    max-width: 200px;
        width: 200px!important;
       
}
.logoUsers  .v-input__slot{
   background: white!important;
   cursor: pointer;
}
.v-menu__content{
   max-width: 200px!important;
}
.v-list-item__title, .v-btn__content{
font-family: "Exo 2"!important;
}
table a.active {
  color: black!important;
}

</style>