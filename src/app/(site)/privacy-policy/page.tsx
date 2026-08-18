import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | The Lazy Mermaid Murals",
  description: "How The Lazy Mermaid Murals collects, uses and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="16 August 2026"
      currentHref="/privacy-policy"
    >
      <section className="legal-section">
        <p>
          The Lazy Mermaid Murals (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to
          protecting your privacy. This Privacy Policy explains how we collect, use, store and
          disclose personal information when you visit thelazymermaid.nz (the &quot;Site&quot;) or
          otherwise interact with us, in accordance with the Privacy Act 2020 (New Zealand).
        </p>
        <p>
          By using the Site or providing us with your personal information, you agree to the
          collection and use of that information as described in this policy.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Information we collect</h2>
        <p>We may collect the following categories of personal information:</p>
        <ul>
          <li>
            <strong>Contact details</strong> - name, email address, phone number, and physical or
            postal address, when you submit an enquiry through our contact form or communicate
            with us directly.
          </li>
          <li>
            <strong>Project information</strong> - details about your space, mural concept, wall
            size, budget range, and any photos or measurements you choose to share with us.
          </li>
          <li>
            <strong>Payment information</strong> - deposit and invoice records processed through
            our third-party payment providers. We do not store full payment card details on our
            own servers.
          </li>
          <li>
            <strong>Technical information</strong> - IP address, browser type, device information,
            pages visited and referring URLs, collected automatically through standard web
            analytics when you browse the Site.
          </li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>2. How we use your information</h2>
        <p>We use the personal information we collect to:</p>
        <ul>
          <li>Respond to enquiries and provide quotes for mural work</li>
          <li>Arrange site visits, consultations and project scheduling</li>
          <li>Prepare and manage contracts, invoices and deposits</li>
          <li>Communicate with you throughout the design and painting process</li>
          <li>Improve and maintain the Site</li>
          <li>Comply with our legal and regulatory obligations</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </section>

      <section className="legal-section">
        <h2>3. Sharing your information</h2>
        <p>
          We may share your personal information with trusted third-party service providers who
          assist us in operating the Site and running our business, including:
        </p>
        <ul>
          <li>Website hosting and content management providers</li>
          <li>Email and communication service providers</li>
          <li>Payment processing providers</li>
          <li>Accounting and invoicing software</li>
        </ul>
        <p>
          These providers only receive the information necessary to perform their function and
          are required to handle it in accordance with applicable privacy laws. We do not permit
          them to use your information for their own marketing purposes.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Cookies and analytics</h2>
        <p>
          The Site may use cookies and similar tracking technologies to understand how visitors
          use the Site and to improve its performance. You can disable cookies through your
          browser settings, though this may affect the functionality of the Site.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Data storage and security</h2>
        <p>
          We take reasonable steps to protect the personal information we hold from loss, misuse,
          unauthorised access, modification or disclosure. Personal information may be stored on
          servers located in New Zealand or overseas, operated by our hosting and infrastructure
          providers.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Your rights</h2>
        <p>
          Under the Privacy Act 2020, you have the right to access the personal information we
          hold about you and to request that it be corrected if it is inaccurate. To make such a
          request, please contact us using the details below.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Retention</h2>
        <p>
          We retain personal information for as long as necessary to fulfil the purposes outlined
          in this policy, including any legal, accounting or reporting requirements, after which
          it is securely deleted or anonymised.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated &quot;Last updated&quot; date. Continued use of the Site after any
          changes constitutes acceptance of the revised policy.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Contact us</h2>
        <p>
          If you have any questions about this Privacy Policy or wish to exercise your rights
          under the Privacy Act 2020, please contact us at{" "}
          <a href="mailto:Sarah.thelazymermaid@gmail.com">Sarah.thelazymermaid@gmail.com</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}