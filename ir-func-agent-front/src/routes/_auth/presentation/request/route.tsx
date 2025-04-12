import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CustomeCard } from "@/components/card/CustomeCard";
import { useAtom, useAtomValue } from "jotai";
import { presentationAgentStateAtom } from "@/atoms/presentationAgentStateAtom";
import { useCallPresenAgent } from "@/hooks/useCallPresenAgent";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { TConfirmModal } from "@/types/type";
import { userContextAtom } from "@/atoms/userContextAtom";
import { useState } from "react";
export const Route = createFileRoute("/_auth/presentation/request")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isChanged, setIsChanged] = useState(false);
  const { openConfirmModal } = useConfirmModal();
  const [presentationAgentState, setPresentationAgentState] = useAtom(
    presentationAgentStateAtom
  );
  const { userContext } = useAtomValue(userContextAtom);
  const confirmModal: TConfirmModal = {
    isOpen: true,
    title: "確認",
    description: "ペルソナを作成しますか？",
    execLabel: "はい",
    cancelLabel: "いいえ",
    execHandler: async () => {
      mutate(
        {
          userBackground: userContext,
          state: presentationAgentState,
        },
        {
          onSuccess: (response) => {
            console.log("success", response);
            navigate({ to: "/presentation/persona" });
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
  const { mutate, isPending } = useCallPresenAgent();
  const navigate = useNavigate();
  const next = () => {
    console.log("next");
    if (isChanged) {
      openConfirmModal(confirmModal);
    } else {
      navigate({ to: "/presentation/persona" });
    }
  };
  const back = () => {
    console.log("back");
    navigate({ to: "/presentation/background" });
  };
  const footer = (
    <div className="flex justify-between gap-2 w-full">
      <Button onClick={back}>背景入力へ</Button>
      <Button onClick={next} disabled={isPending}>
        {isPending ? "作成中..." : "ペルソナ作成"}
      </Button>
    </div>
  );
  return (
    <CustomeCard
      title="Agentへのリクエストを入力してください"
      description="この情報を元に、プレゼンの内容を生成します。"
      footer={footer}
    >
      <div className="flex flex-col gap-4">
        <div className="p-4 space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            リクエスト
          </label>
          <Textarea
            id="message"
            placeholder="ここに入力..."
            value={presentationAgentState.user_request}
            onChange={(e) => {
              setIsChanged(true);
              setPresentationAgentState({
                ...presentationAgentState,
                user_request: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </CustomeCard>
  );
}
