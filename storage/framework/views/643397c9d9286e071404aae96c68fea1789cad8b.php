<?php $__env->startSection('admin'); ?>
<div class="container">
    <h1>Services</h1>
    <a href="<?php echo e(route('admin.services.create')); ?>" class="btn btn-primary">Add Service</a>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php $__currentLoopData = $services; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $service): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <tr>
                <td><?php echo e($service->id); ?></td>
                <td><?php echo e($service->name); ?></td>
                <td><?php echo e($service->description); ?></td>
                <td>
                    <a href="<?php echo e(route('admin.services.edit', $service->id)); ?>" class="btn btn-warning">Edit</a>
                    <form action="<?php echo e(route('admin.services.destroy', $service->id)); ?>" method="POST" style="display:inline;">
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
<?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/services/index.blade.php ENDPATH**/ ?>