<template>
  <div class="home">
    <div class="container mt-5">
      <div class="row ">
        <div class="col-md-6 mt-5">
          <h1>
            {{ user.firstName + ' ' + user.lastName }}
            <br>
            به سامانه انتخابات اتحادیه کامپیوتر خوش آمدید</h1>
          <h5>قبل از رای گیری لازم است که قوانین زیر را مطالعه کنید</h5>
          <ul>
            <li>قانون شماره 1</li>
            <li>قانون شماره 2</li>
            <li>قانون شماره 3</li>
            <li>قانون شماره 4</li>
            <li>قانون شماره 5</li>
            <li>قانون شماره 6</li>
          </ul>
          <div class="" style="text-align: center;">
            <div>
              <a href="#candinds" role="button" class="btn btn-primary mt-4 m-3">مشاهده کاندید ها و رای دهی</a>
              <button role="button" class="btn btn-danger mt-4 m-3" @click="logout">خروج از حساب کاربری </button>
            </div>

          </div>

        </div>
        <div class="col-md-6">
          <img src="img/vote.svg" style="max-width:80%" alt="">
        </div>
      </div>
    </div>


    <section class="candinds" id="candinds">
      <div class="container">
        <div class="row">
          <div class="title">
            <h2 v-if="c_statusVote === 'ended' ">لیست نتایج انتخابات اتحادیه کامپیوتر</h2>
            <h2 v-else>لیست کاندیدای انتخابات اتحادیه کامپیوتر</h2>
          </div>
          <div class="row">
            <template v-for="(candid,index) in c_candids">

              <div class="col-md-3" :key="index">
                <div class="card__candind">
                  <img :src="candid.picurl" alt="">
                  <h3>{{ candid.firstname + ' ' + candid.lastname }}</h3>
                  <h5>{{ candid.minibio }}</h5>
                  <ul>
                    <li>دبیر انجمن
                      {{ candid.association }}
                    </li>
                    <li>دانشگاه
                      {{ candid.uni }}
                    </li>
                  </ul>
                  <p>
                    {{ candid.fullbio }}
                  </p>
                  <div class="mb-3">
                    <a :href="candid.resumeurl" target="_blank" type="button" class="btn btn-primary">مشاهده رزومه</a>

                  </div>

                  <div class="check__vote mt-3 mb-3" v-if="c_statusVote !== 'ended' ">
                    <input type="checkbox" class="form-check-input" :value="candid.id" v-model="votes">
                    <label class="form-check-label"> رای به این کاندید </label>
                  </div>
                  <div v-if="c_statusVote === 'ended' ">
                    <h5>
                      تعداد رای:

                      <span>{{ candid.votes }}  نفر</span>
                    </h5>
                  </div>
                  <div class="mb-3"></div>
                </div>
              </div>

            </template>
            <button class="btn btn-success mt-3" v-if="c_statusVote !== 'ended' " @click="sendVotes">ارسال</button>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style>
.candinds {
  background: rgb(11, 69, 117);
  background: linear-gradient(360deg, rgba(11, 69, 117, 1) 0%, rgba(43, 123, 194, 1) 100%);
  padding: 25px 10px;
}

.title h2 {
  text-align: center;
  color: #FBC531
}

.card__candind {
  background: #174770;
  padding: 10px;
  border-radius: 10px;
  margin-top: 80px;
  text-align: center;
  color: #FFF;
}

.card__candind img {
  margin-top: -78px;
  border-radius: 50%;
  border: 1px solid;
  margin-bottom: 10px;
  width: 200px;
  height: 200px;
}

.card__candind h3 {
  color: #FBC531;
  font-size: 1.5rem;
}

.card__candind p {
  font-size: 0.89rem;
  text-align: justify;
  font-weight: 300;
  max-height: 150px;
  overflow: auto;
  padding-left: 10px;
  height: 150px
}

.card__candind ul {
  padding-right: 2rem;
  margin-bottom: 1rem;
  text-align: right;
  list-style-type: disc;
}

.check__vote {
  background: #fbc531;
  display: initial;
  padding: 5px;
  border-radius: 50px;
}

.check__vote .form-check-label {
  margin-right: 10px;
}
</style>
<script>
// @ is an alias to /src

import {mapGetters} from "vuex";
import axios from "axios";
import store from "../store";

export default {
  name: 'Home',
  data() {
    return {
      candids: [],
      statusVote: '',
      votes: [],
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),

    c_candids() {
      return this.candids
    },
    c_statusVote() {
      return this.statusVote
    }

  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      this.$router.replace({
        path: '/login'
      })
    },
    sendVotes() {

      let vm = this;
      axios.post('vote', {
        'candids': this.votes
      }, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }).then((response) => {

        if (response.data.status) {
          vm.$toaster.success('با موفقیت نظر شما ثبت شد - منتظر اتمام انتخابات باشید.')

        } else {
          vm.$toaster.warning(response.data.msg)

        }
      }).catch(function (error) {
        if (error.response) {

          if (error.response.status === 401) {
            vm.$toaster.error('توکن شما منقضی شده است - لطفا دوباره لوگین کنید.')
            let response = {
              status: true,
              token: null,
              firstname: null,
              lastname: null,
            }

            store.dispatch('auth/attempt', response).then(() => {
              vm.$router.replace({
                name: 'Login'
              })
            })

          }else{
            vm.$toaster.warning(error.response.data.msg)
          }
        }

      })
    }
  },
  mounted() {

    axios.get('status').then((response) => {
      this.statusVote = response.data

      if (this.c_statusVote === 'ended') {
        axios.get('result').then((response) => {
          this.candids = response.data
        })
      } else {
        axios.get('candid').then((response) => {
          this.candids = response.data
        })
      }
    })


  }
}
</script>
