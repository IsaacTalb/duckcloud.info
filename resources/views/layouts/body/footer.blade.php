
  <!-- ======= Footer ======= -->
  <footer id="footer">

    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6 footer-contact">
            <h2>Duck-Cloud</h2>
            <p>
                Preah Ang Duong St. (110)<br>
                Phnom Penh<br>
                Cambodia <br><br>
              <strong>Phone:</strong> +855 70 578 104<br>
              <strong>Email:</strong> &nbsp; <a href="mailto:admin@duckcloud.info" style="color: rgb(1, 229, 246);" target="_blank">admin@duckcloud.info</a><br>
            </p>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('home') }}">Home</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('about') }}">About us</a></li>
              {{-- <li><i class="bx bx-chevron-right"></i> <a href="#">Services</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li> --}}
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('privacy-policy')}}">Privacy policy</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('portfolio') }}">Web Design</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('portfolio') }}">Web Development</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('portfolio') }}">Product Management</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('portfolio') }}">Android/IOS Development</a></li>
            </ul>
          </div>

          <div class="col-lg-4 col-md-6 footer-links">
            <h4>Our Digital Product</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('portfolio') }}">Online Menu Orders</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ route('portfolio') }}">Software Applications</a></li>
            </ul>
          </div>

            <div class="col-lg-5 col-md-6 footer-newsletter">
                <h4>Join Our Newsletter</h4>
                <p>For our recent updates & opportunities you can subscribe us by filling your name and mail address!</p>
                <form action="{{ route('subscribe') }}" method="post">
                    @csrf
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="email" placeholder="Your Email" required>
                    <input type="submit" value="Subscribe">
                </form>
            </div>

            <!-- Include SweetAlert2 CSS -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

            <!-- Include SweetAlert2 JS -->
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

            <script>

            </script>

            {{-- need to fix the dialogue box --}}

        </div>
      </div>
    </div>

    <div class="container d-md-flex py-4">

      <div class="mr-md-auto text-center text-md-left">
        <div class="copyright">
          2024 // All Rights Reserved &copy; <strong><span>Duck-Cloud</span></strong>.
        </div>
        <div class="credits">
          <!-- All the links in the footer should remain intact. -->
          <!-- You can delete the links only if you purchased the pro version. -->
          <!-- Licensing information: https://bootstrapmade.com/license/ -->
          <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/company-free-html-bootstrap-template/ -->
          Developed by <a href="https://github.com/Duck-Cloud-Info" style="color:rgb(20, 200, 206)">DC Team Members</a>
        </div>
      </div>
      <div class="social-links text-center text-md-right pt-3 pt-md-0">
        <a href="https://x.com/2am_tech" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a href="https://www.facebook.com/duckcloudglobal" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="https://github.com/Duck-Cloud-Info" class="github"><i class="bx bxl-github"></i></a>
      </div>
    </div>
  </footer><!-- End Footer -->

  <a href="" class="back-to-top" style="border-radius: 50%;"><i class="icofont-simple-up"></i></a>



