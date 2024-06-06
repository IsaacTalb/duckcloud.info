@extends('layouts.master_home')

@section('home_content')

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>About</h2>
          <ol>
            <li><a href="{{ route('home') }}">Home</a></li>
            <li>About</li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs -->

    <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container">

        <div class="row" data-aos="fade-up">
          <div class="col-lg-12">
            @if($about)
                <h3>{{ $about->title }}</h3>
                <p>{{ $about->short_dis }}</p>
                <p>{{ $about->long_dis }}</p>
            @else
                <p>Currently, there is no about us :(</p>
            @endif
          </div>
        </div>

      </div>
    </section><!-- End About Section -->

@endsection
