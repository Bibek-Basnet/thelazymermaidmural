import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Lazy Mermaid Murals",
  description: "The terms and conditions governing mural commissions with The Lazy Mermaid Murals.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="16 August 2026"
      currentHref="/terms-and-conditions"
    >
      <section className="legal-section">
        <p>
          These Terms and Conditions (&quot;Terms&quot;) govern the provision of mural design and
          painting services (&quot;Services&quot;) by The Lazy Mermaid Murals, operated by Sarah
          Cornish (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), based in Tauranga, New
          Zealand, to any client who engages us (&quot;you&quot;, &quot;the Client&quot;).
        </p>
        <p>
          By requesting a quote, paying a deposit, or otherwise engaging our Services, you agree
          to be bound by these Terms.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Our services</h2>
        <p>
          We provide custom hand-painted murals for residential, commercial and public spaces,
          including initial consultation, site visits, concept design, and painting. The specific
          scope of work for each project will be confirmed in a written quote provided to you
          before any deposit is taken.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Quotes and pricing</h2>
        <p>
          Quotes are based on the surface, size, complexity and location of the mural as described
          or shown to us at the time of quoting. Quotes are valid for 30 days from the date of
          issue unless otherwise stated. If the scope of the project changes after a quote is
          accepted, we reserve the right to issue a revised quote.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Deposits and payment</h2>
        <p>
          A non-refundable deposit of 50% of the total quoted price is required to secure your
          booking and begin the design stage. The remaining 50% balance is due upon completion of
          the mural, before or at the time of final handover. Please refer to our{" "}
          <a href="/refund-and-cancellation">Refund &amp; Cancellation Policy</a> for full detail
          on deposit terms.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Design approval</h2>
        <p>
          Following the deposit, we will provide a digital concept mock-up placed onto photos of
          your space. We will work with you through a reasonable number of revisions to refine the
          design. Once you approve the final design in writing (including by email), painting will
          proceed based on that approved design. Changes requested after painting has begun may
          incur additional charges and extend the project timeline.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Site access and preparation</h2>
        <p>
          You are responsible for ensuring the mural site is reasonably accessible, safe, and free
          of obstructions on the agreed painting dates, and for obtaining any necessary permission
          from a landlord, body corporate, or relevant authority before work begins. Any surface
          preparation beyond standard cleaning (such as repairing damaged plaster or removing prior
          coatings) is not included in the quoted price unless explicitly agreed in writing.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Timeframes and delays</h2>
        <p>
          We will provide an estimated timeframe for your project, but painting schedules,
          particularly for exterior murals, may be affected by weather, site conditions, or other
          factors outside our control. We will communicate any expected delays as soon as
          reasonably possible.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Intellectual property</h2>
        <p>
          We retain copyright and all intellectual property rights in the mural design, including
          preliminary sketches, digital mock-ups, and the finished artwork, unless otherwise agreed
          in writing. You are granted the right to display, photograph, and share images of the
          completed mural for personal and reasonable promotional use. We reserve the right to
          photograph the completed mural and use those images in our own portfolio, website, social
          media and marketing materials, unless you request otherwise in writing prior to the
          project&apos;s completion.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Client responsibilities</h2>
        <p>
          You agree to provide accurate information about the mural site and your requirements,
          respond to requests for approval or information in a timely manner, and make payments in
          accordance with the agreed schedule.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Liability</h2>
        <p>
          We carry reasonable care in the performance of our Services. To the extent permitted by
          law, our liability for any loss or damage arising from the Services is limited to the
          total value of the quoted project. Nothing in these Terms excludes, restricts or modifies
          any right or remedy you have under the Consumer Guarantees Act 1993 or the Fair Trading
          Act 1986, where those Acts apply and cannot lawfully be excluded.
        </p>
      </section>

      <section className="legal-section">
        <h2>10. Cancellation</h2>
        <p>
          For details on cancelling or rescheduling a project, please see our{" "}
          <a href="/refund-and-cancellation">Refund &amp; Cancellation Policy</a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>11. Governing law</h2>
        <p>
          These Terms are governed by the laws of New Zealand, and any disputes arising from these
          Terms or the Services will be subject to the exclusive jurisdiction of the courts of New
          Zealand.
        </p>
      </section>

      <section className="legal-section">
        <h2>12. Contact us</h2>
        <p>
          Questions about these Terms can be sent to{" "}
          <a href="mailto:hello@thelazymermaid.nz">hello@thelazymermaid.nz</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}