
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
              <strong>Phone:</strong> +1 5589 55488 55<br>
              <strong>Email:</strong> &nbsp; <a href="mailto:admin@duckcloud.info" style="color: rgb(1, 229, 246);" target="_blank">admin@duckcloud.info</a><br>
            </p>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="{{ url('/home') }}">Home</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">About us</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Services</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="">Web Design</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="">Web Development</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="">Product Management</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="">Marketing</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="">Graphic Design</a></li>
            </ul>
          </div>

            <div class="col-lg-4 col-md-6 footer-newsletter">
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
                document.getElementById('subscribe-form').addEventListener('submit', function(event) {
                    event.preventDefault();

                    // Create a FormData object to send the form data
                    let formData = new FormData(this);

                    fetch(this.action, {
                        method: this.method,
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value
                        },
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Show SweetAlert success message
                            Swal.fire({
                                title: 'Thank You!',
                                text: 'You have successfully subscribed to our newsletter.',
                                icon: 'success'
                            });
                        } else {
                            // Handle validation errors or other issues
                            Swal.fire({
                                title: 'Error!',
                                text: 'There was a problem with your subscription. Please try again.',
                                icon: 'error'
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was a problem with your subscription. Please try again.',
                            icon: 'error'
                        });
                    });
                });
            </script>

        </div>
      </div>
    </div>

    <div class="container d-md-flex py-4">

      <div class="mr-md-auto text-center text-md-left">
        <div class="copyright">
          &copy; Copyright <strong><span>Company</span></strong>. All Rights Reserved
        </div>
        <div class="credits">
          <!-- All the links in the footer should remain intact. -->
          <!-- You can delete the links only if you purchased the pro version. -->
          <!-- Licensing information: https://bootstrapmade.com/license/ -->
          <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/company-free-html-bootstrap-template/ -->
          Developed by <a href="https://github.com/Duck-Cloud-Info">Duck_Cloud Team Members</a> in Laravel 8.1.5
        </div>
      </div>
      <div class="social-links text-center text-md-right pt-3 pt-md-0">
        <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
        <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
      </div>
    </div>
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>



