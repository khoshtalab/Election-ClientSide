<template>
  <div class="login">
    <div class="container">
      <section class="">
        <div class="login-user login-style-1-icon shadow">

          <div class="row login-wrapper">

            <div class="col-md-6" id="loginModal">

              <div class="stu-login" style="">

                <h2 class="login-title">ورود به حساب کاربری</h2>

              </div>

              <div class="form-lg-rg">
                <div class="forms-inner">
                  <div class="loginform signIn__signUp__show" id="loginForm">
                    <h3>ورود به اتحادیه</h3>
                    <h4>خوشحالیم که دوباره میبینیمت :)</h4>

                    <label for="username">کد ملی:</label>
                    <input type="text" name="username" id="username" v-model="username"
                           placeholder="کد ملی خود را وارد کنید" required="">

                    <label for="password">شماره دانشجویی</label>
                    <input type="password" name="password" id="password" v-model="password"
                           placeholder="رمز عبور خود را وارد کنید" required="" autocomplete="off">


                    <div class="form-group row">
                      <div class="col-6">
                        <label for="captcha_input">کد کپچا</label>
                        <input type="text" dir="ltr" name="captcha_input" id="captcha_input" v-model="captcha_input"
                               placeholder="کد روبرو" required="" autocomplete="off">

                        <button class="btn" type="button" @click="captcha"> ریست کپچا</button>


                      </div>

                      <div class="col-6">
                        <template>
                          <div v-html="get_captcha_svg"></div>
                        </template>

                      </div>

                    </div>


                    <button type="submit" @click="login">ورود</button>


                  </div>

                </div>
              </div>


            </div>


            <div class="col-md-6 dis-login-section">
              <div class="text-center"><img src="assets/img/login.svg" alt="">
              </div>
              <div class="login-user-dis">
                <span>سلام کاربر محترم؛</span>
                <ul>
                  <li>
                    لطفا از مرورگرهای مطمئن و بروز مانند گوگل کروم و فایرفاکس استفاده کنید.

                  </li>
                  <li> ما هرگز اطلاعات محرمانه شما را از طریق ایمیل درخواست نمی کنیم.
                  </li>
                  <li> لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


  </div>
</template>


<script>
// @ is an alias to /src
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      status: false,
      username: null,
      password: null,
      captcha_input: null,
    }
  },
  methods: {
    ...mapActions({
      get_captcha: 'auth/getCaptcha',
      login_auth: 'auth/login'
    }),
    captcha() {
      this.get_captcha()
    },
    login() {
      let vm = this;

      this.login_auth({
        username: this.username,
        password: this.password,
        captcha: this.captcha_input,
        captok: this.get_captcha_t,
      }).then(() => {
        vm.$toaster.success('به حساب کاربری خود خوش آمدید :)')

        this.$router.replace({
          name: 'Home'
        })


      }).catch(function (error) {
        if (error.response.status === 401) {
          vm.$toaster.error(error.response.data.msg)

          vm.captcha();
        }

      })
    }
  },
  components: {},
  computed: {
    ...mapGetters({
      get_captcha_svg: 'auth/captcha',
      get_captcha_t: 'auth/captchaT',
    }),
  },
  mounted() {
    this.captcha();
  }
}
</script>
