@extends('layouts.master_home')

@section('home_content')

    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <div class="d-flex justify-content-between align-items-center">
          <h2>Privacy Policy</h2>
          <ol>
            <li><a href="{{ route('home') }}">Home</a></li>
            <li>Privacy Policy</li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs -->

    <!-- ======= Privacy Policy Section ======= -->
    <section id="privacy-policy" class="privacy-policy">
      <div class="container">

        <div class="row" data-aos="fade-up">
          <div class="col-lg-12">
            @if($privacyPolicy)
                <h3>{{ $privacyPolicy->title }}</h3>
                <img src="{{ $privacyPolicy->photo }}" class="img-fluid" alt="">
                <p>{{ $privacyPolicy->text }}</p>
                <span style="padding-left: 60%;"> - Duck Cloud Team</span>
            @else
                <p>No privacy policy found.</p>
            @endif
          </div>
        </div>
      </div>
    </section><!-- End Privacy Policy Section -->

    <div class="inside">
        <h1>Privacy Policy</h1>
        <p class="last-updated">Last Updated: 3.September.2023</p>
        <p>Duck Cloud is committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your personal information when you visit our website or use our services.</p>
        <p>By accessing or using our website and services, you agree to the terms of this Privacy Policy.</p>

        <h2 class="section-title">1. Information We Collect</h2>
        <p>We may collect the following types of personal information:</p>
        <ul>
            <li><strong>1.1. Information You Provide:</strong> We may collect information that you provide directly to us, including but not limited to your name, email address, postal address, phone number, and any other information you choose to provide when you contact us, sign up for our newsletter, or use our services.</li>
            <li><strong>1.2. Automatically Collected Information:</strong> We may collect certain information automatically when you visit our website. This may include your IP address, browser type, operating system, referring URLs, and other usage information.</li>
        </ul>

        <h2 class="section-title">2. How We Use Your Information</h2>
        <p>We may use your personal information for various purposes, including:</p>
        <ul>
            <li><strong>2.1. Providing Services:</strong> To provide and maintain our services, communicate with you, and process your requests.</li>
            <li><strong>2.2. Improving our Services:</strong> To analyse how you use our website and services, and to enhance and improve the user experience.</li>
            <li><strong>2.3. Marketing:</strong> To send you promotional materials, newsletters, and updates about our products and services. You may opt-out of receiving marketing communications at any time.</li>
            <li><strong>2.4. Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
        </ul>

        <h2 class="section-title">3. Disclosure of Your Information</h2>
        <p>We may disclose your personal information to third parties under the following circumstances:</p>
        <ul>
            <li><strong>3.1. Service Providers:</strong> We may share your information with third-party service providers who help us operate our website and provide our services.</li>
            <li><strong>3.2. Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid legal requests, such as subpoenas or court orders.</li>
            <li><strong>3.3. Protection of Rights:</strong> We may disclose your information when we believe it is necessary to protect our rights, privacy, safety, or property, or that of our users or others.</li>
        </ul>

        <h2 class="section-title">4. Cookies and Tracking Technologies</h2>
        <p>We may use cookies and similar tracking technologies to collect and store information about your use of our website. You can manage your cookie preferences through your browser settings.</p>

        <h2 class="section-title">5. Security</h2>
        <p>We take reasonable measures to protect your personal information from unauthorised access and use. However, no data transmission over the internet is completely secure, and we cannot guarantee the security of your information.</p>

        <h2 class="section-title">6. Your Choices</h2>
        <p>You have the right to access, update, or delete your personal information. You can also opt-out of marketing communications. Please contact us to exercise these rights.</p>

        <h2 class="section-title">7. Changes to this Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page will indicate when the policy was last revised. Please review the policy periodically.</p>

        <h2 class="section-title">8. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <span class="contact-info"><a href="mailto:admin@duckcloud.info" >admin@duckcloud.info</a></span></p>
      </div> <!-- end of privacy policy code -->

@endsection
