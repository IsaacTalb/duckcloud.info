<?php $__env->startSection('admin'); ?>

<div class="py-12">
    <div class="container">
        <h4 style="text-align:center; color:white; margin-bottom:2em;">Admin Message</h4>
        <div class="row">
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

                    <div class="card-header">All Message Data</div>

                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" width="5%">SL</th>
                                <th scope="col" width="15%">Name</th>
                                <th scope="col" width="25%">Email</th>
                                <th scope="col" width="15%">Subject</th>
                                <th scope="col" width="15%">Message</th>
                                <th scope="col" width="25%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php ($i = 1); ?>
                            <?php $__currentLoopData = $messages; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $mess): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <tr>
                                <th scope="row"><?php echo e($i++); ?></th>
                                <td><?php echo e($mess->name); ?></td>
                                <td><?php echo e($mess->email); ?></td>
                                <td><?php echo e($mess->subject); ?></td>
                                <td><?php echo e($mess->message); ?></td>
                                <td>
                                    <!-- Reply Button -->
                                    <button class="btn btn-primary mt-2" data-toggle="modal" data-target="#replyModal-<?php echo e($mess->id); ?>">Reply</button>
                                    <form action="<?php echo e(route('admin.message.delete', $mess->id)); ?>" method="POST" style="display: inline;">
                                        <?php echo csrf_field(); ?>
                                        <?php echo method_field('DELETE'); ?>
                                        <button type="submit" onclick="return confirm('Are you sure to delete?')" class="btn btn-danger mt-2">Delete</button>
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="6">
                                    <div class="mt-3">
                                        <strong>Replies:</strong>
                                        <ul class="list-group">
                                            <?php $__currentLoopData = $mess->replies; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $reply): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                            <li class="list-group-item">
                                                <?php echo $reply->message; ?>

                                                <br><small>Sent at: <?php echo e($reply->created_at); ?></small>
                                            </li>
                                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                        </ul>
                                    </div>
                                </td>
                            </tr>

                            <!-- Reply Modal -->
                            <div class="modal fade" id="replyModal-<?php echo e($mess->id); ?>" tabindex="-1" role="dialog" aria-labelledby="replyModalLabel-<?php echo e($mess->id); ?>" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="replyModalLabel-<?php echo e($mess->id); ?>">Reply to <?php echo e($mess->name); ?></h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form action="<?php echo e(route('admin.message.reply', $mess->id)); ?>" method="POST">
                                                <?php echo csrf_field(); ?>
                                                <textarea name="reply" id="reply-textarea-<?php echo e($mess->id); ?>" class="form-control" rows="5" placeholder="Type your reply here..."></textarea>
                                                <button type="submit" class="btn btn-primary mt-2">Send Reply</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        <?php $__currentLoopData = $messages; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $mess): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            $('#replyModal-<?php echo e($mess->id); ?>').on('shown.bs.modal', function () {
                if (!ClassicEditor.instances['reply-textarea-<?php echo e($mess->id); ?>']) {
                    ClassicEditor
                        .create(document.querySelector('#reply-textarea-<?php echo e($mess->id); ?>'), {
                            toolbar: [
                                'heading', '|',
                                'bold', 'italic', 'underline', '|',
                                'link', '|',
                                'fontColor', 'fontBackgroundColor', '|',
                                'bulletedList', 'numberedList', '|',
                                'blockQuote'
                            ],
                            heading: {
                                options: [
                                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                                ]
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            });
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    });
</script>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.admin_master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/admin/contact/message.blade.php ENDPATH**/ ?>