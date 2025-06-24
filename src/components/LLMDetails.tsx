import React from "react";
import { LLMItem } from "../App";

export default function LLMDetails({ llm }: { llm: LLMItem }) {
  // Friendly explanation for laypersons
  const capability = (() => {
    if (llm.avg && llm.avg > 70)
      return "Excellent at understanding and generating human-like text.";
    if (llm.avg && llm.avg > 60)
      return "Very good for most text tasks, including writing, answering questions, and summaries.";
    if (llm.avg && llm.avg > 50)
      return "Good for many tasks, but might be weaker on tricky or technical topics.";
    return "May be useful for experimentation and simple tasks.";
  })();

  return (
    <div className="bg-indigo-100 rounded p-4 text-gray-800">
      <div className="mb-2">
        <span className="font-bold">Model:</span> {llm.model}
      </div>
      <div className="mb-2">
        <span className="font-bold">Organization:</span> {llm.organization}
      </div>
      <div className="mb-2">
        <span className="font-bold">Parameters:</span> {llm.params ? llm.params.toLocaleString() : "—"}
      </div>
      <div className="mb-2">
        <span className="font-bold">License:</span> {llm.license ?? "—"}
      </div>
      <div className="mb-2">
        <span className="font-bold">General Capability:</span> {capability}
      </div>
      <div className="mb-2">
        <span className="font-bold">Score:</span> {llm.leaderboard_score?.toFixed(2) ?? "—"}
      </div>
      {llm.description && (
        <div className="mb-2">
          <span className="font-bold">Description:</span> {llm.description}
        </div>
      )}
      <div className="mb-2">
        <span className="font-bold">Best For:</span>{" "}
        {llm.tasks ? llm.tasks.join(", ") : "—"}
      </div>
      {/* Link to HuggingFace model if possible */}
      <div>
        <a
          href={`https://huggingface.co/${llm.organization}/${llm.model}`}
          className="text-indigo-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Hugging Face
        </a>
      </div>
    </div>
  );
}
