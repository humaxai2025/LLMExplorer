import React, { useState } from "react";
import LLMDetails from "./LLMDetails";
import { LLMItem } from "../App";

interface Props {
  llm: LLMItem;
}

export default function LLMRow({ llm }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr className={expanded ? "bg-indigo-50" : ""}>
        <td className="px-3 py-2 font-semibold text-indigo-800 cursor-pointer" onClick={() => setExpanded(e => !e)}>
          {llm.model}
        </td>
        <td className="px-3 py-2">{llm.organization}</td>
        <td className="px-3 py-2">{llm.params ? llm.params.toLocaleString() : "—"}</td>
        <td className="px-3 py-2">{llm.hardware ?? "—"}</td>
        <td className="px-3 py-2">{llm.leaderboard_score?.toFixed(2) ?? "—"}</td>
        <td className="px-3 py-2">
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-indigo-600 underline"
          >
            {expanded ? "Hide" : "Show"}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={6} className="px-5 pb-4">
            <LLMDetails llm={llm} />
          </td>
        </tr>
      )}
    </>
  );
}
