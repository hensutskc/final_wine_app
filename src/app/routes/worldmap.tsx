
import { useEffect, useRef } from "react"; // Imports React hooks for loading the map and referencing its HTML element

declare global {
  interface Window {
    google: any; // Allows TypeScript to recognise the Google Charts library
  }
}

export default function WorldMap() { // Creates the WorldMap component
  const chartRef = useRef<HTMLDivElement>(null); // References the HTML element where the map will appear

  useEffect(() => { // Runs the map setup when the component mounts
    let cancelled = false; // Tracks whether the component has been removed

    const drawMap = () => { // Creates the function responsible for loading the map
      window.google.charts.load("current", { // Loads the Google Charts library
        packages: ["geochart"], // Specifies the GeoChart package
      });

      window.google.charts.setOnLoadCallback(async () => { // Waits until Google Charts is ready
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/wines-by-country"
          ); // Requests the wine counts from the FastAPI server

          if (!response.ok) { // Checks whether the API request succeeded
            throw new Error("Failed to retrieve wine data");
          }

          const wines: { country: string; count: number }[] =
            await response.json(); // Converts the API's JSON response into JavaScript data

          if (cancelled || !chartRef.current) return; // Stops if the component is no longer mounted

          const chartData = [ // Creates the data table for Google GeoChart
            ["Country", "Number of Wines"], // Defines the two column headings
            ...wines.map((wine) => [wine.country, wine.count]), // Converts each country and count into a chart row
          ];

          const data =
            window.google.visualization.arrayToDataTable(chartData); // Converts the rows into a Google Charts DataTable

          const options = { // Defines the appearance of the map
            backgroundColor: "transparent", // Keeps the map background transparent
            colorAxis: { // Controls the colours of countries based on their wine counts
              colors: ["#dfd094", "#c9bb73", "#b09332"], // Preserves your existing gold colour scheme
            },
          };

          const chart = new window.google.visualization.GeoChart(
            chartRef.current
          ); // Creates the map inside the referenced HTML element

          chart.draw(data, options); // Draws the map using the Excel country counts

        } catch (error) { // Handles errors when retrieving or displaying data
          if (!cancelled) {
            console.error("Error loading wine map:", error); // Displays the error in the browser console
          }
        }
      });
    };

    if (!window.google?.charts) { // Checks whether Google Charts is already available
      const script = document.createElement("script"); // Creates a script element to load Google Charts

      script.src = "https://www.gstatic.com/charts/loader.js"; // Sets the Google Charts library URL
      script.async = true; // Allows the script to load without blocking the page

      script.onload = () => { // Runs once the Google Charts script has loaded
        if (!cancelled) drawMap(); // Loads the map if the component still exists
      };

      document.head.appendChild(script); // Adds the script to the webpage
    } else {
      drawMap(); // Loads the map immediately if Google Charts is already available
    }

    return () => { // Cleans up when the component is removed
      cancelled = true; // Prevents pending requests from drawing an outdated map
    };
  }, []);

  return ( // Returns the HTML element that displays the map
    <div
      ref={chartRef}
      style={{
        width: "100%", // Makes the map fill the width of its container
        height: "500px", // Sets the map height
      }}
    />
  );
}
