"use client";

import { useState } from "react";

export default function Home() {
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!movieId.trim()) {
      setError("Please enter a valid IMDb ID.");
      return;
    }

    setLoading(true);
    setError("");
    setMovie(null);

    try {
      const res = await fetch(`/api/movie?id=${movieId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setMovie(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sentimentColor =
    movie?.sentiment === "Positive"
      ? "bg-green-500"
      : movie?.sentiment === "Mixed"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center p-6">

      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-wide">
        🎬 AI Movie Insight Builder
      </h1>

      {/* Search Box */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter IMDb ID (e.g., tt0133093)"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className="flex-1 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white transition"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-4 bg-white text-black font-semibold rounded-xl hover:scale-105 transition-transform duration-200"
        >
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-8 animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-6 text-red-400 font-medium">{error}</p>
      )}

      {/* Movie Card */}
      {movie && (
        <div className="mt-10 w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8 transition-all duration-300">

          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-64 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />

            <div className="flex-1">
              <h2 className="text-3xl font-bold">
                {movie.title} ({movie.year})
              </h2>

              <p className="mt-3 text-lg">
                ⭐ IMDb Rating: {movie.rating}
              </p>

              <p className="mt-3">
                <strong>Cast:</strong> {movie.cast}
              </p>

              <p className="mt-4 text-gray-300 leading-relaxed">
                {movie.plot}
              </p>

              {/* Sentiment Badge */}
              <div className="mt-6">
                <span
                  className={`px-4 py-2 rounded-full text-white font-semibold ${sentimentColor}`}
                >
                  {movie.sentiment}
                </span>
              </div>

              {/* AI Insight */}
              <div className="mt-6 bg-white/5 p-5 rounded-xl border border-gray-600">
                <h3 className="text-lg font-semibold mb-2">
                  AI Audience Insight
                </h3>
                <p className="text-gray-300 whitespace-pre-line">
                  {movie.aiSummary}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}