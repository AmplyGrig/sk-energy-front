<template>
  <v-expansion-panels
    accordion
    multiple
    >
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="150"
      
    >
      <v-card
        color="#232020"
        dark
      >
        <v-card-text>
          Идет загрузка файлов
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-expansion-panel
        v-for="(item, key) in yearItems"
        :key="key"
        class="month-input"
        >
        <v-expansion-panel-header >
          {{ key }} 
          <v-row class="mx-5" justify="end">
              <v-file-input 
                v-model="file"
                @change="handleFilesUpload(key)"
                :class="{'d-none':page=='true'}"
                multiple label="File input"
              ></v-file-input>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row
              class="mb-6"
              no-gutters
              >
              <template v-for="n in 12">
                <v-col :key="n">
                    <v-card
                      :elevation="3"
                      class="pa-2"
                      >
                      {{ month[n-1].label }}
                      <v-row :class="{'d-none': page=='false'}" class="mx-1 align-center" justify="space-between" >
                          <v-btn 
                            @click="downloadFile(key, month[n-1].number)"
                            icon
                            color="#232020"
                            v-if="item[month[n-1].number].isAppload"
                          >
                            <v-icon>mdi-download</v-icon>
                          </v-btn>
                          <template v-if="item[month[n-1].number].isCommented">
                            <v-icon>mdi-close</v-icon>
                          </template>
                          <template v-else-if="item[month[n-1].number].isApprove">
                            <v-icon>mdi-check</v-icon>
                          </template>
                          <v-btn 
                            icon
                            color="#232020"
                            @click="aproveOrDecline(key, month[n-1].number)" 
                            v-else-if="item[month[n-1].number].isAppload && !item[month[n-1].number].isCommented && !item[month[n-1].number].isApprove"
                          >
                            <v-icon>mdi-menu-down</v-icon>
                          </v-btn>
                      </v-row>
                      <v-row :class="{'d-none': page=='true' }" class="mx-2" :justify="item[month[n-1].number].isAppload ? 'space-between' : 'end'">
                        <template v-if="item[month[n-1].number].isUploading">
                          <v-icon class="mdi-spin">mdi-loading</v-icon>    
                        </template>
                        <template v-else-if="item[month[n-1].number].isApprove">
                          <v-icon>mdi-check</v-icon>  
                        </template>
                        <template v-else-if="item[month[n-1].number].isAppload && !item[month[n-1].number].isCommented">
                          <v-icon>mdi-history</v-icon>  
                        </template>
                        <template v-else-if="item[month[n-1].number].isAppload && item[month[n-1].number].isCommented">
                          <v-icon>mdi-close</v-icon>  
                        </template>
                        <v-file-input
                          @change="handleFileUpload(key, month[n-1].number)"
                          v-model="file"
                          v-if="!item[month[n-1].number].isApprove"
                          :v-name="month[n-1].key" 
                          label="File input"
                          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"  
                        >
                        </v-file-input>
                      </v-row>
                    </v-card>
                </v-col>
              </template>
          </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
import axiosAuth from "@/api/axios-auth"
import axiosFiles from "@/api/axios-files"

export default {
  name: "coolList",
  props: ['page', 'listKey'],
  data() {
  return {
      dialog: false,
      file: null,
      files: null,
      startDate: 2017,
      currDate: new Date(),
      month: [
          {
            key:"January",
            label:"ЯНВ",
            number: 1
          },
          {
            key:"February",
            label:"ФЕВ",
            number: 2
          },
          {
            key:"March",
            label:"МАР",
            number: 3
          },
          {
            key:"April",
            label:"АПР",
            number: 4
          },
          {
            key:"May",
            label:"МАЙ",
            number: 5
          },
          {
            key:"June",
            label:"ИЮН",
            number: 6
          },
          {
            key:"July",
            label:"ИЮЛ",
            number: 7
          },
          {
            key:"August",
            label:"АВГ",
            number: 8
          },
          {
            key:"September",
            label:"СЕН",
            number: 9
          },
          {
            key:"November",
            label:"ОКТ",
            number: 10
          },
          {
            key:"October",
            label:"НОЯ",
            number: 11
          },
          {
            key:"December",
            label:"ДЕК",
            number: 12
          },
        ],
        yearItems: {}
    }
  },
  methods: {
    getUploadedFiles(){
      axiosAuth.post('/get-files', { object_id: this.$route.params.item, file_type: this.listKey} )
      .then(response => {
        response.data.forEach(item => {
          this.$set(this.yearItems[item.year], item.month, {
                file: null,
                year: item.year,
                'isAppload': true,
                'isCommented': item.comment.length != 0 ? true : false,
                'isApprove': item.is_approve == true ? true : false,
                'isUploading': false,
          })
        });
      }).catch(error => {
          console.log(error)
          this.$alert('Не удалось загрузить статус основных файлов')
      })
    },
    handleFileUpload(year, month){
      let formData = new FormData();
      if (this.file)
      {
        this.yearItems[year][month]['isUploading'] = true
        formData.append('file', this.file, this.file.name)
        formData.append('object_id', this.$route.params.item)
        formData.append('file_type', this.listKey)
        formData.append('file_year', year)
        formData.append('file_month', month)

        axiosFiles.post('/upload-file', formData).then(() => {
          this.$alert('Файл загружен')
          this.yearItems[year][month]['isUploading'] = false
          this.$set(this.yearItems[year], month, {
                file: this.file,
                'isAppload': true,
                'isCommented': false,
                'isApprove': false,
                'isUploading': false,
          })
          }).catch(error => {
            console.log(error)
            this.yearItems[year][month]['isUploading'] = false
            this.$alert('Не удалось загрузить файл')
        })
      } else {
        this.$alert('Необходимо выбрать файл')
      }
      
    },
    handleFilesUpload(year){
      console.log(year)
      let formData = new FormData();
      this.dialog = true
      console.log(this.file)
      for( var i = 0; i < this.file.length; i++ ){
        let file = this.file[i];
        formData.append('file' + i, file, file.name);
        formData.append('object_id', this.$route.params.item)
        formData.append('file_type', this.listKey)
        formData.append('file_year', year)
      }
      axiosFiles.post('/upload-files', formData).then(() => {
            this.dialog = false
            location.reload()
          }).catch(error => {
            this.dialog = false
            console.log(error.response)
            this.$alert('Не удалось загрузить файл: '+ error.response.data.reasons[0])
        })
    },
    genItemsYear(){
      for (let item in [...Array(this.currDate.getFullYear() - this.startDate).values()]){
        var currYear = this.startDate + parseInt(item)+1
        this.$set(this.yearItems, currYear, {})
        for (let month in [...Array(12).values()])
        {
          let monthObj = {
              file: null,
              isAppload: false,
              isApprove: false,
              isCommented: false,
              isUploading: false,
          }
          this.$set(this.yearItems[currYear], parseInt(month) + 1, monthObj)
        }
      }
    },
    downloadFile(year, month){
      axiosAuth.post('/download-file', 
        { 
          object_id: this.$route.params.item,
          file_year: year,
          file_month: month,
          file_key: this.listKey
        }, 
        {responseType: "blob"} 
      ).then(response => {
          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.listKey + '-' + year + '-' + month + '.' + response.data.type.split('/')[1]);
          document.body.appendChild(link);
          link.click();
      }).catch(error => {
          console.log(error.response)
          this.$alert('Не удалось скачать файл')
      })
    },
    aproveOrDecline(year, month){
      this.$fire({
          title: '<strong>'+year+'</strong>',
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
                    { 
                      object_id: this.$route.params.item, 
                      file_key: this.listKey, 
                      file_year: year, 
                      file_month: month, 
                      comment: comment 
                    }
                  ).then((response => {
                      console.log(response)
                      this.yearItems[year][month]['isCommented'] = true
                  }))
                  .catch((error) => {
                      console.log(error)
                  })
              }
              else {
                  axiosAuth.post('/approve-file', 
                    { 
                      object_id: this.$route.params.item, 
                      file_key: this.listKey, 
                      file_month: month, 
                      file_year: year, 
                    }
                  ).then((response => {
                      console.log(response)
                      this.yearItems[year][month]['isApprove'] = true
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
  components: {
  },
  created() {
    this.genItemsYear()
    this.getUploadedFiles()
  }
};
</script>
<style>
.month-input .v-input__control{
  display:none!important;
}
.month-input .v-input {
    max-width: 30px;
}
</style>