import { Button } from "@/components/ui/button";
import { CustomeCard } from "@/components/card/CustomeCard";
import { useAtom } from "jotai";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Textarea } from "@/components/ui/textarea";
import { userContextAtom } from "@/atoms/userContextAtom";
import { useState } from "react";
import { useUpdateUserContext } from "@/hooks/useUserContextData";
import { authAtom } from "@/atoms/authAtom";
import { presentationAgentStateAtom } from "@/atoms/presentationAgentStateAtom";
import { TConfirmModal } from "@/types/type";
import { useConfirmModal } from "@/hooks/useConfirmModal";
export const Route = createFileRoute("/_auth/presentation/background")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isChanged, setIsChanged] = useState(false);
  const { openConfirmModal } = useConfirmModal();
  const [userContext, setUserContext] = useAtom(userContextAtom);
  const [presentationAgentState, setPresentationAgentState] = useAtom(
    presentationAgentStateAtom
  );
  const [auth] = useAtom(authAtom);
  console.log("auth", auth);
  const navigate = useNavigate();
  const confirmModal: TConfirmModal = {
    isOpen: true,
    title: "確認",
    description: "あなたの情報を更新しますか？",
    execLabel: "はい",
    cancelLabel: "いいえ",
    execHandler: async () => {
      console.log("logout");
      if (!auth) {
        throw new Error("auth is null");
      }
      console.log("next");

      mutate(
        {
          id: auth.userID,
          input: {
            userContext: userContext.userContext,
            totalTokens: null,
          },
        },
        {
          onSuccess: () => {
            setIsChanged(false);
            navigate({ to: "/presentation/request" });
          },
        }
      );
    },
    cancelHandler: () => {
      console.log("test");
    },
  };

  const { mutate, isPending } = useUpdateUserContext();

  // あなたの情報
  const updateUserContext = (yourBackground: string) => {
    if (!isChanged) {
      setIsChanged(true);
    }
    setUserContext({
      ...userContext,
      userContext: yourBackground,
    });
  };
  // 相手の情報
  const updateCommonBackground = (partnerBackground: string) => {
    setPresentationAgentState({
      ...presentationAgentState,
      common_background: partnerBackground,
    });
  };

  const next = () => {
    if (isChanged) {
      openConfirmModal(confirmModal);
    } else {
      navigate({ to: "/presentation/request" });
    }
  };
  const footer = (
    <div className="flex justify-end gap-2 w-full">
      <Button
        onClick={next}
        disabled={
          isPending ||
          userContext.userContext === "" ||
          presentationAgentState.common_background === ""
        }
      >
        {isPending ? "..." : "リクエスト入力へ"}
      </Button>
    </div>
  );
  return (
    <CustomeCard
      title="あなたの背景情報と、プレゼン相手の背景情報を入力してください"
      description="これらの情報は、プレゼンの内容とペルソナを生成するために使用されます。"
      footer={footer}
    >
      <div className="flex flex-col gap-4">
        <div className="p-4 space-y-2">
          <label htmlFor="message" className="text-sm font-medium h-min-fit">
            あなたの背景情報
          </label>
          <Textarea
            id="message"
            placeholder="ここに入力..."
            value={userContext.userContext}
            onChange={(e) => updateUserContext(e.target.value)}
          />
        </div>
        <div className="p-4 space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            相手の背景情報
          </label>
          <Textarea
            id="message"
            placeholder="ここに入力..."
            value={presentationAgentState.common_background}
            onChange={(e) => updateCommonBackground(e.target.value)}
          />
        </div>
      </div>
    </CustomeCard>
  );
}
