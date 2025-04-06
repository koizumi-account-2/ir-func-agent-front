import { AppAccordion } from "@/components/parts/AppAccordion";
import { CardContent } from "@/components/ui/card";
import { AppAccordionItem } from "@/components/parts/AppAccordion";
import { PersonaCard } from "@/components/persona/PersonaCard";
import { Card } from "@/components/ui/card";
import { TInterviewContent } from "@/types/type";

export const InterviewResult = ({
  interviewResults,
}: {
  interviewResults: TInterviewContent[];
}) => {
  if (interviewResults.length === 0) {
    return <div>インタビュー結果がありません</div>;
  }
  const accordionItems: AppAccordionItem[] = interviewResults.map(
    (interviewResult, index) => ({
      title: interviewResult.persona.name,
      triger: (
        <PersonaCard
          persona={interviewResult.persona}
          isEdit={false}
          index={index}
        />
      ),
      content: (
        <div className="flex flex-col gap-2">
          <Card className="py-3">
            <CardContent className="px-1">
              <div className="flex items-start space-x-4 ">
                <img
                  src="/icons/question.png"
                  alt="サンプル画像"
                  className="h-4 w-4 rounded-full object-cover shadow"
                />

                <div className="whitespace-pre-line">
                  {interviewResult.question}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="py-3">
            <CardContent className="px-1">
              <div className="flex items-start space-x-4 ">
                <img
                  src="/icons/answer.png"
                  alt="サンプル画像"
                  className="h-4 w-4 rounded-full object-cover shadow"
                />

                <div className="whitespace-pre-line">
                  {interviewResult.answer}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
    })
  );
  return (
    <>
      <AppAccordion
        defaultOpenItems={interviewResults.map(
          (interviewResult) => interviewResult.persona.name
        )}
        items={accordionItems}
      />
    </>
  );
};
