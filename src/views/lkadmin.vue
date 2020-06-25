<template>  
        <v-container
          class="fill-height lk-body lk-admin"
          fluid
          >
          <v-card  class="mx-auto"
              width="100%"
              >
              <v-row  class="mx-10" style="margin-top: 20px;">
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
              <v-simple-table fixed-header height="80%">
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
                        <td>{{ item.change_time }}
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
    columns: [ 'ФИО', 'Название объекта', 'Время изменения','' ],
    getsrc: {'ФИО' : 'user_name', 'Название объекта' : 'object_name', 'Время изменения': 'change_time'}
  }),
  methods: {
    logout(){
      this.$store.dispatch('auth/logout')
    },
    formatDate(date){

      var dd = date.getDate();
      if (dd < 10) dd = '0' + dd;

      var mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;

      var yy = date.getFullYear() 

      return dd + '.' + mm + '.' + yy;
    },
    getUserList(){
      axiosAuth.get("/get-users").then((response) => {
        console.log(response.data)
        response.data.users.forEach(element => {
          let date = new Date(element['change_time'])
          element['change_time'] = this.formatDate(date)
        });
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
.lk-admin table a *{
  color: white!important;
}
.lk-admin .v-btn--icon *{
  color: black!important;
}

.v-application--is-ltr .v-text-field .v-input__prepend-inner {
    margin-right: 0!important;
    padding-right: 4px;
}

</style>