<?php $__env->startSection('admin'); ?>

    <div class="py-12">
   <div class="container">
     <h4 style="text-align:center; color:white; margin-bottom:2em;">Home — Slider Section </h4>
    <div class="row">
    <a href="<?php echo e(route('add.slider')); ?>"> <button class="btn btn-info">Add Slider</button>  </a>
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


          <div class="card-header"> All Slider </div>


    <table class="table">
  <thead>
    <tr>
      <th scope="col" width="5%">SL </th>
      <th scope="col" width="15%">Slider Title</th>
      <th scope="col" width="25%">Description</th>
      <th scope="col" width="15%">Image</th>
      <th scope="col" width="15%">Action</th>
    </tr>
  </thead>
  <tbody>
          <?php ($i = 1); ?>
        <?php $__currentLoopData = $sliders; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $slider): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <tr>
      <th scope="row"> <?php echo e($i++); ?> </th>
      <td> <?php echo e($slider->title); ?> </td>
      <td> <?php echo e($slider->description); ?> </td>
      <td> <img src="<?php echo e(asset($slider->image)); ?>" style="height:40px; width:70px;" > </td>

       <td>
       <a href="<?php echo e(url('slider/edit/'.$slider->id)); ?>" class="btn btn-info">Edit</a>
       <a href="<?php echo e(url('slider/delete/'.$slider->id)); ?>" onclick="return confirm('Are you sure to delete')" class="btn btn-danger">Delete</a>
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

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\duckcloud.info\resources\views/admin/slider/index.blade.php ENDPATH**/ ?>