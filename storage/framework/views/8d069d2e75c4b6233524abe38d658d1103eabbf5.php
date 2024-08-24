<?php $__env->startPush('style'); ?>
<style>
    .service-whole-section {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
    }
    .whole-main-plan {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 20px;
    }

    .whole-main-plan section {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        flex: 1 1 300px;
        margin: 10px;
        max-width: 320px;
        padding: 20px;
    }

    .whole-main-plan h2 {
        color: #333;
        font-size: 1.5em;
        margin-bottom: 10px;
    }

    .whole-main-plan ul {
        list-style-type: none;
        padding: 0;
    }

    .whole-main-plan ul li {
        background: url('checkmark.png') no-repeat left center;
        background-size: 20px;
        padding-left: 30px;
        margin-bottom: 10px;
        font-size: 1em;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        .whole-main-plan section {
            flex: 1 1 100%;
            max-width: 100%;
        }
    }

    /* Form and download plan sections */
    .quotation-form-section {
        padding: 20px;
        max-width: 600px;
        margin: 50px auto;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .quotation-form-section form {
        display: flex;
        flex-direction: column;
    }

    .quotation-form-section form label,
    .quotation-form-section form input {
        margin-bottom: 10px;
    }

    .quotation-form-section form input[type="text"],
    .quotation-form-section form input[type="email"],
    .quotation-form-section form input[type="number"] {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .quotation-form-section form input[type="button"] {
        padding: 10px;
        background-color: #28a745;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .quotation-form-section form input[type="button"]:hover {
        background-color: #218838;
    }

    .quotation-form-section form input[type="radio"] {
        margin-right: 5px;
    }

    .quotation-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.3s;
        z-index: 1000;
    }

    .quotation-popup.show {
        visibility: visible;
        opacity: 1;
    }

    .quotation-popup-content {
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 800px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: relative;
        max-height: 70%;
        overflow-y: auto;
    }

    .quotation-popup-content h3 {
        margin-top: 0;
    }

    .quotation-popup-content button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px;
        border-radius: 4px;
        cursor: pointer;
    }

    .quotation-popup-content button:hover {
        background-color: #0056b3;
    }

    .close-popup {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #333;
    }

    .quotation-popup-content .close-popup {
        background-color: rgb(215, 228, 228);
        color: black;
        width: 2em;
        /* height: 2em; */
    }

    .quotation-popup-content .close-popup:hover {
        background-color: rgb(24, 116, 137);
        color: rgb(255, 251, 251);
        width: 2em;
        /* height: 2em; */
    }

    .blurred-background {
        opacity: 0.1;
    }
</style>
<?php $__env->stopPush(); ?>

<?php $__env->startSection('home_content'); ?>
<section id="breadcrumbs" class="breadcrumbs">
    <div class="container">
        <div class="d-flex justify-content-between align-items-center">
            <h2>Service</h2>
            <ol>
                <li><a href="<?php echo e(route('home')); ?>">Home</a></li>
                <li>Service</li>
            </ol>
        </div>
    </div>
</section>

<section class="service-whole-section">
    <?php $__currentLoopData = $services; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $service): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <main class="whole-main-plan">
        <section>
            <h2><?php echo e($service->name); ?></h2>
            <p><?php echo e($service->description); ?></p>
            <?php $__currentLoopData = $service->plans; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $plan): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <section class="<?php echo e(strtolower($plan->name)); ?>-plan">
                <h2><?php echo e($plan->name); ?> Plan</h2>
                <p><?php echo e($plan->description); ?></p>
                <ul>
                    <?php $__currentLoopData = $plan->features; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $feature): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <li><?php echo e($feature->name); ?></li>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </ul>
            </section>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </section>
    </main>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

    <section class="quotation-form-section">
        <form id="QuotationForm" method="POST" action="<?php echo e(route('quotation.generate')); ?>">
            <?php echo csrf_field(); ?>
            <label for="name">Customer Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Customer Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="phoneNumber">Contact Number:</label>
            <input type="number" id="phoneNumber" name="phoneNumber">
            <label for="plan">Plan:</label>
            <?php $__currentLoopData = $services; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $service): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php $__currentLoopData = $service->plans; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $plan): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <label><input type="radio" name="plan" value="<?php echo e($plan->id); ?>" required> <?php echo e($plan->name); ?> Plan</label>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            <input type="submit" value="Generate Quotation">
        </form>
    </section>
</section>

<!-- Quotation Popup -->
<div id="quotationPopup" class="quotation-popup">
    <div class="quotation-popup-content">
        <button class="close-popup" onclick="closePopup()">×</button>
        <div id="quotationResult"></div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('scripts'); ?>
<script>
    function generateQuotationForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const plan = document.querySelector('input[name="plan"]:checked');

        if (!name || !email || !phoneNumber || !plan) {
            alert('Please fill in all fields before generating the quotation.');
            return;
        }

        const selectedPlan = plan.value;
        let cost;
        let features;

        switch (selectedPlan) {
            case 'Foundation':
                cost = 29;
                features = `
                    <ul>
                        <li>Custom Domain: Free custom domain for one year.</li>
                        <li>Website Builder: Easy-to-use drag-and-drop website builder.</li>
                        <li>Hosting: Reliable web hosting with 99.9% uptime.</li>
                        <li>Templates: Access to a variety of professional templates.</li>
                        <li>SSL Certificate: Free SSL certificate for secure connections.</li>
                        <li>Support: Email support with a 24-hour response time.</li>
                        <li>Storage: 10 GB of storage space.</li>
                        <li>Bandwidth: 50 GB of monthly bandwidth.</li>
                    </ul>
                `;
                break;
            case 'Standard':
                cost = 59;
                features = `
                    <ul>
                        <li>Everything in Foundation Plan, plus:</li>
                        <li>Advanced Customization: More customization options for your website.</li>
                        <li>SEO Tools: Basic SEO tools to improve your website's visibility.</li>
                        <li>E-commerce: Integrated e-commerce functionality with up to 50 products.</li>
                        <li>Marketing Tools: Email marketing tools and social media integration.</li>
                        <li>Support: Priority email support with a 12-hour response time.</li>
                        <li>Storage: 50 GB of storage space.</li>
                        <li>Bandwidth: 200 GB of monthly bandwidth.</li>
                    </ul>
                `;
                break;
            case 'Advanced':
                cost = 99;
                features = `
                    <ul>
                        <li>Everything in Standard Plan, plus:</li>
                        <li>Full Customization: Complete access to HTML/CSS for full customization.</li>
                        <li>Advanced SEO: Advanced SEO tools and analytics.</li>
                        <li>Enhanced E-commerce: Unlimited product listings and advanced e-commerce features.</li>
                        <li>Advanced Performance Analytics: Detailed website performance analytics.</li>
                        <li>Premium Support: 24/7 phone and chat support.</li>
                        <li>Storage: Unlimited storage space.</li>
                        <li>Bandwidth: Unlimited monthly bandwidth.</li>
                        <li>Security: Advanced security features and daily backups.</li>
                        <li>API Access: Access to APIs for integrating third-party services and creating custom functionalities.</li>
                        <li>Team Collaboration: Tools for team collaboration, including user roles and permissions.</li>
                    </ul>
                `;
                break;
        }

        const result = `
            <h3>Quotation - ${selectedPlan} Plan</h3>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Customer Email:</strong> ${email}</p>
            <p><strong>Contact Number:</strong> ${phoneNumber}</p>
            <p><strong>Plan Cost:</strong> $${cost}/month</p>
            <p><strong>Features:</strong></p>
            ${features}
            <p>Thank you for choosing Duck Cloud for your web service needs!</p>
        `;

        document.getElementById('quotationResult').innerHTML = result;
        const popup = document.getElementById('quotationPopup');
        popup.classList.add('show');

        document.querySelector('header').classList.add('blurred-background');
        document.querySelector('footer').classList.add('blurred-background');
    }

    function closePopup() {
        const popup = document.getElementById('quotationPopup');
        popup.classList.remove('show');

        document.querySelector('header').classList.remove('blurred-background');
        document.querySelector('footer').classList.remove('blurred-background');
    }
</script>
<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.master_home', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/services/index.blade.php ENDPATH**/ ?>