@extends('layouts.master_home')

@section('home_content')


    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>Portfolio</h2>
          <ol>
            <li><a href="{{ url('/') }}">Home</a></li>
            <li><a href="{{ url('/portfolio') }}">Portfolio</a></li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs -->

    <!-- portfolio.blade.php // portfolio section -->
    <section id="portfolio" class="portfolio">
        <div class="container">
        <div class="row" data-aos="fade-up">
            <div class="col-lg-12 d-flex justify-content-center"></div>
        </div>
        <div class="container-inside">
            <p id="intro-text">
            At Duck Cloud, we specialize in delivering top-tier digital solutions including Website Development, Android/iOS Development, and CMS Systems. Our team is dedicated to transforming your ideas into innovative and functional digital experiences. Explore our portfolio to see how we have helped clients achieve their digital goals with exceptional service and expertise.
            </p>
            <h3>Here are some of the services we offer:</h3>
            <ul id="services-list">
            <li>Website Development</li>
            <li>Android/iOS Development</li>
            <li>CMS Systems</li>
            </ul>
        </div>
        <div class="row portfolio-container" data-aos="fade-up">
            @foreach($images as $img)
            <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-item-wrapper">
                <img src="{{ asset($img->image) }}" class="img-fluid" alt="">
                <div class="portfolio-info">
                <h4>{{ $img->title }}</h4>
                <p>{{ $img->description }}</p>
                <a href="{{ asset($img->image) }}" data-gall="portfolioGallery" class="venobox preview-link" title="{{ $img->title }}">
                    <i class="bx bx-plus"></i>
                </a>
                </div>
            </div>
            </div>
            @endforeach
        </div>
        </div>
    </section>
    <!-- End Portfolio Section -->
@endsection

@section('scripts')
<script>
    $(document).ready(function() {
        $('.venobox').venobox({
            titleattr: 'title',
            numeratio: true,
            infinigall: true,
            share: ['facebook', 'twitter', 'download']
        });
    });
</script>
@endsection
