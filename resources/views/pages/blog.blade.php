@extends('layouts.master_home')

@section('content')

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>Blogs</h2>
          <ol>
            <li><a href="{{ url('/') }}">Home</a></li>
            <li><a href="{{ url('/blog') }}">Blogs</a></li>
          </ol>
        </div>
      </div>
    </section><!-- End Breadcrumbs -->

    <!-- ======= Blog Section ======= -->
    <section id="blog" class="blog">
      <div class="container">

        <div class="row">

          <div class="col-lg-8 entries">

            <article class="entry">

              <h2><a href="">Introducing our Founder Isaac and Thy</a></h2>

              <div class="meta">
                <p>By <a href="#">Isaac</a> | <a href="#">Thy</a></p>
              </div>

              <p>
                Isaac is from Myanmar (Burma) and Thy is from Cambodia. Both are Full Stack Developers with a strong passion for website and software development. Their passion for coding and learning new technologies inspired them to start Duck Cloud Technology.
              </p>

              <img src="https://pbs.twimg.com/media/D3qzFp8W0AELj7E.jpg" class="img-fluid" alt="">

              <p>
                Isaac is a Full Stack Developer with years of experience in web development. He is an expert in web application development and design, and is very passionate about coding and learning new technologies.
              </p>

              <p>
                Thy is a Full Stack Developer with years of experience in web development. She is an expert in web application development and design, and is very passionate about coding and learning new technologies.
              </p>

              <blockquote>
                <p>
                  Our mission is to create a better IT industry in Myanmar (Burma) and Cambodia. We aim to make a better world through technology.
                </p>
              </blockquote>

              <p>
                We are very excited to start Duck Cloud Technology and look forward to working with our customers and partners to create a better world through technology.
              </p>

            </article><!-- End blog entry -->

          </div><!-- End blog entries list -->

          <div class="col-lg-4">

            <div class="sidebar">

              <h3 class="sidebar-title">Recent Posts</h3>
              <div class="recent-posts">
                <a href="#">
                  <img src="https://picsum.photos/360/204" alt="" class="img-fluid">
                  <h4><a href="#">Understanding AI in Modern Tech</a></h4>
                  <time datetime="2024-02-15">Feb 15, 2024</time>
                </a>
                <a href="#">
                  <img src="https://picsum.photos/360/201" alt="" class="img-fluid">
                  <h4><a href="#">Latest Trends in Machine Learning</a></h4>
                  <time datetime="2024-05-10">May 10, 2024</time>
                </a>
                <a href="#">
                  <img src="https://picsum.photos/360/202" alt="" class="img-fluid">
                  <h4><a href="#">Building AI-powered Apps</a></h4>
                  <time datetime="2025-01-05">Jan 5, 2025</time>
                </a>
                <a href="#">
                  <img src="https://picsum.photos/360/203" alt="" class="img-fluid">
                  <h4><a href="#">Tech Innovations Driving AI</a></h4>
                  <time datetime="2025-03-30">Mar 30, 2025</time>
                </a>
              </div>

            </div><!-- End sidebar -->

          </div><!-- End blog sidebar -->

        </div><!-- End row -->

      </div><!-- End container -->

    </section><!-- End Blog Section -->

@endsection

