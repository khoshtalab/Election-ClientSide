<template>
  <div class="home">
    <template v-if="this.authorization === null">
      <div class="container mt-5">
        <div class="bg-white">
          <div class="p-2">

            <h2>برای ورود به پنل مدیریت یوزر و پس رو وارد کنید.</h2>
            <div class="form-group">
              <label>یوزر</label>
              <input class="form-control" type="text" v-model="username">
            </div>
            <div class="form-group">
              <label>پسورد</label>
              <input class="form-control" type="password" v-model="password">
            </div>

            <button class="btn btn-primary mt-2" @click="loginAdmin">ورود</button>

          </div>
        </div>

      </div>

    </template>

    <template v-if="this.authorization !== null">
      <div class="container">
        <div class="bg-white mt-5">

          <div class="p-3">
            <div class="mb-2">

              <button type="submit" class="btn btn-primary" @click="getStatus">مشاهده وضعیت فعلی انتخابات</button>
              <button type="submit" class="btn btn-success" @click="changeStatus('start')">تغییر وضغیت به شروع</button>
              <button type="submit" class="btn btn-warning" @click="changeStatus('stop')">تغییر وضغیت به متوقف شده
              </button>
              <button type="submit" class="btn btn-danger" @click="changeStatus('end')">تغییر وضغیت به تمام شده</button>
            </div>


            <h3>دستورات مدیریتی</h3>
            وضعیت فعلی انتخابات:
            {{ status }}

          </div>
        </div>

      </div>
      <div class="container">
        <div class="bg-white mt-5">

          <div class="p-3">
            <div class="mb-2">

              <button type="submit" class="btn btn-primary" @click="refrestResult">بروزرسانی لیست نتایج</button>
            </div>


            <h3>نتایج</h3>
            <table class="table table-striped">
              <thead>
              <tr>
                <th scope="col">رتبه</th>
                <th scope="col">نام و نام خانوادگی</th>
                <th scope="col">انجمن</th>
                <th scope="col">تعداد رای</th>
              </tr>
              </thead>
              <tbody>
              <template v-for="(candid,index) in c_results">
                <!--            {{ candid}}-->
                <tr :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ candid.firstname + " " + candid.lastname }}</td>
                  <td>{{ candid.association }}</td>
                  <td>{{ candid.votes }}</td>
                </tr>
              </template>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <div class="container mt-3">
        <div class="row">
          <div class="col-md-12">
            <div class="bg-white p-3">
              <h4 class="mb-3">لیست کاندید ها</h4>
              <div class="mb-2">

                <button type="submit" class="btn btn-primary" @click="loadCandids">بروزرسانی لیست کاندید ها</button>
              </div>

              <table class="table table-striped">
                <thead>
                <tr>
                  <th scope="col">ردیف</th>
                  <th scope="col">نام و نام خانوادگی</th>
                  <th scope="col">انجمن</th>
                  <th scope="col">اطلاعات کلی</th>
                  <th scope="col">مدیریت</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(candid,index) in c_candids">
                  <!--            {{ candid}}-->
                  <tr :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ candid.firstname + " " + candid.lastname }}</td>
                    <td>{{ candid.association }}</td>
                    <td>
                      <ul>
                        <li>بیو کوتاه: {{ candid.minibio }}</li>
                        <li>بیو کامل: {{ candid.fullbio }}</li>
                        <li>لینک رزومه:
                          <a :href="candid.resumeurl" target="_blank" type="button" class="btn btn-primary">مشاهده
                            رزومه</a>

                        </li>
                        <li>عکس کاندید:
                          <img :src="candid.picurl" class="img img-fluid"/>

                        </li>

                      </ul>
                    </td>
                    <td>
                      <button type="submit" class="btn btn-danger" @click="deletCondid(candid.id)">حذف کاندید</button>

                    </td>
                  </tr>
                </template>
                </tbody>
              </table>


            </div>
          </div>
          <div class="col-md-12">
            <div class="bg-white p-3 mt-3">
              <h4 class="mb-3">افزودن کاندید </h4>


              <div class="form-group">
                <label>نا</label>
                <input class="form-control" type="text" v-model="fname">
              </div>

              <div class="form-group">
                <label>نام خانوادگی</label>
                <input class="form-control" type="text" v-model="lname">
              </div>

              <div class="form-group">
                <label>انجمن</label>
                <input class="form-control" type="text" v-model="association">
              </div>

              <div class="form-group">
                <label>بیو کوتاه</label>
                <input class="form-control" type="text" v-model="minibio">
              </div>

              <div class="form-group">
                <label>بیو کامل</label>
                <input class="form-control" type="text" v-model="fullbio">
              </div>

              <div class="form-group">
                <label>لینک رزومه</label>
                <input class="form-control" type="text" v-model="resumeurl">
              </div>

              <div class="form-group">
                <label>لینک عککس</label>
                <input class="form-control" type="text" v-model="picurl">
              </div>

              <div class="form-group">
                <label>دانشگاه</label>
                <input class="form-control" type="text" v-model="uni">
              </div>

              <button type="submit" class="btn btn-success" @click="addCondid">افزودن</button>

            </div>
          </div>
        </div>
      </div>

    </template>

  </div>
</template>

<style>

</style>
<script>
// @ is an alias to /src

import {mapGetters} from "vuex";
import axios from "axios";
// import store from "../store";
// import axios from "axios";
// import store from "../store";

export default {
  name: 'Home',
  data() {
    return {
      authorization: null,
      username: null,
      password: null,
      candids: [],
      statusVote: '',
      votes: [],
      results: [],
      fname: null,
      lname: null,
      association: null,
      minibio: null,
      fullbio: null,
      resumeurl: null,
      picurl: null,
      uni: null,
      status: null,
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
    c_results() {
      return this.results
    },
    c_candids() {
      return this.candids
    },

  },
  methods: {
    loginAdmin() {
      let vm = this;
      axios.post('admin/login', {"pass": vm.password}
      ).then((response) => {

        vm.$toaster.success('با موفقیت وارد شد.')
        vm.authorization = response.data.token

      }).catch(function (error) {
        if (error.response) {

          vm.$toaster.warning('رمز یا نام کاربری اشتباه است.')

        }
      })
    },
    refrestResult() {
      let vm = this;
      axios.get('admin/livestats').then((response) => {

        vm.results = response.data;
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      })
    },
    loadCandids() {
      let vm = this;
      axios.get('candid').then((response) => {

        vm.candids = response.data;
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      })
    },
    deletCondid(id) {
      let vm = this;

      axios.post('admin/removecandid', {
        'id': id
      }, {
        headers: {
          "Authorization": this.authorization
        }
      }).then((response) => {
        if (response.data.status) {
          this.loadCandids();
          vm.$toaster.success(response.data.msg)
        }else{
          vm.$toaster.warning(response.data.msg)
        }

      }).catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      })
    },
    addCondid() {
      let vm = this;
      axios.post('admin/addcandid', {
        'firstname': vm.fname,
        'lastname': vm.lname,
        'association': vm.association,
        'minibio': vm.minibio,
        'fullbio': vm.fullbio,
        'resumeurl': vm.resumeurl,
        'picurl': vm.picurl,
        'uni': vm.uni,

      }, {
        headers: {
          "Authorization": this.authorization
        }
      }).then((response) => {

        if (response.data.status) {
          this.fname = null
          this.lname = null
          this.association = null
          this.minibio = null
          this.fullbio = null
          this.resumeurl = null
          this.picurl = null
          this.uni = null


          this.loadCandids();
          vm.$toaster.success(response.data.msg)
        }else{
          vm.$toaster.warning(response.data.msg)
        }



      }).catch(function (error) {
        if (error.response) {
          console.log(error.response);
          vm.$toaster.warning('مشکلی وجود آمد')

        }
      })
    },
    getStatus() {
      let vm = this;
      axios.get('status', {}, {
        headers: {
          "Authorization": this.authorization
        }
      }).then((response) => {

        vm.status = response.data
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      })
    },
    changeStatus(action) {
      let vm = this;
      axios.post('admin/controll', {
        "action": action
      }, {
        headers: {
          "Authorization": this.authorization
        }
      }).then(() => {

        this.getStatus()
        vm.$toaster.success('با موفقیت تغییر یافت.')

      }).catch(function (error) {
        if (error.response) {
          console.log(error.response);
        }
      })
    },

  },
  mounted() {


  }
}
</script>
