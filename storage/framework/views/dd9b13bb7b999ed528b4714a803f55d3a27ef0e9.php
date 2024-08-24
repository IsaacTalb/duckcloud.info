

<?php $__env->startSection('admin'); ?>


    <?php if(session('success')): ?>
     <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong><?php echo e(session('success')); ?></strong>  
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
   </div>
   <?php endif; ?>

    <div class="py-12"> 
   <div class="container">
    <div class="row">

 


    <div class="col-md-8">
     <div class="card">
          <div class="card-header"> Edit Brand </div>
          <div class="card-body">
          
         
         
     <form action="<?php echo e(url('brand/update/'.$brands->id)); ?>" method="POST" enctype="multipart/form-data">
          <?php echo csrf_field(); ?> 
   <input type="hidden" name="old_image" value="<?php echo e($brands->brand_image); ?>">
  <div class="form-group">
    <label for="exampleInputEmail1">Update Brand Name</label>
    <input type="text" name="brand_name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="<?php echo e($brands->brand_name); ?>">

          <?php $__errorArgs = ['brand_name'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
               <span class="text-danger"> <?php echo e($message); ?></span>
          <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>

  </div>


  <div class="form-group">
    <label for="exampleInputEmail1">Update Brand Image</label>
    <input type="file" name="brand_image" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="<?php echo e($brands->brand_image); ?>">

          <?php $__errorArgs = ['brand_image'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
               <span class="text-danger"> <?php echo e($message); ?></span>
          <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>

  </div>


     <div class="form-group">
     <img src="<?php echo e(asset($brands->brand_image)); ?>" style="width:400px; height:200px;" >

     </div>


     
  <button type="submit" class="btn btn-primary">Update Brand</button>
</form>

       </div>

    </div>
  </div> 
 


    </div>
  </div> 

    </div>
    
    <?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/brand/edit.blade.php ENDPATH**/ ?>