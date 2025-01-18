"use client";

import Header from "@/components/Header";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import ListItem from "@/components/ListItem";

export default function Home() {
  const router = useRouter();

  const handleStartJogging = () => {
    const startTime = new Date().toISOString(); // Record the current start time

    // Use browser's geolocation to get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Pass start time and start location as query parameters
        router.push(
          `/jogging?start_time=${encodeURIComponent(startTime)}&start_lat=${latitude}&start_lng=${longitude}`
        );
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to get your location. Please enable location services.");
      }
    );
  };

  return (
    <div
      className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    "
    >
      <Header>
        <div className="mb-2">
          <h1
            className="
              text-white
              text-3xl
              sont-semibold
            "
          >
            Welcome to Jogging the world!
          </h1>
        </div>
      </Header>
      <div>
        <ListItem image="/plogging.jpg" name="Liked Songs" href="/liked" />
      </div>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            <div>
              <Button onClick={handleStartJogging}>Start Jogging</Button>
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}
