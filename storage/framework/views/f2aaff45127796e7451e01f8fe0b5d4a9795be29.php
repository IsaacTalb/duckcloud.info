<?php $__env->startSection('admin'); ?>

<div class="py-12">
    <div class="container">
        <h4 style="text-align:center">Contact Page</h4>
        <div class="row">
            <a href="<?php echo e(route('add.contact')); ?>">
                <button class="btn btn-info">Add Contact</button>
            </a>
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

                    <div class="card-header"> All Contact Data </div>

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" width="5%">SL</th>
                                <th scope="col" width="15%">Contact Address</th>
                                <th scope="col" width="25%">Contact Email</th>
                                <th scope="col" width="15%">Contact Phone</th>
                                <th scope="col" width="15%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php ($i = 1); ?>
                            <?php $__currentLoopData = $contacts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $con): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <tr>
                                    <th scope="row"> <?php echo e($i++); ?> </th>
                                    <td> <?php echo e($con->address); ?> </td>
                                    <td> <?php echo e($con->email); ?> </td>
                                    <td> <?php echo e($con->phone); ?> </td>
                                    <td>
                                        <a href="<?php echo e(route('contact.edit', $con->id)); ?>" class="btn btn-info">Edit</a>
                                        
                                        <a href="<?php echo e(route('contact.delete', $con->id)); ?>" onclick="return confirm('Are you sure to delete?')" class="btn btn-danger">Delete</a>
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

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/contact/index.blade.php ENDPATH**/ ?>