import { AssessmentForm } from "@/components/AssessmentForm";
import { Claim, Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";

export const metadata = metaFor("/assessment");

export default function AssessmentPage() {
  return (
    <Page path="/assessment">
      <Claim id="L44">
        Four yes or no facts. The number is for the audit call. The product CRM does not store this score.
      </Claim>
      <AssessmentForm />
    </Page>
  );
}
