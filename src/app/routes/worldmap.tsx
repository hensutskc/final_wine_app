import { useEffect, useRef } from "react"; /* useEffect allows google to draw the map while useRef uses the html code */

declare global { /*telling the code to source from google (a global element)*/
  interface Window {
    google: any; /* use google to find the chart map and the any stops it from giving error*/
  }
}

export default function WorldMap() { /* creates the function of world map - can call on it throughout the program, making the program flexible */
  const chartRef = useRef<HTMLDivElement>(null); /* shows where the map should go once it has been called upon */

  useEffect(() => { /* once the world map loads, run this code etc*/
    const drawMap = () => {
      window.google.charts.load("current", { /* talkng to the chart, getting read to add the data(clean slate) */
        packages: ["geochart"], /* makes sure the geo chart is the chart loaded*/
      });

      window.google.charts.setOnLoadCallback(() => { /* loads the most up to date geochart */
        const data = window.google.visualization.arrayToDataTable([ /* makes the data ready to be plaecd into chart */
          ["Country", "Popularity"],
          ["Germany", 200],
          ["United States", 800],
          ["Brazil", 400],
          ["Canada", 200],
          ["France", 600],
          ["RU", 700],
        ]);

        const options = {
                backgroundColor: "transparent",
                colorAxis: {
                    colors: ["#dfd094", "#c9bb73", "#b09332"], },

        }; /* use defult */

        const chart = new window.google.visualization.GeoChart(
          chartRef.current
        );

        chart.draw(data, options);
      });
    };

    // Check if Google Charts has already been loaded
    if (!window.google) {
      const script = document.createElement("script"); /* creates script for the chart to be loaded*/

      script.src = "https://www.gstatic.com/charts/loader.js";
      script.async = true;

      script.onload = drawMap; /* when google loads, draw map */

      document.head.appendChild(script);
    } else {
      drawMap();
    }
  }, []);

  return ( /* apperance of the map */
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
}