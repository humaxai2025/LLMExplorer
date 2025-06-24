import React from "react";
import LLMRow from "./LLMRow";
import { LLMItem } from "../App";

interface Props {
  llms: LLMItem[];
  filter: string;
  sortBy: string;
  selectedCategory: string | null;
}

function filterAndSort(
  llms: LLMItem[],
  filter: string,
  sortBy: string,
  selectedCategory: string | null
) {
  let out = llms;
  if (filter) {
    out = out.filter(llm =>
      [llm.model, llm.organization]
        .join(" ")
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  }
  if (selectedCategory) {
    out = out.filter(llm => (llm.hardware || "Unknown") === selectedCategory);
  }
  out = out.sort((a, b) => {
    if (sortBy === "model" || sortBy === "organization" || sortBy === "hardware") {
      return String(a[sortBy] ?? "").localeCompare(String(b[sortBy] ?? ""));
    }
    return (b[sortBy] ?? 0) - (a[sortBy] ?? 0);
  });
  return out;
}

export default function LLMTable({
  llms,
  filter,
  sortBy,
  selectedCategory
}: Props) {
  const rows = filterAndSort(llms, filter, sortBy, selectedCategory);
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-indigo-100">
            <th className="text-left px-3 py-2">Model</th>
            <th className="text-left px-3 py-2">Organization</th>
            <th className="text-left px-3 py-2">Params</th>
            <th className="text-left px-3 py-2">Hardware</th>
            <th className="text-left px-3 py-2">Score</th>
            <th className="text-left px-3 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-5 text-gray-500">
                No LLMs match your filter.
              </td>
            </tr>
          )}
          {rows.map(llm => (
            <LLMRow key={llm.model + llm.organization} llm={llm} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
