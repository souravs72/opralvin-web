export const assessmentQuestions = [
  { id: "godowns", text: "The firm keeps stock in more than one godown.", weight: 1 },
  { id: "sheet", text: "Stock or parties live in a spreadsheet today.", weight: 1 },
  { id: "accountant", text: "Someone in the firm posts the books.", weight: 1 },
  { id: "gst", text: "The firm is GST registered.", weight: 1 },
] as const;

export type AssessmentId = (typeof assessmentQuestions)[number]["id"];

export function scoreAnswers(answers: Partial<Record<AssessmentId, boolean>>): {
  score: number;
  max: number;
} {
  const max = assessmentQuestions.reduce((sum, q) => sum + q.weight, 0);
  const score = assessmentQuestions.reduce((sum, q) => sum + (answers[q.id] ? q.weight : 0), 0);
  return { score, max };
}
