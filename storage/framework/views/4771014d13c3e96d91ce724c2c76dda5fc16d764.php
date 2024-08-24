<?php $__env->startSection('admin'); ?>
    <div class="py-12">
        <div class="container">
            <h4>Edit Privacy Policy</h4>
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <form action="<?php echo e(url('admin/privacy-policy/update/'.$privacyPolicy->id)); ?>" method="POST" enctype="multipart/form-data">
                                <?php echo csrf_field(); ?>
                                <input type="hidden" name="old_image" value="<?php echo e($privacyPolicy->photo); ?>">
                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input type="text" name="title" class="form-control" value="<?php echo e($privacyPolicy->title); ?>" required>
                                </div>
                                <div class="form-group">
                                    <label for="photo">Photo</label>
                                    <input type="file" name="photo" class="form-control">
                                    <img src="<?php echo e(asset($privacyPolicy->photo)); ?>" style="width: 100px; height: 100px;">
                                </div>
                                <div class="form-group">
                                    <label for="text">Text</label>
                                    <textarea name="text" class="form-control" rows="5" required><?php echo e($privacyPolicy->text); ?></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Update Privacy Policy</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/edit_privacy_policy.blade.php ENDPATH**/ ?>