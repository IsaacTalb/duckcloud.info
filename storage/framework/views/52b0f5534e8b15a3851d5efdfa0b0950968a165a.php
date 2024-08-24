

<?php $__env->startSection('admin'); ?>

<div class="card card-default">
<div class="card-header card-header-border-bottom">
     <h2>User Profile Update</h2>
</div>

<?php if(session('success')): ?>
     <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong><?php echo e(session('success')); ?></strong>  
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
   </div>
   <?php endif; ?>

<div class="card-body">
     <form method="POST" action="<?php echo e(route('update.user.profile')); ?>" class="form-pill">
          <?php echo csrf_field(); ?>

          <div class="form-group">
               <label for="exampleFormControlInput3">User Name</label>
               <input type="text" name="name" class="form-control" value="<?php echo e($user['name']); ?>" > 
          </div>

          <div class="form-group">
               <label for="exampleFormControlInput3">User Email</label>
               <input type="text" name="email" class="form-control" value="<?php echo e($user['email']); ?>" > 
          </div>
 

          <button type="submit" class="btn btn-primary btn-default"> Update</button>
           
     </form>
</div>
									</div>



<?php $__env->stopSection(); ?>
<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/body/update_profile.blade.php ENDPATH**/ ?>