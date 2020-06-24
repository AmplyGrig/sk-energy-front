<template>
 <v-expansion-panels>
    <v-expansion-panel
      v-for="item in yearItems"
      :key="item.year"
      class="month-input year-input"
      disabled
      flat
    >
      <v-expansion-panel-header >{{item.year}}
        <v-row class="mx-5" justify="end">
          <template v-if="item.isCommented && page=='false'"> 
          <v-icon>mdi-close</v-icon>  
          </template> 
          <v-file-input
            v-model="item.file"
            v-if="item.isCommented || !item.isAppload && !item.isUploading"
            :class="{'d-none':page=='true'}" 
            multiple 
            label="File input"
            @change="handleFileUpload(item.year)"
          >
          </v-file-input>
          <template v-if="page === 'false'">
            <template v-if="item.isUploading"> 
            <v-icon class="mdi-spin">mdi-loading</v-icon>  
            </template>
            <template v-else-if="item.isApprove"> 
            <v-icon>mdi-check</v-icon>  
            </template> 
            <template v-else-if="!item.isCommented && !item.isApprove && item.isAppload"> 
            <v-icon>mdi-history</v-icon>  
            </template>
          </template>
          <v-row 
            v-if="item.isAppload"
            :class="{'d-none':page=='false'}" 
            class="mx-1 align-center" 
            justify="end"
          >
            <v-btn icon color="#232020" @click="downloadFile(item.year)"><v-icon>mdi-download</v-icon></v-btn>
            <v-btn 
              icon
              color="#232020" 
              @click="aproveOrDecline(item)"
              v-if="!item.isCommented && !item.isApprove"
            >
                <v-icon>mdi-menu-down</v-icon>
            </v-btn>
            <template v-else-if="item.isCommented">
              <v-icon>mdi-close</v-icon>  
            </template>
            <template v-else-if="item.isApprove">
              <v-icon>mdi-check</v-icon>  
            </template>
          </v-row>
        </v-row>
      </v-expansion-panel-header>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import axiosFiles from "@/api/axios-files"
import axiosAuth from "@/api/axios-auth"

export default {
  name: "simpleList",
  props: ['page', 'listKey'],
  data() {
    return {
      count: 0,
      currDate: new Date(),
      fileItems: {},
      file: null,
      startYear: 2017,
      yearItems: []
    }
  },
  methods: {
    handleFileUpload(year){
      this.yearItems.forEach(item => {
        if (item.year == year){
          item.isUploading = true
        }
      })

      var yearFile = this.yearItems.filter(d => d.year === year)[0].file[0]

      let formData = new FormData();

      formData.append('file', yearFile, yearFile.name)
      formData.append('object_id', this.$route.params.item)
      formData.append('file_type', this.listKey)
      formData.append('file_year', year)
      formData.append('file_month', null)

      axiosFiles.post('/upload-file', formData).then(() => {
        this.$alert('Файл загружен')
        this.yearItems.forEach(item => {
          if (item.year == year){
            item.isAppload = true
            item.isUploading = false
            item.isCommented = false
          }
        })
      }).catch(error => {
          console.log(error)
          this.$alert('Не удалось загрузить файл')
      })
    },
    getUploadedFiles(){
        axiosAuth.post('/get-files', { object_id: this.$route.params.item, file_type: this.listKey} )
        .then(response => {
            response.data.forEach(item => {
              this.yearItems.forEach(yearItem => {
                if (yearItem.year == item.year) {
                    yearItem.isAppload = true
                    if (item.comment.length != 0) yearItem.isCommented = true
                    if (item.is_approve) yearItem.isApprove = true
                }
              })
            console.log(this.yearItems)
            });
        }).catch(error => {
            console.log(error)
            this.$alert('Не удалось загрузить статус основных файлов')
        })
    },
    genItemsYear(){
      for (let item in [...Array(this.currDate.getFullYear() - this.startYear).values()]){
        let currYear = this.startYear + parseInt(item)+1
        let yearObj = {
            file: null,
            year: currYear,
            isAppload: false,
            isApprove: false,
            isCommented: false,
            isUploading: false,
        }
        this.yearItems.push(yearObj)
      }
    },
    downloadFile(year){
      console.log(year)
      console.log(this.$route.params.item)
      console.log(this.listKey)

      axiosAuth.post('/download-file', 
        { object_id: this.$route.params.item, file_year: year, file_key: this.listKey}, 
        {responseType: "blob"} 
      ).then(response => {
          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.listKey + '-' + year + response.data.type.split('/')[1]);
          document.body.appendChild(link);
          link.click();
      }).catch(error => {
          console.log(error.response)
          this.$alert('Не удалось скачать файл')
      })
    },
    aproveOrDecline(item){
      console.log(item)
      this.$fire({
          title: '<strong>'+item.year+'</strong>',
          input: 'select',
          inputOptions: {
              approved: 'Подтвержден',
              fileError: 'Ошибка'
          },
          preConfirm: async(r) => {
              if (r == "fileError") {
                  const { value: comment } =  await this.$fire({
                      title: `Введите комментарий к отклоненному файлу`,
                      input: 'textarea',
                      confirmButtonText:'Отправить',
                  })
                  
                  axiosAuth.post('/add-comment-to-file', 
                    { object_id: this.$route.params.item, file_key: this.listKey, file_year: item.year, comment: comment }
                  ).then((response => {
                      console.log(response)
                      this.yearItems.forEach(curr => {
                        if (curr.year == item.year){
                          curr.isCommented = true
                        }
                      })
                  }))
                  .catch((error) => {
                      console.log(error)
                  })
              }
              else {
                  axiosAuth.post('/approve-file', 
                    { object_id: this.$route.params.item, file_key: this.listKey, file_year: item.year, }
                  ).then((response => {
                      console.log(response)
                      this.yearItems.forEach(curr => {
                        if (curr.year == item.year){
                          curr.isApprove = true
                        }
                      })
                  }))
                  .catch((error) => {
                      console.log(error)
                  })
              }
          },
          inputPlaceholder: 'Выберите действие над файлом',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText:'Продолжить',
          confirmButtonAriaLabel: '',
      });
    }
  },
  created(){
    this.genItemsYear()
    this.getUploadedFiles()
  }
};
</script>
<style>
.year-input button{
    color: black!important;
}
.v-input__icon{
    pointer-events: all!important;
}
.v-expansion-panel-content__wrap{
  padding: 0 !important;
}
</style>