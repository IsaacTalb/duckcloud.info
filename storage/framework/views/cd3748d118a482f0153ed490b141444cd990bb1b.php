<!DOCTYPE html>
<html lang="en" dir="ltr">

    <head>

    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta name="viewport" content="width=devico-width, initial-scale=1" />
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
  <!-- Title of the page -->
  <title>Duck Cloud</title>
  <!-- Meta description for the page -->
  <meta name="description" content="What sets Duck Cloud apart is our unwavering commitment to excellence and our relentless pursuit of innovation. We believe in pushing boundaries, challenging the status quo, and consistently raising the bar for ourselves and our clients.">

  <!--Google Adsense-->
  <meta name="google-adsense-account" content="ca-pub-6435342919777395">

  <!-- Favicon for the website -->
  <link rel="icon" href="<?php echo e(asset('frontend/assets/img/favicon.ico')); ?>" type="image/x-icon">
  <link rel="icon" href="<?php echo e(asset('favicon.ico')); ?>" type="image/x-icon">
  <lik rel="image" href="<?php echo e(asset('frontend/assets/img/dc_logo.png')); ?>" type="image/PNG">
  <!-- Additional favicons for other devices and sizes -->
  <link rel="icon" href="<?php echo e(asset('frontend/assets/img/favicon.ico')); ?>" sizes="16x16" type="image/x-icon">
  <link rel="apple-touch-icon" href="<?php echo e(asset('frontend/assets/img/favicon.ico')); ?>">
  <link rel="apple-touch-icon" sizes="76x76" href="<?php echo e(asset('frontend/assets/img/favicon.ico')); ?>">
  <link rel="apple-touch-icon" sizes="120x120" href="<?php echo e(asset('frontend/assets/img/favicon.ico')); ?>">
  <link rel="apple-touch-icon" sizes="152x152" href="<?php echo e(asset('frontend/assets/img/favicon.ico')); ?>">
  <!-- Open Graph Meta Tags for better sharing on social media -->
  <meta property="og:title" content="Duck Cloud">
  <meta property="og:description" content="What sets Duck Cloud apart is our unwavering commitment to excellence and our relentless pursuit of innovation. We believe in pushing boundaries, challenging the status quo, and consistently raising the bar for ourselves and our clients.">
  <meta property="og:image" content="<?php echo e(asset('frontend/assets/img/favicon.ico')); ?>">
  <meta property="og:url" content="https://duckcloud.info/">
  <meta name="twitter:card" content="summary_large_image">
   <!-- SweetAlert CSS -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
   <!-- SweetAlert JS -->
   <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="<?php echo e(asset('frontend/assets/vendor/bootstrap/css/bootstrap.min.css')); ?>" rel="stylesheet">
  <link href="<?php echo e(asset('frontend/assets/vendor/icofont/icofont.min.css')); ?>" rel="stylesheet">
  <link href="<?php echo e(asset('frontend/assets/vendor/boxicons/css/boxicons.min.css')); ?>" rel="stylesheet">
  <link href="<?php echo e(asset('frontend/assets/vendor/animate.css/animate.min.css')); ?>" rel="stylesheet">
  <link href="<?php echo e(asset('frontend/assets/vendor/venobox/venobox.css')); ?>" rel="stylesheet">
  <link href="<?php echo e(asset('frontend/assets/vendor/owl.carousel/assets/owl.carousel.min.css')); ?>" rel="stylesheet">
  <link href="<?php echo e(asset('frontend/assets/vendor/aos/aos.css')); ?>" rel="stylesheet">
  <link href="<?php echo e(asset('frontend/assets/vendor/remixicon/remixicon.css')); ?>" rel="stylesheet">

  <!-- Main CSS File -->
  <link href="<?php echo e(asset('frontend/assets/css/style.css')); ?>" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

  <style>
    body {
      -webkit-touch-callout: none; /* Disable long press on mobile */
      -webkit-user-select: none; /* Disable text selection */
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  </style>
  <?php echo $__env->yieldPushContent('style'); ?>
</head>

<body>

  <?php echo $__env->make('layouts.body.header', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>



  <main id="main">

  <?php echo $__env->yieldContent('home_content'); ?>

  </main><!-- End #main -->

  <?php echo $__env->make('layouts.body.footer', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>


  <!-- Vendor JS Files -->
  <script src="<?php echo e(asset('frontend/assets/vendor/jquery/jquery.min.js')); ?>"></script>
  <script src="<?php echo e(asset('frontend/assets/vendor/bootstrap/js/bootstrap.bundle.min.js')); ?>"></script>
  <script src="<?php echo e(asset('frontend/assets/vendor/jquery.easing/jquery.easing.min.js')); ?>"></script>
  <script src="<?php echo e(asset('frontend/assets/vendor/php-email-form/validate.js')); ?>"></script>
  <script src="<?php echo e(asset('frontend/assets/vendor/jquery-sticky/jquery.sticky.js')); ?>"></script>
  <script src="<?php echo e(asset('frontend/assets/vendor/isotope-layout/isotope.pkgd.min.js')); ?>"></script>
  <script src="<?php echo e(asset('frontend/assets/vendor/venobox/venobox.min.js')); ?>"></script>
  <script src="<?php echo e(asset('frontend/assets/vendor/waypoints/jquery.waypoints.min.js')); ?>"></script>
  <script src="<?php echo e(asset('frontend/assets/vendor/owl.carousel/owl.carousel.min.js')); ?>"></script>
  <script src="<?php echo e(asset('frontend/assets/vendor/aos/aos.js')); ?>"></script>

  <!-- Main JS File -->
  <script src="<?php echo e(asset('frontend/assets/js/main.js')); ?>"></script>


  <?php echo $__env->yieldContent('scripts'); ?>
  
  <script>
    // Detect right-click event
    document.addEventListener('contextmenu', function(event) {
      event.preventDefault(); // Prevent default behavior
      alert("Right-clicking is disabled on this website.");
    });
    // Detect keyboard shortcut for inspecting elements (Ctrl+Shift+I or F12)
    document.onkeydown = function(e) {
      if (e.ctrlKey && (e.shiftKey && e.keyCode === 73)) { // Ctrl+Shift+I
        alert("Inspecting is disabled on this website.");
        return false;
      }
      if (e.keyCode === 123) { // F12
        alert("Inspecting is disabled on this website.");
        return false;
      }
    };

    // Prevent right-click context menu
    document.addEventListener('contextmenu', function(event) {
      // Check if the clicked element is not a button or a link
      if (!event.target.matches('button, a')) {
        event.preventDefault(); // Prevent default behavior
      }
    });

    // function for the notify of newsletters

    document.getElementById('subscribe-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Disable the submit button to prevent multiple submissions
        let submitButton = this.querySelector('input[type="submit"]');
        submitButton.disabled = true;

        // Create a FormData object to send the form data
        let formData = new FormData(this);

        fetch(this.action, {
            method: this.method,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('input[name="_token"]').value,
                'Accept': 'application/json' // Ensure JSON response is expected
            },
            body: formData
        })
        .then(response => {
            return response.json().then(data => ({
                status: response.status,
                body: data
            }));
        })
        .then(({ status, body }) => {
            submitButton.disabled = false; // Re-enable the submit button

            if (status === 200 && body.success) {
                // Show SweetAlert success message
                Swal.fire({
                    title: 'Thank You!',
                    text: body.message || 'You have successfully subscribed to our newsletter.',
                    icon: 'success'
                });
            } else {
                // Handle validation errors or other issues
                Swal.fire({
                    title: 'Error!',
                    text: body.message || 'There was a problem with your subscription. Please try again.',
                    icon: 'error'
                });
            }
        })
        .catch(error => {
            submitButton.disabled = false; // Re-enable the submit button

            if (error.body && error.body.errors) {
                // Display validation errors
                let errorMessages = Object.values(error.body.errors).flat().join('\n');
                Swal.fire({
                    title: 'Validation Error!',
                    text: errorMessages,
                    icon: 'error'
                });
            } else {
                // Handle fetch or other errors
                Swal.fire({
                    title: 'Error!',
                    text: 'There was a problem with your subscription. Please try again.',
                    icon: 'error'
                });
            }
        });
    });

  </script>
</body>

</html>
<?php /**PATH D:\Duck_Cloud_Folders\duckcloud.info\resources\views/layouts/master_home.blade.php ENDPATH**/ ?>