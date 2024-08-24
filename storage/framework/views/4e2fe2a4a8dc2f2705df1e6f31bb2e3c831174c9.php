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

    .whole-main-plan h4 {
        color: #333;
        font-size: 1.5em;
        text-align: center;
        background-color: rgba(12, 127, 156, 0.141);
        border-radius: 6px;
        margin:0 2em 1rem 2em;
        padding: 1rem 0 1rem 0;
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
        margin-bottom: 4px;
        color: #0D5F85;
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
        background-color: rgb(219, 240, 237);
        color: black;
        width: 2em;
    }

    .quotation-popup-content .close-popup:hover {
        background-color: rgb(24, 116, 137);
        color: rgb(255, 251, 251);
        width: 2em;
    }

    .blurred-background {
        opacity: 0.5;
    }

    /* form styles */
    .quotation-form-section{
    width: fit-content;
    height: fit-content;
    background: #FFFFFF;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 26px;
    max-width: 450px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 16px;
  }

  .separator {
    width: calc(100% - 20px);
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 10px;
    color: #8B8E98;
    margin: 0 10px;
  }

  .separator > p {
    word-break: keep-all;
    display: block;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    margin: auto;
  }

  .separator .line {
    display: inline-block;
    width: 100%;
    height: 1px;
    border: 0;
    background-color: #e8e8e8;
    margin: auto;
  }

  .credit-card-info--form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .input_container {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .split {
    display: grid;
    grid-template-columns: 4fr 2fr;
    gap: 15px;
  }

  .split input {
    width: 100%;
  }

  .input_label {
    font-size: 16px;
    color: #8B8E98;
    font-weight: 600;
  }

  .input_field {
    width: auto;
    height: 40px;
    padding: 0 0 0 16px;
    border-radius: 9px;
    outline: none;
    background-color: #F2F2F2;
    border: 1px solid #e5e5e500;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }
  .input_field , .placeholder {
      font-size: 12px;
      color: #385858DF
  }

  .input_field:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 2px #242424;
    background-color: transparent;
  }

  .purchase--btn {
    height: 55px;
    background: #F2F2F2;
    border-radius: 11px;
    border: 0;
    border: 1px solid white;
    outline: none;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    background: linear-gradient(180deg, #B1BABF 0%, #99B3CA 50%, #55A2C6 100%);
    box-shadow: 0px 0px 0px 0px #FFFFFF, 0px 0px 0px 0px #549DB3;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  .purchase--btn:hover {
    box-shadow: 0px 0px 0px 2px #FFFFFF, 0px 0px 0px 4px #0000003a;
  }

  /* Reset input number styles */
  .input_field::-webkit-outer-spin-button,
  .input_field::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input_field[type=number] {
    -moz-appearance: textfield;
  }
</style>
<?php $__env->stopPush(); ?>


<?php $__env->startSection('home_content'); ?>

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <h2>Services</h2>
                <ol>
                    <li><a href="<?php echo e(url('/')); ?>">Home</a></li>
                    <li><a href="<?php echo e(url('/services')); ?>">Service</a></li>
                </ol>
            </div>
        </div>
    </section><!-- End Breadcrumbs -->

    <main class="whole-main-plan">
        <section class="foundation-plan">
            <h4>Foundation Plan</h4>
            <p>Features:</p>
            <ul>
                <li>Single Page</li>
                <li>Free Web Design</li>
                <li>Limited Emails</li>
                <li>Free Custom Domain for 1 year</li>
                <li>SSL Certificate for secure connections</li>
                <li>Social Media Integration</li>
                <li>Storage: 5GB of Cloud SSD for 1 year</li>
                <li>2X Performance</li>
            </ul>
        </section>

        <section class="standard-plan">
            <h4>Standard Plan</h4>
            <p>Features:</p>
            <ul>
                <li>Multi-Page</li>
                <li>Free Web Design</li>
                <li>1 sub-domain</li>
                <li>Unlimited Emails</li>
                <li>Unlimited Bandwidth</li>
                <li>Free Custom Domain for 1 year</li>
                <li>SSL Certificate for secure connections</li>
                <li>Social Media Integration</li>
                <li>Content Management System</li>
                <li>Storage: 12GB of Cloud SSD for 1 year</li>
                <li>4X Performance</li>
            </ul>
        </section>

        <section class="advanced-plan">
            <h4>Advanced Plan</h4>
            <p>Features:</p>
            <ul>
                <li>Multi-Page</li>
                <li>Free Web Design</li>
                <li>Several sub-domain</li>
                <li>Unlimited Emails</li>
                <li>Unlimited Bandwidth</li>
                <li>Free Custom Domain for 1 year</li>
                <li>SSL Certificate for secure connections</li>
                <li>Social Media Integration</li>
                <li>Content Management System</li>
                <li>Storage: 60GB of Cloud SSD for 1 year</li>
                <li>7X Performance</li>
                <li>Pro+ Features</li>
                <li>Advanced Features</li>
            </ul>
        </section>
    </main>

    <section class="quotation-form-section">
        <form class="form" id="QuotationForm" method="POST" action="<?php echo e(route('quotation.store')); ?>">
            <?php echo csrf_field(); ?>
          <div class="separator">
            <hr class="line">
            <p>Please provide your information</p>
            <hr class="line">
          </div>
          <div class="credit-card-info--form">
                <div class="input_container">
                    <label for="company" class="input_label">Company Name</label>
                    <input id="company" class="input_field" type="text" name="company" title="Inpit title" placeholder="Enter your Company or Org name">
                </div>
                <div class="input_container">
                    <label for="name" class="input_label">Customer Name</label>
                    <input id="name" class="input_field" type="text" name="name" title="Inpit title" placeholder="Enter your full name">
                </div>
                <div class="input_container">
                    <label for="email" class="input_label">Email</label>
                    <input id="email" class="input_field" type="email" name="email" title="Inpit title" placeholder="customer@example.org">
                </div>
                <div class="input_container">
                <label for="phone_number" class="input_label">Contact Number</label>
                <input id="phone_number" class="input_field" type="number" name="phone_number" title="Inpit title" placeholder="+855 000 000 000">
                </div>
                <div class="input_container">
                    <label for="paln" class="input_label">Plan:</label>
                    <div>
                        <input type="radio" id="foundation" name="plan" value="Foundation" required>
                        <label for="foundation">Foundation</label>
                    </div>
                    <div>
                        <input type="radio" id="standard" name="plan" value="Standard" required>
                        <label for="standard">Standard</label>
                    </div>
                    <div>
                        <input type="radio" id="advanced" name="plan" value="Advanced" required>
                        <label for="advanced">Advanced</label>
                    </div>
                </div>
          </div>
          <button type="button" class="purchase--btn" onclick="submitForm()">Submit & Request Quotation</button>
        </form>
    </section>

    


    <div id="quotationPopup" class="quotation-popup">
        <div class="quotation-popup-content">
            <button class="close-popup" onclick="closePopup()">X</button>
            <h3>Please let us know your requirements.</h3>
            <div id="QuotationResults"></div>
            <div style="text-align: center">
                <button onclick="downloadQuotation()">Download Quotation</button>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
    <script>
        function submitForm() {
            const form = document.getElementById('QuotationForm');
            const formData = new FormData(form);

            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            fetch('<?php echo e(route('quotation.store')); ?>', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    generateQuotationPopup(data.quotation);
                } else {
                    alert('Error saving data. Please try again and fill our all requiresd fields.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Please fill our all requiresd fields and try again.');
            });
        }

        function generateQuotationPopup(quotationData) {
            const selectedPlan = quotationData.plan;
            let cost;
            let features;

            switch (selectedPlan) {
                case 'Foundation':
                    cost = 389;
                    features = `
                        <ul>
                            <li>Single Page</li>
                            <li>Free Web Design</li>
                            <li>Limited Emails</li>
                            <li>Free Custom Domain for 1 year</li>
                            <li>SSL Certificate for secure connections</li>
                            <li>Social Media Integration</li>
                            <li>Storage: 5GB of Cloud SSD for 1 year</li>
                            <li>2X Performance</li>
                        </ul>
                    `;
                    break;
                case 'Standard':
                    cost = 689;
                    features = `
                        <ul>
                            <li>Multi-Page</li>
                            <li>Free Web Design</li>
                            <li>1 sub-domain</li>
                            <li>Unlimited Emails</li>
                            <li>Unlimited Bandwidth</li>
                            <li>Free Custom Domain for 1 year</li>
                            <li>SSL Certificate for secure connections</li>
                            <li>Social Media Integration</li>
                            <li>Content Management System</li>
                            <li>Storage: 12GB of Cloud SSD for 1 year</li>
                            <li>4X Performance</li>
                        </ul>
                    `;
                    break;
                case 'Advanced':
                    cost = 989;
                    features = `
                        <ul>
                            <li>Multi-Page</li>
                            <li>Free Web Design</li>
                            <li>several sub-domain</li>
                            <li>Unlimited Emails</li>
                            <li>Unlimited Bandwidth</li>
                            <li>Free Custom Domain for 1 year</li>
                            <li>SSL Certificate for secure connections</li>
                            <li>Social Media Integration</li>
                            <li>Content Management System</li>
                            <li>Storage: 60GB of Cloud SSD for 1 year</li>
                            <li>7X Performance</li>
                            <li>Pro+ Features</li>
                            <li>Advanced Features</li>
                        </ul>
                    `;
                    break;
            }

            const result = `

                <h3 style="padding: 20px 0 20px 0; font-size: 20px;">Quotation - ${selectedPlan} Plan</h3>
                <p><strong>Customer Name:</strong> ${quotationData.name}</p>
                <p><strong>Customer Email:</strong> ${quotationData.email}</p>
                <p><strong>Contact Number:</strong> ${quotationData.phone_number}</p>
                <p><strong>Company:</strong> ${quotationData.company}</p>
                <p><strong>Overall Cost:</strong> $${cost} &nbsp; USD (per project)</p>
                <p><strong>Features:</strong></p>
                ${features}
                <br>
                <p>Please note that the quotation is valid for 14 days from the date of submission which mean after that time customer will not be able to receive the free advanced features which will provide by the Duck Cloud Team. </p>
                <br>
                <div>
                    <h6 style="padding: 10px 0 10px 0; font-size: 14px;">Key Points!</h6>
                </div>
                <ul>
                    <li>After received the quotation, customer will be able to have a free consultation with us within 84 hours.</li>
                    <li>The overall cost will be $${cost} amount and for using payment integeration can be different.</li>
                    <li>In this $${cost} amount, the domain registeration is for 1 year already included in the cost.</li>
                    <li>After implentation, the first hosting fees gonna be covered by the Duck CLoud Team and starting from the 2nd month, the hosting fees will be covered by the customer according to our providing hosting plans and agreements.</li>
                </ul>
                <br><br>
                <p>Thank you for choosing Duck Cloud for your web service needs!</p>
                <div style="paddding-top: 26px;display: flex;justify-content: space-between;">
                    <div style="margin-left: 2em;">
                        <h6 style="padding: 10px 0 10px 0; font-size: 18px;">Regards!</h6>
                        <p style="font-size: 16px;">Duck Cloud Team</p>
                        <p style="font-size: 14px;">+855 070 578 104</p>
                        <p style="font-size: 14px;">admin@duckcloud.info</p>
                        <br><br>
                    </div>
                    <div style="margin-right: 2em;">
                        <ul>
                            <h6 style="padding: 10px 0 10px 0; font-size: 18px;">Follow us:</h6>
                            <li><a href="https://www.facebook.com/duckcloudglobal" target="_blank">Facebook</a></li>
                            <li><a href="https://x.com/2am_Tech" target="_blank">X</a></li>
                        </ul>
                        <img src="<?php echo e(asset('frontend/assets/img/dc_logo.png')); ?>" alt="DC-logo" style="height: 140px; width:auto;">
                    </div>
                </div>

                <br><hr>

            `;

            document.getElementById('QuotationResults').innerHTML = result;
            const popup = document.getElementById('quotationPopup');
            popup.classList.add('show');

            // Optionally, blur the background
            document.querySelector('header').classList.add('blurred-background');
            document.querySelector('footer').classList.add('blurred-background');
        }

        function closePopup() {
            const popup = document.getElementById('quotationPopup');
            popup.classList.remove('show');

            // Remove blur effect from background
            document.querySelector('header').classList.remove('blurred-background');
            document.querySelector('footer').classList.remove('blurred-background');
        }

        function downloadQuotation() {
            const quotationContent = document.getElementById('QuotationResults').innerHTML;
            const opt = {
                margin: 1,
                filename: 'quotation.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(quotationContent).set(opt).save();
        }
    </script>

<?php $__env->stopSection(); ?>


<?php echo $__env->make('layouts.master_home', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\Duck_Cloud_Folders\Duck Cloud Website\duckcloud.info\resources\views/pages/services.blade.php ENDPATH**/ ?>