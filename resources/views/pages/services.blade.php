@extends('layouts.master_home')

@push('style')
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
</style>
@endpush


@section('home_content')

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <h2>Services</h2>
                <ol>
                    <li><a href="{{ url('/') }}">Home</a></li>
                    <li><a href="{{ url('/services')}}">Service</a></li>
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
                <li>2 sub-domain</li>
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
        <form id="QuotationForm" method="POST" action="{{ route('quotation.store') }}">
            @csrf
            <div>
                <label for="company">Company:</label>
                <input type="text" id="company" name="company" required>
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div>
                <label for="phone_number">Phone Number:</label>
                <input type="text" id="phone_number" name="phone_number" required>
            </div>
            <div>
                <label for="plan">Plan:</label>
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
            <button type="button" onclick="submitForm()">Request Quotation</button>
        </form>
    </section>


    <div id="quotationPopup" class="quotation-popup">
        <div class="quotation-popup-content">
            <button class="close-popup" onclick="closePopup()">X</button>
            <h3>Quotation</h3>
            <div id="QuotationResults"></div>
            <button onclick="downloadQuotation()">Download Quotation</button>
        </div>
    </div>

@endsection
@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
    <script>
        function submitForm() {
            const form = document.getElementById('QuotationForm');
            const formData = new FormData(form);

            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            fetch('{{ route('quotation.store') }}', {
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
                    alert('Error saving data. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error saving data. Please try again.');
            });
        }

        function generateQuotationPopup(quotationData) {
            const selectedPlan = quotationData.plan;
            let cost;
            let features;

            switch (selectedPlan) {
                case 'Foundation':
                    cost = 299;
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
                    cost = 599;
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
                    cost = 899;
                    features = `
                        <ul>
                            <li>Multi-Page</li>
                            <li>Free Web Design</li>
                            <li>2 sub-domain</li>
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
                <h3>Quotation - ${selectedPlan} Plan</h3>
                <p><strong>Customer Name:</strong> ${quotationData.name}</p>
                <p><strong>Customer Email:</strong> ${quotationData.email}</p>
                <p><strong>Contact Number:</strong> ${quotationData.phone_number}</p>
                <p><strong>Company:</strong> ${quotationData.company}</p>
                <p><strong>Plan Cost:</strong> $${cost} per project</p>
                <p><strong>Features:</strong></p>
                ${features}
                <p>Thank you for choosing Duck Cloud for your web service needs!</p>
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
@endpush
