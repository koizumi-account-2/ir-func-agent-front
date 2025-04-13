import { QueryClient } from "@tanstack/react-query";

export type AuthContext = {
  isLogged: () => UserInfo | null;
};

export type UserInfo = {
  userID: string;
  email: string;
  role: string[];
};
export type TUserContextInput = {
    id?: string;
    userContext: string | null;
    totalTokens: number | null;
}
export type TUserContext = {
  id?: string;
  userContext: string;
  totalTokens: number;
};

export type RouterContext = {
  auth: AuthContext;
  queryClient: QueryClient;
};

export type TConfirmModal = {
  title: string;
  isOpen: boolean;
  description: string;
  execLabel?: string;
  cancelLabel?: string;
  execHandler?: () => void;
  cancelHandler?: () => void;
};

export type TPersona = {
  name: string;
  background: string;
};

export type TInterviewContent = {
  persona: TPersona;
  question: string;
  answer: string;
};

export type TPresentationContent = {
  content_name: string;
  content_purpose: string;
  content_detail: string;
  content_time: number;
};

export type TPresentation = {
  title: string;
  contents: TPresentationContent[];
};

export type TPresentationAgentState = {
  thread_id: string;
  common_background: string;
  user_request: string;
  persona_list: TPersona[];
  persona_confirmed: boolean;
  interview_result: TInterviewContent[];
  iteration: number;
  is_satisfied: boolean;
  presentation: TPresentation | null;
};


// COLOR AGENT
export type Suggestion = {
  color: string;
  name: string;
  reason: string;
};

export type Purpose = {
  tone: string;
  user_context: string;
  target_user: string;
  emotion: string;
};

export type SuggestionResult = {
  purpose: Purpose;
  suggestions: Suggestion[];
  judge_reason: string;
};
