

<?php $__env->startSection('admin'); ?>

<div class="col-lg-12">
<div class="card card-default">
     <div class="card-header card-header-border-bottom">
          <h2>Create Contact</h2>
     </div>
     <div class="card-body">
     <form action="<?php echo e(route('store.contact')); ?>" method="POST">
          <?php echo csrf_field(); ?>
               <div class="form-group">
          <label for="exampleFormControlInput1">Contact Email </label>
  <input type="email" name="email" class="form-control" id="exampleFormControlInput1" placeholder="Contact Email">
                    
               </div>

               <div class="form-group">
          <label for="exampleFormControlInput1">Contact Phone </label>
  <input type="text" name="phone" class="form-control" id="exampleFormControlInput1" placeholder="Contact Phone">
                    
               </div>
                
               
                
               <div class="form-group">
                    <label for="exampleFormControlTextarea1">Contact Adress</label>
 <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="address">

 </textarea>
               </div>

                 

               <div class="form-footer pt-4 pt-5 mt-4 border-top">
                    <button type="submit" class="btn btn-primary btn-default">Submit</button>
                    
               </div>
          </form>
     </div>
</div>
 


<?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/contact/create.blade.php ENDPATH**/ ?>