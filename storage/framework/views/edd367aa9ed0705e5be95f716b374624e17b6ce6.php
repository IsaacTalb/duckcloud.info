<?php $__env->startSection('admin'); ?>
<div class="content">
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Quotations</h3>
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Plan</th>
                            <th>Created At</th>
                            <th>Actions</th> <!-- Add a new column for actions -->
                        </tr>
                    </thead>
                    <tbody>
                        <?php $__currentLoopData = $quotations; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $quotation): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <tr>
                                <td><?php echo e($quotation->company); ?></td>
                                <td><?php echo e($quotation->name); ?></td>
                                <td><?php echo e($quotation->email); ?></td>
                                <td><?php echo e($quotation->phone_number); ?></td>
                                <td><?php echo e($quotation->plan); ?></td>
                                <td><?php echo e($quotation->created_at); ?></td>
                                <td>
                                    <!-- Reply Button -->
                                    <a href="<?php echo e(route('admin.reply', $quotation->id)); ?>" class="btn btn-primary">Check Status</a>
                                    <!-- Delete Button -->
                                    <form action="<?php echo e(route('admin.delete', $quotation->id)); ?>" method="POST">
                                        <?php echo csrf_field(); ?>
                                        <?php echo method_field('DELETE'); ?>
                                        <button type="submit" class="btn btn-danger">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\duckcloud.info\resources\views/admin/quotations/index.blade.php ENDPATH**/ ?>