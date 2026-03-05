# AI Movie Insight Builder 🎬

**Live Demo:** https://ai-movie-insight-r6cwhnd1l-aditya234313s-projects.vercel.app

AI Movie Insight Builder is a web application that allows users to enter an IMDb movie ID and instantly view movie details along with a sentiment analysis of audience reception.

The application fetches movie data using the OMDb API and analyzes the IMDb rating to classify audience sentiment as **Positive**, **Mixed**, or **Negative**.

---

## Features

* Search movies using IMDb ID
* Fetch movie details such as:

  * Title
  * Poster
  * Cast
  * Plot
  * IMDb Rating
* Sentiment classification based on rating
* Clean and responsive UI
* Error handling for invalid inputs
* Server-side API integration using Next.js

---

## Tech Stack

**Frontend**

* Next.js
* React
* Tailwind CSS

**Backend**

* Next.js API Routes

**API Integration**

* OMDb API

**Deployment**

* Vercel

---

## Project Architecture

User enters IMDb ID
↓
Frontend sends request to API Route
↓
Next.js API route fetches movie data from OMDb API
↓
Server processes rating and performs sentiment classification
↓
Data returned to frontend
↓
Movie information and sentiment displayed to the user

---

## Sentiment Logic

Sentiment classification is based on IMDb rating:

* Rating ≥ 7 → **Positive**
* Rating between 5 and 7 → **Mixed**
* Rating < 5 → **Negative**

This logic simulates an AI-based sentiment insight system.

---

## Setup Instructions (Run Locally)

1. Clone the repository

git clone https://github.com/aditya234313/ai-movie-insight.git

2. Navigate into the project folder

cd ai-movie-insight

3. Install dependencies

npm install

4. Create an environment file

Create a `.env.local` file and add:

OMDB_API_KEY=your_api_key_here

5. Run the development server

npm run dev

6. Open the app

http://localhost:3000

---

## Example IMDb IDs for Testing

| Movie           | IMDb ID   |
| --------------- | --------- |
| The Matrix      | tt0133093 |
| The Dark Knight | tt0468569 |
| Catwoman        | tt0327554 |

---

## Future Improvements

* Integrate real AI-based sentiment analysis
* Add user reviews scraping
* Improve UI animations
* Add movie search by title
* Add loading indicators

---

## Deployment

The application is deployed on Vercel for fast and reliable hosting.

---

## Author

Aditya Sharma
