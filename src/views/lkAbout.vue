<template>  
<div>
   <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      class="dark flex-column"
    >
      <v-list dense class="mainmenulk">
        <v-list-item >
          <v-list-item-action>
            <v-img src="@/assets/img/3.png" contain  height="50px" width="50px"></v-img>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="logolk">Личный кабинет</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
           <v-list-item >
          <v-list-item-action>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="userName">{{ name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          <v-list-group>
            <template v-slot:activator :expand="True">
              <v-list-item-action>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Объекты</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="item in objectsItems" v-bind:key="item._id" :to="'/lkmain/'+item._id">
                <v-list-item-content>
                  <v-list-item-title>{{item.object_name}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action @click.prevent="deleteObject(item.object_name, item._id)">
                  <v-btn icon>
                      <v-icon color="grey lighten-1">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
            </v-list-item>
            <v-list-item @click="addObject()">
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-plus</v-icon>
                </v-btn>
                <v-list-item-content>
                  <v-list-item-title>Добавить объект</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </v-list-group>
        <v-list-item link to="/lkabout">
          <v-list-item-action>
            <v-icon>mdi-flash</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Об энергосервисе</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="lksettings">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Личный кабинет</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense>
        <v-list-item @click.stop="right = !right">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container
        class="fill-height lk-body"
        fluid
      >
       <v-card
            class="mx-auto pa-5"
            width="100%"
          >
          <span>
          Энергосервис – широко известный и активно применяемый во многих странах инструмент финансирования энергосберегающих мероприятий в зданиях. В мировой практике энергосервис – это комплексные услуги и работы, направленные на достижение и (или) повышение энергетической эффективности зданий, включая промышленные и иные коммерческие здания, здания публичного сектора и жилые дома. Целью этих услуг и работ является снижение затрат заказчика на энергоресурсы при сохранении условий комфортности нахождения в здании и (или) эффективности использования энергии.
          <br><br>
          Энергосервис предполагает проведение энергосберегающих мероприятий за счет исполнителя – энергосервисной компании (ЭСКО), как правило, с применением привлеченных ею кредитных средств. Плата по договору производится заказчиком после проведения энергосберегающих мероприятий в течение срока действия договора за счет средств, сэкономленных на оплате коммунальных услуг / ресурсов. Таким образом, в отличие от традиционного подхода к энергосбережению (где бремя энергосберегающих мероприятий полностью ложится на собственников недвижимости) энергосервисный договор позволяет возложить обязанность проведения всех мероприятий и риски по достижению заявленных результатов экономии ресурсов на энергосервисную компанию.
          <br><br>
          В Российской Федерации рынок энергосервисных услуг является сравнительно новым. Энергосервисные компании, зарегистрированные в России, как правило, специализируются на поставке энергосберегающего оборудования и материалов, проведении энергетических обследований. Кроме того, есть генерирующие и сбытовые ресурсоснабжающие организации, которые помимо поставки энергетических ресурсов предлагают дополнительные услуги, связанные с оптимизацией энергопотребления.
          <br><br>
          Наиболее широко энергосервис применяется в зданиях, используемых под промышленные предприятия, где энергосбережение – один из ключевых факторов повышения эффективности производства, а высокая конкуренция стимулирует предпринимателей к снижению производственных издержек. Практика применения энергосервисных договоров (контрактов) в бюджетной сфере в российских городах более ограниченная, тем не менее, есть примеры реализации энергосервисных проектов в зданиях образовательного, социально-культурного, спортивного назначения.
          <br><br>
          Энергосервисные договоры могли бы стать инструментом финансирования комплексных проектов повышения энергоэффективности многоквартирных домов, привлекательным для сплоченных и организованных собственников помещений в таких домах, поскольку энергосервис не требует собственников каких-либо дополнительных сборов или повышения стоимости содержания и ремонта общего имущества в доме, а риски недостижения плановой экономии энергоресурсов лежат на ЭСКО. При этом есть весьма заметный потенциал экономии энергоресурсов, которую можно получить в результате комплексных энергосервисных проектов в многоквартирном доме. Однако к настоящему времени энергосервисные договоры в многоквартирных домах в России еще не нашли должного применения.
          </span>
  </v-card>




      </v-container>
    </v-content>
    
    
</div>
</template>
<script> 
import axiosAuth from "@/api/axios-auth"
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    objectsItems: [],
    name: localStorage.getItem('email')
  }),
  methods: {
    addObject(){
      this.$prompt("Введите название объекта").then((text) => {
        axiosAuth.post('/add-object', { object_name: text}).then(() => {
          this.getObjectList()
        }).catch(error => {
          console.log(error)
          this.$alert('Не удалось добавить объект')
        })
      })
    },
    deleteObject(objectName, objectId){
      this.$confirm("Вы уверены, что хотите удалить объект?").then(() => {
        axiosAuth.post('/delete-object', { object_name: objectName, object_id: objectId}).then(() => {
          this.getObjectList()
          this.$router.replace({name: 'lk_main'})
        }).catch(error => {
          console.log(error)
          this.$alert('Не удалось удалить объект')
        })
      });
    },
    getObjectList(){
      axiosAuth.get('/get-object-list').then(response => {
        this.objectsItems = response.data.objects
      }).catch((error) => {
        console.log(error)
        this.$alert('Не удалось получить список объектов')
      })
    }
  },
  created () {
    this.getObjectList()
  },
}
</script>
<style>

</style>