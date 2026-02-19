import { useState, useEffect, useCallback } from "react";

// Use the APOD `count` param to fetch multiple random images in ONE request.
// This avoids the 429 rate-limit issue that occurs when firing many individual requests.
const API_KEY = import.meta.env.VITE_NASA_API_KEY ?? "DEMO_KEY";

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
        // Request extra to account for videos being filtered out
        const requestCount = count + 8;
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${requestCount}`
        );

        if (!res.ok) throw new Error(`NASA API error: ${res.status}`);

        const data = await res.json();

        // Filter to images only (APOD sometimes returns videos)
        const images = data.filter((item) => item.media_type === "image");

        if (images.length < count) {
          throw new Error("Not enough images returned. Try again.");
        }

        if (!cancelled) {
          const mapped = images.slice(0, count).map((apod) => ({
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