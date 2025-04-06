import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TPersona } from "@/types/type";
import { Textarea } from "../ui/textarea";

export const PersonaCard = ({
  persona,
  updatePersonaList,
  index,
  isEdit = false,
}: {
  persona: TPersona;
  updatePersonaList?: (index: number, background: string) => void;
  index: number;
  isEdit: boolean;
}) => {
  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src="/icons/alligator.png" alt="John Doe" />
        <AvatarFallback className="rounded-lg">{persona.name}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{persona.name}</span>
        {isEdit && updatePersonaList ? (
          <Textarea
            id="message"
            placeholder="ここに入力..."
            value={persona.background}
            onChange={(e) => {
              updatePersonaList(index, e.target.value);
            }}
          />
        ) : (
          <span className="text-xs text-muted-foreground">
            {persona.background}
          </span>
        )}
      </div>
    </div>
  );
};
