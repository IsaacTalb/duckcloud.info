<?php $__env->startSection('home_content'); ?>

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>About</h2>
          <ol>
            <li><a href="<?php echo e(url('/')); ?>">Home</a></li>
            <li><a href="<?php echo e(url('/about')); ?>">About</a></li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs -->

    <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container">

        <div class="row" data-aos="fade-up">
          <div class="col-lg-12">
            <?php if($about): ?>
                <h3><?php echo e($about->title); ?></h3>
                <p><?php echo e($about->short_dis); ?></p>
                <p><?php echo e($about->long_dis); ?></p>
            <?php else: ?>
                <p>Currently, there is no about us :(</p>
            <?php endif; ?>
          </div>
        </div>

      </div>
    </section><!-- End About Section -->

    <section class="mission-section">
        <div class="container">
          <h2>Our Mission</h2>
          <p>At Duck Cloud, our mission is simple yet profound: to revolutionize the digital landscape with fast, high-quality, and productive solutions. As a team of young enthusiasts, we are constantly exploring new ways to exceed expectations and deliver cutting-edge results.</p>

          <h2>What Sets Us Apart</h2>
          <p>What sets Duck Cloud apart is our unwavering commitment to excellence and our relentless pursuit of innovation. We believe in pushing boundaries, challenging the status quo, and consistently raising the bar for ourselves and our clients.</p>

          <h2>Our Vision</h2>
          <p>Our vision for Duck Cloud extends far beyond conventional service offerings. In the near future, we plan to introduce a range of exciting features, including free educational courses on web development and digital technologies. Additionally, we aim to integrate payment options for those who wish to support our team through platforms like "Buy Me a Coffee" or "Buy Me a Drink."</p>

          <h2>Join the Duck Cloud Community</h2>
          <p>Join us on this exhilarating journey as we transform ideas into reality, empower businesses with digital solutions, and inspire the next generation of tech enthusiasts. Together, let's soar to new heights with Duck Cloud!</p>

          <div class="btn-contact-join">
            <a href="<?php echo e(route('contact')); ?>">Join Now</a>
          </div>
        </div>

    </section>


<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.master_home', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/pages/about.blade.php ENDPATH**/ ?>