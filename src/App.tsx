import React, { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";
import LLMTable from "./components/LLMTable";

export interface LLMItem {
  model: string;
  organization: string;
  params: number;
  hardware: string;
  avg: number;
  leaderboard_score: number;
  tasks: string[]; // not always present
  license: string;
  description: string; // not always present
  [key: string]: any;  // for unknown keys
}

const DATA_URL =
  "https://huggingface.co/api/spaces/HuggingFaceH4/open_llm_leaderboard/leaderboard";

function App() {
  const [llms, setLlms] = useState<LLMItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("leaderboard_score");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((json) => {
        setLlms(json.rows || []);
        setLoading(false);
      });
  }, []);

  const categories = [
    ...new Set(llms.map((llm) => llm.hardware || "Unknown")),
  ].filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto py-8 px-2">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
        Live LLM Dashboard
      </h1>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="mt-4">
        {loading ? (
          <div className="text-center text-lg text-gray-600">Loading LLMs...</div>
        ) : (
          <LLMTable
            llms={llms}
            filter={filter}
            sortBy={sortBy}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
      <footer className="mt-16 text-center text-gray-400 text-sm">
        Powered by the Hugging Face Open LLM Leaderboard &mdash; Deployed on Vercel
      </footer>
    </div>
  );
}

export default App;
