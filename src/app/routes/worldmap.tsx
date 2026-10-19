
import { useEffect, useRef } from "react"; // imports react hooks 
declare global {
  interface Window {
    google: any; // allows for the google chart library to be recognised
  }
}

export default function WorldMap() { // creates the worldmap component
  const chartRef = useRef<HTMLDivElement>(null); // references how the map is coded in HTML

  useEffect(() => { // runs the map set up
    let cancelled = false; // checks if the component has been removed

    const drawMap = () => { // creating the fucnction that creates the map
      window.google.charts.load("current", { // loads the google chat library
        packages: ["geochart"], // chooses the geochart option for world map
      });

      window.google.charts.setOnLoadCallback(async () => { // waits untill google chart is ready before continuing
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/wines-by-country"
          ); // this requests wines from the seperate API server that stored the counted tally

          if (!response.ok) { // makes sure that the wine data is recived
            throw new Error("Failed to retrieve wine data"); // incase of error, the program can still run
          }

          const wines: { country: string; count: number }[] =
            await response.json(); // converts into stirngs and numbers for javascript

          if (cancelled || !chartRef.current) return; // stops if the program is no longer running

          const chartData = [ // creates the table for the data to be read by the geochart
            ["Country", "Number of Wines"], // gives the table collums a titl
            ...wines.map((wine) => [wine.country, wine.count]), // puts country and count into a row
          ];

          const data =
            window.google.visualization.arrayToDataTable(chartData); // makes it readable for google chart

          const options = { // creates the apperance of the map
            backgroundColor: "transparent", // bg transparent
            colorAxis: { // changes of colour for wine tally
              colors: ["#dfd094", "#c9bb73", "#b09332"], // gold scheme
            },
          };

          const chart = new window.google.visualization.GeoChart(
            chartRef.current
          ); // makes the map inside the html element

          chart.draw(data, options); // draws the map using the data retrived

        } catch (error) { // error handeling when dealing with data reading
          if (!cancelled) {
            console.error("Error loading wine map:", error); // displays the error if nesessary
          }
        }
      });
    };

    if (!window.google?.charts) { // checks wether the chart is already avalible
      const script = document.createElement("script"); // creates a "script" element to see if its alread loaded

      script.src = "https://www.gstatic.com/charts/loader.js"; // google chart library url
      script.async = true; // allows the script to run without blocking the page

      script.onload = () => { // only runs when the google chart script has loaded
        if (!cancelled) drawMap(); // loads the map only if the component exists
      };

      document.head.appendChild(script); // adding the script to the app
    } else {
      drawMap(); // loads the map instatnly if the chart is already loaded
    }

    return () => { // when something is removed, this continues the code running
      cancelled = true; // prevents and outdated map from being drawn
    };
  }, []);

  return ( // returns the html that displays the map
    <div
      ref={chartRef}
      style={{
        width: "100%", // makes the map fill the container
        height: "500px", // sets the map high at 500px
      }}
    />
  );
}
