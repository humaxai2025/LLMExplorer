import React from "react";

interface Props {
  filter: string;
  setFilter: (v: string) => void;
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (v: string | null) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
}

const sortOptions = [
  { label: "Leaderboard Score (Best)", value: "leaderboard_score" },
  { label: "Model Name (A-Z)", value: "model" },
  { label: "Organization", value: "organization" },
  { label: "Parameters", value: "params" }
];

export default function FilterBar({
  filter,
  setFilter,
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
      <input
        className="rounded border border-gray-300 px-2 py-1 w-full sm:w-64"
        type="text"
        placeholder="Search model or org..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <select
        className="rounded border border-gray-300 px-2 py-1"
        value={selectedCategory ?? ""}
        onChange={e =>
          setSelectedCategory(e.target.value || null)
        }
      >
        <option value="">All Hardware Types</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        className="rounded border border-gray-300 px-2 py-1"
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
      >
        {sortOptions.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
