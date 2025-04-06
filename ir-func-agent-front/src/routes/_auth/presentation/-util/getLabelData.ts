import { TPresentationAgentState } from "@/types/type";

export type TProcessLabel = {
  order: number;
  label: string;
  title: string;
  description: string;
  href: string;
  condition: (agentState: TPresentationAgentState) => boolean;
};

export const processLabels: TProcessLabel[] = [
  {
    order: 1,
    label: "背景",
    title: "背景",
    description: "背景を入力してください",
    href: "/presentation/background",
    condition: (agentState: TPresentationAgentState) => {
      return true;
    },
  },
  {
    order: 2,
    label: "Agentへのリクエスト",
    title: "Agentへのリクエスト",
    description: "Agentへのリクエストを入力してください",
    href: "/presentation/request",
    condition: (agentState: TPresentationAgentState) => {
      return true;
    },
  },
  {
    order: 3,
    label: "ペルソナ",
    title: "ペルソナ",
    description: "ペルソナを入力してください",
    href: "/presentation/persona",
    condition: (agentState: TPresentationAgentState) => {
      return agentState.persona_list.length > 0;
    },
  },
  {
    order: 4,
    label: "Result",
    title: "結果",
    description: "結果を入力してください",
    href: "/presentation/result",
    condition: (agentState: TPresentationAgentState) => {
      return agentState.presentation !== null && agentState.interview_result.length > 0;
    },
  },
];
