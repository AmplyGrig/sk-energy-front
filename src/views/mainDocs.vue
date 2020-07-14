<template>
    <div>
    <v-row
        justify="space-between"
        class="ma-auto grey lighten-5"
        >
        <v-card
            v-for="(item) in main_files"
            :key="item.key"
            :class="[{active: item.isActive},'pa-3', 'flex-column', 'main-doc-item']"
            justify="space-between"
            width="16.5%"
            >
            <span class="logoMainDoc">{{item.label}}</span>
            <v-row class="mx-0" v-if="item.isAppload===false && item.isApprove === false && page=='false'" justify="space-between">
            <v-file-input 
                v-model="item.file"
                :class="{'d-none':page=='true'}" 
                :v-name="item.key"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*" 
                @change="handleFileUpload(item.key)"
                label="Загрузить">
            </v-file-input>
            </v-row>
            <v-row class="mx-0" v-else-if="item.isAppload === true && item.isApprove === false && page=='false'" justify="space-between">
            <v-file-input 
                v-model="item.file"
                :class="{'d-none':page=='true'}" 
                :v-name="item.key"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*" 
                @change="handleFileUpload(item.key)"
                label="Заменить">
                
            </v-file-input>
                <template v-if="!item.isCommented && !item.isApprove && item.isAppload"> 
                <v-icon>mdi-history</v-icon>  
                </template>
                <template v-if="item.isCommented"> 
                <v-icon>mdi-close</v-icon>  
                </template> 
            </v-row>
            <v-row class="mx-1" v-else-if="role !== 'admin'" justify="space-between">
            <v-icon>mdi-check</v-icon>
            </v-row>
            <v-row :class="[{'d-none':page=='false'},'mr-2', 'align-center']" justify="space-between" >
                <v-btn 
                    class="ma-2" 
                    color="#232020"
                    style="color:white;" 
                    @click="downloadFile(item.key)"
                    :disabled="item.isAppload === false"
                >
                    Скачать
                </v-btn>
                <v-btn icon color="#232020" v-if="item.isAppload && !item.isApprove && !item.isCommented" @click="aproveOrDecline(item)">
                <v-icon>mdi-menu-down</v-icon>
                </v-btn>
                <v-btn icon color="#232020" v-else-if="item.isAppload && item.isApprove && !item.isCommented">
                <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn icon color="#232020" v-else-if="item.isAppload && !item.isApprove && item.isCommented">
                <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-row>
        </v-card>
    </v-row>
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
            role: localStorage.getItem('role'),
            sheet: false,
            isActive:false,
            main_files: {
                passport_pute: {
                    file: null,
                    label:"Паспорт ПУТЭ",
                    key:"passport_pute",
                    isAppload: false,
                    isApprove: false,
                    isCommented: false
                },
                project_uute: {
                    file: null,
                    label:"Проект УУТЭ",
                    key:"project_uute",
                    isAppload: false,
                    isApprove: false,
                    isCommented: false
                },
                tech_conditions: {
                    file: null,
                    label:"Тех. условия на присоединение",
                    key:"tech_conditions",
                    isAppload: false,
                    isApprove: false,
                    isCommented: false
                },
                tech_passport: {
                    file: null,
                    label:"Технический паспорт",
                    key:"tech_passport",
                    isAppload: false,
                    isApprove: false,
                    isCommented: false
                },
                cadastr_passport: {
                    file: null,
                    label:"Кадастровый паспорт",
                    key:"cadastr_passport",
                    isAppload: false,
                    isApprove: false,
                    isCommented: false
                },
                recvisits: {
                    file: null,
                    label:"Реквизиты",
                    key:"recvisits",
                    isAppload: false,
                    isApprove: false,
                    isCommented: false
                },
            },
        }
    },
    methods: {
        handleFileUpload(){
            let formData = new FormData();
            let current
            for (var key in this.main_files){
                // if (this.main_files[key].isAppload == false){
                    if (this.main_files[key].file){
                        current = key
                        formData.append(
                            'object_file', 
                            this.main_files[key].file, 
                            this.main_files[key].file.name
                        )
                        formData.append('object_id', this.$route.params.item)
                        formData.append('object_type', key)
                    }
                // }
            }
            axiosFiles.post('/upload-main-file', formData).then(() => {
                // this.getUploadedMainFiles()
                this.$set(this.main_files[current], 'isAppload', true)
                this.$set(this.main_files[current], 'isApprove', false)
                this.$set(this.main_files[current], 'isCommented', false)
                this.$alert('Успешно загружено')
            }).catch(error => {
                console.log(error)
                this.$alert('Не удалось загрузить файл')
            })
        },
        getUploadedMainFiles(){
            axiosAuth.post('/get-main-files', { object_id: this.$route.params.item } )
            .then(response => {
                console.log(response.data.uploaded_files)
                for (let key in response.data.uploaded_files){
                    this.$set(this.main_files[key], 'isAppload', true)
                    this.$set(this.main_files[key], 'isApprove', response.data.uploaded_files[key].is_approve)
                    this.$set(this.main_files[key], 'isCommented', response.data.uploaded_files[key].comment)
                }
            }).catch(error => {
                console.log(error)
                this.$alert('Не удалось загрузить статус основных файлов')
            })
        },
        downloadFile(object_key){
            axiosAuth.post('/download-main-file', { object_id: this.$route.params.item, object_key: object_key}, {responseType: "blob"} ).then(response => {
                const url = window.URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', object_key + response.data.type.split('/')[1]);
                document.body.appendChild(link);
                link.click();
            }).catch(error => {
                console.log(error.response)
                this.$alert('Не удалось скачать файл')
            })
        },
        aproveOrDecline(object){
            this.$fire({
                title: '<strong>'+object.label+'</strong>',
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
                        
                        axiosAuth.post('/add-comment-to-main-file', { object_id: this.$route.params.item, object_key: object.key, comment: comment })
                        .then((response => {
                            console.log(response)
                        }))
                        .catch((error) => {
                            console.log(error)
                        })
                    }
                    else {
                        axiosAuth.post('/approve-main-file', { object_id: this.$route.params.item, object_key: object.key })
                        .then((response => {
                            console.log(response)
                            location.reload()
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
.main-doc-item button *{
 color: white!important;
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
.v-input__append-inner {
    display: none!important;
}
.v-file-input__text {
    font-size: 0!important;
}
.v-input__slot .v-text-field__slot{
        max-width: 110px;
}
.row.mx-1.justify-space-between {
    min-height: 40px;
}
</style>