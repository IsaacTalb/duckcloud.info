@extends('layouts.master_home')

@section('home_content')

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>Privacy Policy</h2>
          <ol>
            <li><a href="{{ route('home') }}">Home</a></li>
            <li>Privacy Policy</li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs -->

    <!-- ======= Privacy Policy Section ======= -->
    <section id="privacy-policy" class="privacy-policy">
      <div class="container">

        <div class="row" data-aos="fade-up">
          <div class="col-lg-12">
            @if($privacyPolicy)
                <h3>{{ $privacyPolicy->title }}</h3>
                <img src="{{ $privacyPolicy->photo }}" class="img-fluid" alt="">
                <p>{{ $privacyPolicy->text }}</p>
            @else
                <p>No privacy policy found.</p>
            @endif
          </div>
        </div>

      </div>
    </section><!-- End Privacy Policy Section -->

@endsection
