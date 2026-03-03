export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // Validate IMDb ID
  if (!id || !id.startsWith("tt")) {
    return Response.json(
      { error: "Please provide a valid IMDb ID (e.g., tt0133093)." },
      { status: 400 }
    );
  }

  try {
    // Fetch movie from OMDb
    const res = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`
    );

    const movieData = await res.json();

    if (movieData.Response === "False") {
      return Response.json(
        { error: "Movie not found." },
        { status: 404 }
      );
    }

    // --- Sentiment Logic ---
    function analyzeSentiment(rating) {
      const score = parseFloat(rating);

      if (isNaN(score)) return "Mixed";
      if (score >= 7.5) return "Positive";
      if (score >= 5) return "Mixed";
      return "Negative";
    }

    const sentiment = analyzeSentiment(movieData.imdbRating);

    // --- Generate AI-style Summary ---
    const summary = `
"${movieData.Title}" (${movieData.Year}) has an IMDb rating of ${movieData.imdbRating}.

The film stars ${movieData.Actors}.

Based on its overall rating and audience reception, the sentiment appears to be ${sentiment}.

Plot Overview:
${movieData.Plot}
`;

    // Return clean structured response
    return Response.json({
      title: movieData.Title,
      year: movieData.Year,
      poster: movieData.Poster,
      rating: movieData.imdbRating,
      cast: movieData.Actors,
      plot: movieData.Plot,
      aiSummary: summary,
      sentiment: sentiment,
    });

  } catch (error) {
    console.error("Server Error:", error);
    return Response.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}