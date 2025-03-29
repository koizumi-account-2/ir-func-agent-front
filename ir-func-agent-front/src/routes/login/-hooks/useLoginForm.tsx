import { useLogin } from "@/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
const validationSchema = z.object({
  //   /** 名前 */
  //   nickname: z.string().min(1, { message: "名前を入力してください" }),
  //   /** 年齢 */
  //   age: z
  //     .number({ message: "年齢を半角数字で入力してください" })
  //     .int({ message: "年齢を整数で入力してください" })
  //     .gte(12, { message: "年齢を12歳以上で入力してください" }),
  /** メールアドレス */
  email: z
    .string()
    .min(1, { message: "メールアドレスを入力してください" })
    .email({ message: "メールアドレスの形式で入力してください" })
    .max(30, { message: "正しく入力してください" }),
  password: z.string().min(1, { message: "パスワードを入力してください" }),
});

export type UserLoginInputs = z.infer<typeof validationSchema>;

export const useLoginForm = (afterLogin: () => void) => {
  const { login, loading, error } = useLogin();
  const form = useForm<UserLoginInputs>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = async (values: UserLoginInputs) => {
    console.log(values);
    await login({ username: values.email, password: values.password });
    afterLogin();
  };
  return { form, onSubmit, loading, error };
};
