@extends('layouts.master_home')
@include('layouts.body.slider')

@section('home_content')
    <!-- ======= About Us Section ======= -->
    <section id="about-us" class="about-us">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>About Us</strong></h2>
        </div>

        <div class="row content">
            @if($abouts)
                <div class="col-lg-6" data-aos="fade-right">
                    <h2>{{ $abouts->title }}</h2>
                    <h3>{{ $abouts->short_dis }}</h3>
                </div>
                <div class="col-lg-6 pt-4 pt-lg-0" data-aos="fade-left">
                    <p>{{ $abouts->long_dis }}</p>
                </div>
            @else
                <div class="col-lg-12">
                    <p>No information available about About Us section.</p>
                </div>
            @endif
        </div>

      </div>
    </section><!-- End About Us Section -->

    <!-- ======= Services Section ======= -->
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>EMPOWERING GROWTH THROUGH INNOVATION</strong></h2>
          <p>Unleashing Potential Through Cutting-Edge Digital Solutions
            At Duck-Cloud, we are dedicated to revolutionizing the digital landscape for our community
             and clients. Our innovative approach drives growth and success.</p>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box iconbox-blue">
              <div class="icon">
                <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">

                </svg>
                <i class="bx bxl-dribbble"></i>
              </div>
              <h4><a href="">Innovative Web Solutions</a></h4>
              <p>At Duck Cloud, we're not just another web development company. We pride ourselves on offering innovative web solutions tailored to your specific needs. Whether it's building a sleek portfolio site or a robust e-commerce platform, our team of experts is dedicated to delivering cutting-edge web development services that set you apart from the competition.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-box iconbox-orange ">
              <div class="icon">
                <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">

                </svg>
                <i class="bx bx-file"></i>
              </div>
              <h4><a href="">Mobile App Excellence</a></h4>
              <p>Duck Cloud doesn't just develop apps; we craft mobile experiences that engage and delight users. From iOS to Android, our talented team of developers leverages the latest technologies to create intuitive and high-performance mobile applications that bring your vision to life. With Duck Cloud, your app will stand out in the crowded marketplace.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-box iconbox-pink">
              <div class="icon">
                <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">

                </svg>
                <i class="bx bx-tachometer"></i>
              </div>
              <h4><a href="">CMS Mastery</a></h4>
              <p>Managing content should be seamless, and that's where Duck Cloud's CMS services shine. Our expertise in Content Management Systems ensures that you have full control over your website's content without any hassle.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box iconbox-yellow">
              <div class="icon">
                <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">

                </svg>
                <i class="bx bx-layer"></i>
              </div>
              <h4><a href="">Youthful Energy</a></h4>
              <p>At Duck Cloud, we bring together a diverse team of young and dynamic professionals from Myanmar, Cambodia, and Thailand. This unique blend of talent infuses our work with fresh perspectives and innovative ideas. With Duck Cloud, you get the best of both worlds – youthful energy combined with global expertise.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-box iconbox-red">
              <div class="icon">
                <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">

                </svg>
                <i class="bx bx-slideshow"></i>
              </div>
              <h4><a href="">Client-Centric Approach</a></h4>
              <p>We understand that every client is unique, which is why Duck Cloud takes a client-centric approach to every project. From the initial consultation to project delivery and beyond, we prioritize open communication, collaboration, and transparency. Your satisfaction is our top priority, and we're committed to exceeding your expectations every step of the way.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-box iconbox-teal">
              <div class="icon">
                <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">

                </svg>
                <i class="bx bx-arch"></i>
              </div>
              <h4><a href="">Results-Driven Solutions</a></h4>
              <p>At Duck Cloud, we don't just promise results – we deliver them. Whether it's increased website traffic, higher app downloads, or improved user engagement, our goal is to help you achieve measurable success. With our data-driven approach and focus on continuous improvement, you can trust Duck Cloud to drive real, tangible results for your business.</p>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Services Section -->

    <!-- ======= Portfolio Section ======= -->
    <section id="portfolio" class="portfolio">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>Portfolio</h2>
        </div>

        <div class="row" data-aos="fade-up">
          <div class="col-lg-12 d-flex justify-content-center">

          </div>
        </div>

        <div class="row portfolio-container" data-aos="fade-up">

         @foreach($images as $img)
          <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <img src="{{ $img->image  }}" class="img-fluid" alt="">
            <div class="portfolio-info">
              <h4>App 1</h4>
              <p>App</p>
              <a href="{{ $img->image  }}" data-gall="portfolioGallery" class="venobox preview-link" title="App 1"><i class="bx bx-plus"></i></a>
              <a href="portfolio-details.html" class="details-link" title="More Details"> </a>
            </div>
          </div>
          @endforeach




        </div>

      </div>
    </section><!-- End Portfolio Section -->

    <!-- ======= Our Clients Section ======= -->
    <section id="clients" class="clients">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>What we developed</h2>
        </div>

        <div class="row no-gutters clients-wrap clearfix" data-aos="fade-up">
            {{-- this is for the Chnai & Success from front --}}
            <div class="col-lg-3 col-md-4 col-6">
                <div style="text-align: center; padding-top:2rem;">
                    <h6> Success Menu</h6>
                </div>
                <div class="client-logo">
                  <img src="{{ asset('frontend/assets/img/success_menu.png') }}" class="img-fluid" alt="">
                </div>
            </div>

            <div class="col-lg-3 col-md-4 col-6">
                <div style="text-align: center; padding-top:2rem;">
                    <h6> Chnai Menu </h6>
                </div>
                <div class="client-logo">
                  <img src="{{ asset('frontend/assets/img/chnai_menu.png') }}" class="img-fluid" alt="">
                </div>
            </div>

        @foreach($brands as $brand)
          <div class="col-lg-3 col-md-4 col-6">
            <div style="text-align: center; padding-top:2rem;">
                <h6> {{ $brand->brand_name }}</h6>
            </div>
            <div class="client-logo">
              <img src="{{ $brand->brand_image  }}" class="img-fluid" alt="">
            </div>
          </div>
          @endforeach



        </div>

      </div>
    </section><!-- End Our Clients Section -->

    @endsection
