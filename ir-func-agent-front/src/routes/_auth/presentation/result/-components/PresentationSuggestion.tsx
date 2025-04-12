import { TPresentation } from "@/types/type";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card } from "@/components/ui/card";

interface PresentationSuggestionProps {
  presentation: TPresentation | null;
}
export const PresentationSuggestion = ({
  presentation,
}: PresentationSuggestionProps) => {
  if (!presentation) {
    return <div>提案がありません</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium">Presentationの構成提案</h3>
        {presentation.contents.map((content) => {
          return (
            <Card className="w-full p-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold">
                  {content.content_name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  所要時間: {content.content_time}分
                </p>
              </CardHeader>

              <CardContent className="space-y-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">目的</h3>
                  <p>{content.content_purpose}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">内容</h3>
                  <p className="whitespace-pre-line">
                    {content.content_detail}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
