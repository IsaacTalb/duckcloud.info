<?php $__env->startSection('admin'); ?>

    <div class="py-12">
   <div class="container">
     <h4 style="text-align:center; color:white; margin-bottom:2em;">Home — About Section </h4>
    <div class="row">

    <a href="<?php echo e(route('add.about')); ?>"> <button class="btn btn-info">Add About</button>  </a>
<br><br>


    <div class="col-md-12">
     <div class="card">


     <?php if(session('success')): ?>
     <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong><?php echo e(session('success')); ?></strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
   </div>
   <?php endif; ?>


          <div class="card-header"> All About Data </div>


    <table class="table">
  <thead>
    <tr>
      <th scope="col" width="5%">SL </th>
      <th scope="col" width="15%">Home Title</th>
      <th scope="col" width="25%">Short Description</th>
      <th scope="col" width="15%">Long Description</th>
      <th scope="col" width="15%">Action</th>
    </tr>
  </thead>
  <tbody>
          <?php ($i = 1); ?>
        <?php $__currentLoopData = $homeabout; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $about): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <tr>
      <th scope="row"> <?php echo e($i++); ?> </th>
      <td> <?php echo e($about->title); ?> </td>
      <td> <?php echo e($about->short_dis); ?> </td>
      <td> <?php echo e($about->long_dis); ?> </td>

       <td>
       <a href="<?php echo e(url('about/edit/'.$about->id)); ?>" class="btn btn-info">Edit</a>
       <a href="<?php echo e(url('about/delete/'.$about->id)); ?>" onclick="return confirm('Are you sure to delete')" class="btn btn-danger">Delete</a>
        </td>


    </tr>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>


  </tbody>
</table>


       </div>
    </div>




    </div>
  </div>




    </div>
 <?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/home/index.blade.php ENDPATH**/ ?>