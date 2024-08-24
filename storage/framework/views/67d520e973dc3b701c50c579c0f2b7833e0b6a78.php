<!DOCTYPE html>
<html lang="en">
<head>
  <head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>Duck Cloud: Admin Panel</title>

  <!-- GOOGLE FONTS -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500|Poppins:400,500,600,700|Roboto:400,500" rel="stylesheet"/>
  <link href="https://cdn.materialdesignicons.com/3.0.39/css/materialdesignicons.min.css" rel="stylesheet" />

  <!-- PLUGINS CSS STYLE -->

  <link href="<?php echo e(asset('backend/assets/plugins/toaster/toastr.min.css')); ?>" rel="stylesheet" />
  <link href="<?php echo e(asset('backend/assets/plugins/nprogress/nprogress.css')); ?>" rel="stylesheet" />
  <link href="<?php echo e(asset('backend/assets/plugins/flag-icons/css/flag-icon.min.css')); ?>" rel="stylesheet"/>
  <link href="<?php echo e(asset('backend/assets/plugins/jvectormap/jquery-jvectormap-2.0.3.css')); ?>" rel="stylesheet" />
  <link href="<?php echo e(asset('backend/assets/plugins/ladda/ladda.min.css')); ?>" rel="stylesheet" />
  <link href="<?php echo e(asset('backend/assets/plugins/select2/css/select2.min.css')); ?>" rel="stylesheet" />
  <link href="<?php echo e(asset('backend/assets/plugins/daterangepicker/daterangepicker.css')); ?>" rel="stylesheet" />

  <!-- SLEEK CSS -->
  <link id="sleek-css" rel="stylesheet" href="<?php echo e(asset('backend/assets/css/sleek.css')); ?>" />



  <!-- FAVICON -->
  <link rel="icon" href="<?php echo e(asset('frontend/assets/img/dc_logo.png')); ?>" sizes="32x32" type="image/png">

  <!--
    HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries
  -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  <script src="<?php echo e(asset('backend/assets/plugins/nprogress/nprogress.js')); ?>"></script>
</head>

</head>
  <body class="bg-light-gray" id="body">
      <div class="container d-flex flex-column justify-content-between vh-100">
      <div class="row justify-content-center mt-5">
        <div class="col-xl-5 col-lg-6 col-md-10">
          <div class="card">
            <div class="card-header bg-primary">
              <div class="app-brand">
                <a href="<?php echo e(url('/login')); ?>">
                  <img src="<?php echo e(asset('frontend/assets/img/dc_logo.png')); ?>" alt="DC-logo">
                  <span class="brand-name">DC-Dashboard</span>
                </a>
              </div>
            </div>


            <?php if(session('success')): ?>
     <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong><?php echo e(session('success')); ?></strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
   </div>
   <?php endif; ?>
            <div class="card-body p-5">

              <h4 class="text-dark mb-5">Sign In</h4>
              <form method="POST" action="<?php echo e(route('login')); ?>">
               <?php echo csrf_field(); ?>
                <div class="row">
                  <div class="form-group col-md-12 mb-4">
                    <input type="email" name="email" class="form-control input-lg"   aria-describedby="emailHelp" placeholder="Email">
                  </div>
                  <div class="form-group col-md-12 ">
                    <input type="password" class="form-control input-lg" name="password"  placeholder="Password">
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex my-2 justify-content-between">
                      <div class="d-inline-block mr-3">
                        <label class="control control-checkbox">Remember me
                          <input type="checkbox" />
                          <div class="control-indicator"></div>
                        </label>

                      </div>
     <p><a class="text-blue" href="<?php echo e(route('password.request')); ?>" style="color: rgb(165, 207, 221);">Forgot Your Password?</a></p>
                    </div>
                    <button type="submit" class="btn btn-lg btn-primary btn-block mb-4">Sign In</button>
                    

                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright pl-0">
        <p class="text-center">&copy; 2024 Copyright || Inspired by
          <a class="text-primary" href="https://github.com/Duck-Cloud-Info" target="_blank">DC</a>.
        </p>
      </div>
    </div>
</body>
</html>
<?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/auth/login.blade.php ENDPATH**/ ?>