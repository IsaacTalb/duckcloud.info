

<?php $__env->startSection('admin'); ?>

<div class="card card-default">
<div class="card-header card-header-border-bottom">
     <h2>Change Password</h2>
</div>
<div class="card-body">
     <form method="POST" action="<?php echo e(route('password.update')); ?>" class="form-pill">
          <?php echo csrf_field(); ?>

          <div class="form-group">
               <label for="exampleFormControlInput3">Current Password</label>
               <input type="password" name="oldpassword" class="form-control" id="current_password" placeholder="Current Password">

               <?php $__errorArgs = ['oldpassword'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
               <span class="text-danger"><?php echo e($message); ?> </span>
               <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
          </div>

          <div class="form-group">
         <label for="exampleFormControlPassword3">New Password</label>
               <input type="password" name="password" class="form-control" id="password" placeholder="New Password">

               <?php $__errorArgs = ['password'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
               <span class="text-danger"><?php echo e($message); ?> </span>
               <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
          </div>

          <div class="form-group">
               <label for="exampleFormControlPassword3">Confirm Password</label>
               <input type="password" name="password_confirmation" class="form-control" id="password_confirmation" placeholder="Confirm Password">

               <?php $__errorArgs = ['password_confirmation'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
               <span class="text-danger"><?php echo e($message); ?> </span>
               <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
          </div>

          <button type="submit" class="btn btn-primary btn-default"> Save</button>
           
     </form>
</div>
									</div>



<?php $__env->stopSection(); ?>
<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/body/change_password.blade.php ENDPATH**/ ?>