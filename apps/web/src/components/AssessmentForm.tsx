"use client";

import { assessmentQuestions, scoreAnswers, type AssessmentId } from "@opralvin/content/assessment";
import Link from "next/link";
import { useMemo, useState } from "react";

export function AssessmentForm() {
  const [answers, setAnswers] = useState<Partial<Record<AssessmentId, boolean>>>({});
  const result = useMemo(() => scoreAnswers(answers), [answers]);

  function toggle(id: AssessmentId, yes: boolean) {
    setAnswers((prev) => ({ ...prev, [id]: yes }));
  }

  function keep() {
    sessionStorage.setItem("opralvin_assessment_score", String(result.score));
  }

  return (
    <form
      className="max-w-xl space-y-6 border border-line bg-sheet p-5"
      onSubmit={(event) => event.preventDefault()}
      data-assessment="audit"
    >
      <p className="text-sm text-muted" data-claim="L44">
        This score is for the audit call. It is not stored on the product CRM.
      </p>
      {assessmentQuestions.map((q) => (
        <fieldset key={q.id} className="space-y-2">
          <legend className="font-semibold">{q.text}</legend>
          <label className="mr-4 text-sm">
            <input
              type="radio"
              name={q.id}
              checked={answers[q.id] === true}
              onChange={() => toggle(q.id, true)}
            />{" "}
            Yes
          </label>
          <label className="text-sm">
            <input
              type="radio"
              name={q.id}
              checked={answers[q.id] === false}
              onChange={() => toggle(q.id, false)}
            />{" "}
            No
          </label>
        </fieldset>
      ))}
      <p className="font-[family-name:var(--font-mono)]" data-assessment-score>
        Score {result.score} of {result.max}
      </p>
      <p>
        <Link href="/process-audit" onClick={keep} className="bg-ink px-4 py-3 text-sm font-semibold text-on-ink">
          Book a free process audit
        </Link>
      </p>
    </form>
  );
}
