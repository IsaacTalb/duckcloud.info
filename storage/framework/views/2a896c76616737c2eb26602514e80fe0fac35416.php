<!-- resources/views/admin/subscribers/index.blade.php -->



<?php $__env->startSection('admin'); ?>
<div class="content-wrapper" style="background-color: #333637ab;">
    <div class="content">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Newsletter Subscribers</h3>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subscription Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $__currentLoopData = $subscribers; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $subscriber): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <tr>
                            <td><?php echo e($subscriber->id); ?></td>
                            <td><?php echo e($subscriber->name); ?></td>
                            <td><?php echo e($subscriber->email); ?></td>
                            <td><?php echo e($subscriber->created_at); ?></td>
                        </tr>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/subscribers/index.blade.php ENDPATH**/ ?>