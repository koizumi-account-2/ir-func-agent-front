import { CustomeCard } from "@/components/card/CustomeCard";
import { TConfirmModal, TPersona } from "@/types/type";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PersonaCard } from "@/components/persona/PersonaCard";
import { presentationAgentStateAtom } from "@/atoms/presentationAgentStateAtom";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useCallPresenAgent } from "@/hooks/useCallPresenAgent";
import { userContextAtom } from "@/atoms/userContextAtom";
export const Route = createFileRoute("/_auth/presentation/persona")({
  component: RouteComponent,
});

function RouteComponent() {
  const [presentationAgentState, setPresentationAgentState] = useAtom(
    presentationAgentStateAtom
  );
  const { userContext } = useAtomValue(userContextAtom);
  const { mutate } = useCallPresenAgent();
  const { openConfirmModal } = useConfirmModal();
  const [isEdit, setIsEdit] = useState(false);
  const [personaList, setPersonaList] = useState<TPersona[]>([
    ...presentationAgentState.persona_list,
  ]);
  const confirmModal: TConfirmModal = {
    isOpen: true,
    title: "確認",
    description: "このペルソナの内容でエージェントを呼び出しますか？",
    execLabel: "はい",
    cancelLabel: "いいえ",
    execHandler: async () => {
      console.log("test", personaList);
      const newState = {
        ...presentationAgentState,
        persona_list: personaList,
      };
      setPresentationAgentState(newState);

      mutate(
        {
          userBackground: userContext,
          state: newState,
        },
        {
          onSuccess: (response) => {
            console.log("success", response);
            navigate({ to: "/presentation/result" });
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    },
    cancelHandler: () => {
      console.log("test");
    },
  };

  const navigate = useNavigate();
  const updatePersonaList = (index: number, background: string) => {
    if (!isEdit) {
      setIsEdit(true);
    }
    const updatedPersonaList = personaList.map((persona, i) =>
      i === index ? { ...persona, background } : persona
    );
    console.log("updatedPersonaList", updatedPersonaList);
    setPersonaList(updatedPersonaList);
  };
  const next = () => {
    console.log("next");
    if (presentationAgentState.interview_result.length > 0) {
      const reCallConfirmModal: TConfirmModal = {
        ...confirmModal,
        title: "確認",
        description: "もう一度インタビューと提案を行いますか？",
        cancelLabel: "内容を再確認",
        cancelHandler: () => {
          navigate({ to: "/presentation/result" });
        },
      };
      openConfirmModal(reCallConfirmModal);
    } else {
      openConfirmModal(confirmModal);
    }
  };
  const back = () => {
    console.log("back");
    navigate({ to: "/presentation/request" });
  };

  const footer = (
    <div className="flex justify-between gap-2 w-full">
      <Button onClick={back}>戻る</Button>
      <Button onClick={next}>プレゼン作成</Button>
    </div>
  );
  return (
    <>
      <CustomeCard
        title="ペルソナの提案"
        description="AIからペルソナが提案されました。もし必要なら編集してください。"
        footer={footer}
      >
        <Button
          variant="outline"
          className="mb-2"
          onClick={() => {
            setIsEdit(false);
            setPersonaList(presentationAgentState.persona_list);
          }}
        >
          元の情報に戻す
        </Button>
        <div className="flex flex-col gap-4">
          {personaList.map((item, index) => (
            <div key={item.name}>
              <PersonaCard
                persona={item}
                isEdit={true}
                index={index}
                updatePersonaList={updatePersonaList}
              />
            </div>
          ))}
        </div>
      </CustomeCard>
    </>
  );
}
