import { useState } from "react";
import { SuggestionResult } from "@/types/type";

export const ColorAgentInput = ({
  setResult,
}: {
  setResult: (result: SuggestionResult | null) => void;
}) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const callApi = async (purpose: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_COLOR_AGENT_ENDPOINT}/color`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purpose }),
      }
    );
    const data = (await response.json()) as SuggestionResult;
    return data;
  };
  const clickHandler = async (purpose: string) => {
    setIsLoading(true);
    const result = await callApi(purpose);
    setResult(result);
    setIsLoading(false);
  };
  const resetHandler = () => {
    setResult(null);
    setInputText("");
  };
  return (
    <div className="p-2 bg-white w-full shadow-md rounded-md mt-10">
      <label className="block text-sm font-medium text-gray-700">
        色への要求(具体的にどういったものに使うのか)
      </label>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={5}
        placeholder="ここに入力してください..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <button
        className="w-full mb-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        onClick={() => clickHandler(inputText)}
        disabled={isLoading || inputText.length === 0}
      >
        {isLoading ? "解析中..." : "送信"}
      </button>
      <button
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 transition disabled:opacity-50"
        onClick={resetHandler}
        disabled={isLoading}
      >
        reset
      </button>
    </div>
  );
};
