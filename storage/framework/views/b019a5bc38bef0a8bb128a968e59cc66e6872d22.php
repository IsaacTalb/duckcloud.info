<?php $__env->startSection('admin'); ?>
<div class="content">
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Quotations</h3>
            </div>
            <div class="card-body">
                <p>helo</p>
            </div>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>


<?php $__env->startComponent('mail::message'); ?>
# Welcome to Duck-Cloud Service

We would like to express our honor to present our service to our valuable customers. We are pleased to inform you that your quotation request has been received successfully.

Thank you for choosing Duck-Cloud Service.

Thanks,<br>
<?php echo e(config('app.name')); ?> Customer & Service Team
<?php echo $__env->renderComponent(); ?>

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/quotations/reply.blade.php ENDPATH**/ ?>