<template>
<div>
          <v-row
          justify="space-between"
          class="ma-auto grey lighten-5"
        >
          <v-card
            v-for="(item) in main_files"
            :key="item.key"
            v-class="{active: item.isActive}"
            class="pa-3 flex-column main-doc-item"  
            justify="space-between"
            width="16.5%"
          >
            <span class="logoMainDoc">{{item.label}}</span>
            <v-file-input v-if="item.isAppload===false"
                v-model="item.file"
                :class="{'d-none':page=='true'}" 
                :v-name="item.key"
                @focus="item.isAppload=false"
                @change="handleFileUpload(item.key)"
                label="Загрузить">
            </v-file-input>
            <v-file-input v-else
                v-model="item.file"
                :class="{'d-none':page=='true'}" 
                :v-name="item.key"
                @focus="item.isAppload=false"
                @change="handleFileUpload(item.key)"
                label="Загрузить другой">
            </v-file-input>
            <v-row :class="{'d-none':page=='false'}" class="mr-2 align-center" justify="space-between" >
                <v-btn class="ma-2" color="#232020" style="color:white;" @click="downloadFile(item.key)">Скачать</v-btn><v-btn icon color="#232020" @click="sheet = !sheet">
                <v-icon>mdi-menu-down</v-icon></v-btn>
            </v-row>
          </v-card>
        </v-row>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >close</v-btn>
        <div class="py-3">This is a bottom sheet using the controlled by v-model instead of activator</div>
      </v-sheet>
    </v-bottom-sheet>
    </div>
</template>
<script>
import axiosFiles from "@/api/axios-files"
import axiosAuth from "@/api/axios-auth"

export default {
    name: "mainDocs",
    props: ['page'],
    data() {
        return {
            sheet: false,
            isActive:false,
            main_files: {
                passport_pute: {
                    file: null,
                    label:"Паспорт ПУТЭ",
                    key:"passport_pute",
                    isAppload: false
                },
                project_uute: {
                    file: null,
                    label:"Проект УУТЭ",
                    key:"project_uute",
                    isAppload: false
                },
                tech_conditions: {
                    file: null,
                    label:"Тех. условия на присоединение",
                    key:"tech_conditions",
                    isAppload: false
                },
                tech_passport: {
                    file: null,
                    label:"Технический паспорт",
                    key:"tech_passport",
                    isAppload: false
                },
                cadastr_passport: {
                    file: null,
                    label:"Кадастровый паспорт",
                    key:"cadastr_passport",
                    isAppload: false
                },
                recvisits: {
                    file: null,
                    label:"Реквизиты",
                    key:"recvisits",
                    isAppload: false
                },
            },
        }
    },
    watch: {
        '$route.params': function() {
            location.reload();
            this.getUploadedMainFiles()
        }
    },
    methods: {
        handleFileUpload(){
            let formData = new FormData();

            for (var key in this.main_files){
                if (this.main_files[key].isAppload == false){
                    if (this.main_files[key].file){
                        formData.append('object_file', this.main_files[key].file, this.main_files[key].file.name)
                        formData.append('object_id', this.$route.params.item)
                        formData.append('object_type', key)
                    }
                }
            }
            axiosFiles.post('/upload-main-file', formData).then(() => {
                this.getUploadedMainFiles()
            })
        },
        getUploadedMainFiles(){
            axiosAuth.post('/get-main-files', { object_id: this.$route.params.item} ).then(response => {
                console.log(response.data.uploaded_files)
                for (let key in response.data.uploaded_files){
                    this.main_files[key].isAppload = true
                }
            }).catch(error => {
                console.log(error)
            })
        },
        downloadFile(object_key){
            console.log(this.$route.params.item)
            console.log(object_key)
            axiosAuth.post('/download-file', { object_id: this.$route.params.item, object_key: object_key}, {responseType: "blob"} ).then(response => {
                console.log(response)
                const url = window.URL.createObjectURL(response.data);
                console.log(url)
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', object_key + response.data.type.split('/')[1]);
                document.body.appendChild(link);
                link.click();
            }).catch(error => {
                console.log(error)
            })
        }
    },
    created(){
        this.getUploadedMainFiles()
    }
};
</script>
<style>
.logoMainDoc {
    height: 50px;
    display: block;
    font-size: 14px;
}
.main-doc-item .v-input__slot:before{
    content:unset!important;
}
.main-doc-item .v-text-field .v-label--active{
    transform: unset!important;
     color: white!important;
}
.main-doc-item .v-input__prepend-outer, .main-doc-item .v-text-field__details{
    display:none!important;
}
.main-doc-item .v-input__slot:after{
    content: unset!important;
}
.main-doc-item .v-file-input__text {
    background: #232020!important;
    border-radius: 5px;
    cursor: pointer;

}
.main-doc-item .v-label{
    color: white!important;
    font-size: 14px;
    padding: 0px 15px;
}
.main-doc-item .v-input {
    width: 80%;
}
.v-dialog__container {
    display: block!important;
}
</style>