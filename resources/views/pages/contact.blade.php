@extends('layouts.master_home')

@section('home_content')


    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>Contact</h2>
          <ol>
            <li><a href="{{ url('/') }}">Home</a></li>
            <li><a href="{{ url('/contact') }}">Contact</a></li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs -->


    @if(session('success'))
     <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{{ session('success') }}</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
   </div>
   @endif

    <!-- ======= Contact Section ======= -->

    <section id="contact" class="contact">
      <div class="container">

        <div class="row justify-content-center" data-aos="fade-up">

          <div class="col-lg-10">

            <div class="info-wrap">
              <div class="row">
                <div class="col-lg-4 info">
                  <i class="icofont-google-map"></i>
                    @if($contacts)
                        <h4>Location:</h4>
                        <p> {{ $contacts->address }}</p>
                    @else
                    <p>Currently, there are no contact details available.</p>
                    @endif
                </div>

                <div class="col-lg-4 info mt-4 mt-lg-0">
                  <i class="icofont-envelope"></i>
                    @if($contacts)
                        <h4>Email:</h4>
                        <p>{{ $contacts->email }}</p>
                    @else
                        <p>not available now..</p>
                    @endif
                </div>

                <div class="col-lg-4 info mt-4 mt-lg-0">
                  <i class="icofont-phone"></i>
                    @if($contacts)
                        <h4>Call:</h4>
                        <p>{{ $contacts->phone }}</p>
                    @else
                        <p>not available now..</p>
                    @endif
                </div>
              </div>
            </div>

          </div>

        </div>

        <div class="row mt-5 justify-content-center" data-aos="fade-up">
          <div class="col-lg-10">
            <form action="{{ route('contact.form') }}" method="post" >
              @csrf
              <div class="form-row">
                <div class="col-md-6 form-group">
                  <input type="text" name="name" class="form-control"   placeholder="Your Name"   />

                </div>
                <div class="col-md-6 form-group">
                  <input type="email" class="form-control" name="email"  placeholder="Your Email"   />

                </div>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject"   />

              </div>
              <div class="form-group">
                <textarea class="form-control" name="message" rows="5"   placeholder="Message"></textarea>

              </div>
     <button class="btn btn-success" type="submit" style="background-color: #066074;">Send Message</button>
            </form>
          </div>

        </div>

      </div>
    </section><!-- End Contact Section -->

    <section id="map-section" class="map-section" style="height: 400px;">
        <video autoplay loop muted controls="false">
            <source src="{{ asset('frontend/assets/img/map-section.mp4') }}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

@endsection

