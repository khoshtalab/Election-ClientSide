<template>
  <div id="app">
    <nav class="navbar __nav">
      <div class="container top__nav_ul">
        <ul class="nav__right__ul nav__top__menu__hidden">
<!--          <li><a href="#"><i class="fa fa-diamond"></i>منوی تست با آیکون</a></li>-->
<!--          <li><a href="#">انجمن ها</a></li>-->


        </ul>
        <div class="my-2 my-lg-0">
          <ul class="nav__right__ul">
            <li class="nav__portal "><a href="https://ucsa.ir" target="_blank"><i class="fa fa-user"></i> ورود به سایت اتحادیه انجمن های علمی کامپیوتر
              دانشگاه فنی و حرفه ای کشور</a></li>

          </ul>
        </div>
      </div>
    </nav>

    <header class="ctvu__header sticky-top">

      <div class="menu__selector ctvu__menu">
        <div class="container">
          <div class="row">
            <div class="col d-flex justify-content-center align-items-center logo__header">
              <a href="#"><img src="assets/img/logo.png" alt=""></a>
              <h1>
                سامانه انتخابات
                <br>
                اتحادیه انجمن های علمی کامپیوتر <br> دانشگاه فنی و حرفه ای کشور</h1>
            </div>

            <div class="col d-flex  justify-content-center align-items-center ">


              <div class="header__call d-lg-none">
                <ul>

                  <li><img src="assets/img/imam.png" alt=""></li>
                </ul>
              </div>


            </div>
            <div class="col header__call_section d-flex justify-content-center align-items-center">
              <div class="header__call">
                <ul>

                  <li><img src="assets/img/imam.png" alt=""></li>
                </ul>
              </div>
            </div>
          </div>


        </div>

      </div>

    </header>


    <main>


      <router-view/>

    </main>
    <footer>
      <div class="container pt-4 pb-4">
        <div class="row">
          <div class="col-12">
            <div class="footer__dsc__etehadie">
              <div class="col d-flex justify-content-center align-items-center logo__header">
                <a href="#"><img src="assets/img/logo.png" style="width:50%" alt=""></a>
                <h1>اتحادیه انجمن های علمی کامپیوتر <br> دانشگاه فنی و حرفه ای کشور</h1>
              </div>
              <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی
                مورد نیاز</p>
              <ul>
                <li>

                  نشانی دبیرخانه:
                  <span @click="gotoadmin">ایران، کردستان، داشگاه فنی و حرفه ای کردستان</span>
                </li>
                <li>

                  پست الکترونیکی:
                  <span>info@ctvu.tvu.ac.ir</span>
                </li>
                <li>

                  کد پستی:
                  <span>56651-11361</span>
                </li>
              </ul>
            </div>
          </div>


        </div>

        <hr>
        <h5>© تمامی حقوق برای اتحادیه انجمن های علمی کامپیوتر دانشگاه فنی حرفه ای کشور محفوظ است.</h5>
        <h6>طراحی و توسعه بک اند: <a href="https://arminmalek.ir/about" target="_blank"> مهندس آرمین اسماعیلی ملک</a></h6>
        <h6>طراحی و توسعه فرانت اند: <a href="https://khoshtalab.ir" target="_blank"> مهندس حسین آسیابی خوش طلب</a></h6>
        <h6>طراحی UI/UX: <a href="#"> مهندس پردیس بهزادپور</a></h6>
      </div>

    </footer>

  </div>


</template>

<style>

</style>
<script>


export default {
  components: {},
  computed: {},
  methods:{
    gotoadmin(){
      this.$router.push('adminapsdojpasdojhok')

    }
  }


}
</script>

