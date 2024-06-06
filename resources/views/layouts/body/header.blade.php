<!-- ======= Header ======= -->
<header id="header" class="fixed-top">
    <div class="container d-flex align-items-center">


      <!-- Uncomment below if you prefer to use an image logo -->
      {{-- <a href="index.html" class="logo mr-auto"><img src="frontend/assets/img/dc_logo.png" alt="" class="img-fluid"></a> --}}

      {{-- <div class="marquee-container">
        <h1 class="logo marquee"><a href="{{ route('home') }}">ဒေါက်ကလပ်</a></h1>
      </div> --}}

      <h1 class="logo mr-auto"><a href="{{ route('home') }}">ဒေါက်ကလပ်</a></h1>
      <nav class="nav-menu d-none d-lg-block">
        <ul>
          <li class=""><a href="{{ route('home') }}">Home</a></li>
          <li><a href="{{ route('about') }}">About</a></li>
          <li><a href="{{ route('portfolio') }}">Portfolio</a></li>
          <li><a href="{{ route('contact') }}">Contact</a></li>
          <li><a href="{{ route('privacy-policy') }}">Privacy Policy</a></li>
          {{-- <li><a href="{{ route('login') }}">Login</a></li> --}}

        </ul>
      </nav><!-- .nav-menu -->

      <div class="header-social-links">
        <a href="https://x.com/2am_tech" class="twitter"><i class="icofont-twitter"></i></a>
        <a href="https://www.facebook.com/duckcloudglobal" class="facebook"><i class="icofont-facebook"></i></a>
      </div>

    </div>
  </header><!-- End Header -->
