import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | The Lazy Mermaid Murals",
  description: "Our policy on deposits, cancellations, rescheduling and refunds.",
};

export default function RefundCancellationPage() {
  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      lastUpdated="16 August 2026"
      currentHref="/refund-and-cancellation"
    >
      <section className="legal-section">
        <p>
          This policy explains how deposits, cancellations, rescheduling and refunds are handled
          for mural commissions with The Lazy Mermaid Murals. It should be read alongside our{" "}
          <a href="/terms-and-conditions">Terms &amp; Conditions</a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>1. Deposits</h2>
        <p>
          A 50% deposit is required to secure your booking and begin the design stage of your
          project. This deposit is non-refundable once design work has commenced, as it covers the
          time, materials planning, and scheduling committed to your project from that point
          onward.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Cancellation by the client before design work begins</h2>
        <p>
          If you cancel your project within 48 hours of paying your deposit and before any design
          work has started, your deposit will be refunded in full, less any payment processing
          fees already incurred.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Cancellation by the client after design work begins</h2>
        <p>
          If you cancel after design work has commenced but before painting begins, the deposit is
          retained in full to cover design time and materials planning already undertaken.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Cancellation by the client after painting begins</h2>
        <p>
          If a project is cancelled after painting has started, you will be invoiced for the work
          completed to date, calculated on a pro-rata basis of the total quoted price, in addition
          to the retained deposit. Any amount already paid beyond the value of work completed will
          be refunded; any shortfall will be invoiced and is payable within 7 days.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Rescheduling</h2>
        <p>
          We understand that circumstances change. If you need to reschedule your project, please
          give us as much notice as possible. We will make reasonable efforts to accommodate a new
          date, subject to our availability. Rescheduling requests made with less than 7 days&apos;
          notice before a confirmed painting start date may incur a rescheduling fee to cover
          costs already committed (such as materials purchased or other work turned down to hold
          your slot).
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Cancellation or delay by us</h2>
        <p>
          In the rare event that we need to cancel or significantly delay a confirmed project
          (for reasons other than weather or site access issues outside our control), we will
          notify you as soon as possible and offer either a full refund of any amount paid, or the
          option to reschedule at a mutually agreed later date.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Weather and site conditions</h2>
        <p>
          For exterior murals, painting schedules may need to shift due to weather conditions
          outside our control. Weather-related delays are not treated as a cancellation by either
          party, and painting will resume as soon as conditions allow. No refund is applicable for
          weather-related rescheduling.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Final balance and completed work</h2>
        <p>
          Once a mural is complete, the remaining 50% balance is due at handover. Refunds are not
          offered for completed and approved work, except where the work does not meet the
          standard of quality that a reasonable person would expect, in which case your rights
          under the Consumer Guarantees Act 1993 apply.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. How refunds are processed</h2>
        <p>
          Approved refunds will be returned using the same payment method used for the original
          payment, within 10 business days of the refund being approved.
        </p>
      </section>

      <section className="legal-section">
        <h2>10. Contact us</h2>
        <p>
          If you need to discuss a cancellation, rescheduling, or refund, please contact us as
          early as possible at{" "}
          <a href="mailto:Sarah.thelazymermaid@gmail.com">Sarah.thelazymermaid@gmail.com</a> so we can find the
          best solution together.
        </p>
      </section>
    </LegalPageLayout>
  );
}