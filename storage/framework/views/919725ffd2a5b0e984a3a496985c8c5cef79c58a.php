

<?php $__env->startSection('admin'); ?>

<div class="col-lg-12">
<div class="card card-default">
     <h2 style="text-align:center">Create HomeAbout</h2>
     <div class="card-header card-header-border-bottom">
     </div>
     <div class="card-body">
     <form action="<?php echo e(route('store.about')); ?>" method="POST">
          <?php echo csrf_field(); ?>
               <div class="form-group">
          <label for="exampleFormControlInput1">About Title </label>
  <input type="text" name="title" class="form-control" id="exampleFormControlInput1" placeholder="Slider Title">
                    
               </div>
                
               
                
               <div class="form-group">
                    <label for="exampleFormControlTextarea1">Short Description</label>
 <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="short_dis">

 </textarea>
               </div>

               <div class="form-group">
                    <label for="exampleFormControlTextarea1">Long Description</label>
 <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="long_dis">

 </textarea>
               </div>
                



               <div class="form-footer pt-4 pt-5 mt-4 border-top">
                    <button type="submit" class="btn btn-primary btn-default">Submit</button>
                    
               </div>
          </form>
     </div>
</div>
 


<?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/home/create.blade.php ENDPATH**/ ?>