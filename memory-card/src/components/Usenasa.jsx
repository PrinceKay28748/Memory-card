import { useState, useEffect, useCallback } from "react";

// NASA APOD API — generates dates going back from today
function getPastDates(count) {
  const dates = [];
  const today = new Date();
  // Start 5 days back to avoid today possibly being unavailable
  for (let i = 5; i < count + 50; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    // APOD starts June 16, 1995
    if (d >= new Date("1995-06-16")) {
      dates.push(d.toISOString().split("T")[0]);
    }
  }
  // Shuffle and pick `count`
  for (let i = dates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dates[i], dates[j]] = [dates[j], dates[i]];
  }
  return dates.slice(0, count);
}

// NASA demo key has rate limits — using DEMO_KEY is fine for portfolio projects.
// Users can replace with their own key from https://api.nasa.gov
const API_KEY = "DEMO_KEY";

export default function useNASA(count = 12) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => setTrigger((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function fetchImages() {
      setLoading(true);
      setError(null);

      try {
        const dates = getPastDates(count * 3); // fetch extra, filter out videos
        const results = [];

        // Fetch in batches until we have `count` images
        for (let i = 0; i < dates.length && results.length < count; i += 10) {
          const batch = dates.slice(i, i + 10);
          const responses = await Promise.all(
            batch.map((date) =>
              fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
              ).then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
              })
            )
          );
          // Only keep image type (not videos)
          const images = responses.filter((r) => r.media_type === "image");
          results.push(...images);
          if (results.length >= count) break;
        }

        if (!cancelled) {
          const mapped = results.slice(0, count).map((apod) => ({
            id: apod.date,
            title: apod.title,
            image: apod.url,
            date: new Date(apod.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            copyright: apod.copyright?.trim() || "NASA",
          }));
          setCards(mapped);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchImages();
    return () => {
      cancelled = true;
    };
  }, [count, trigger]);

  return { cards, loading, error, refetch };
}