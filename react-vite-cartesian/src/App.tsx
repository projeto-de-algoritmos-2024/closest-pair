import React, { useState } from "react";
import { findClosestPair } from "./utils/closestPair";

type Point = { x: number; y: number };

const App: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [closestPair, setClosestPair] = useState<{ point1: Point; point2: Point } | null>(null);

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoints = [...points, { x, y }];
    setPoints(newPoints);

    if (newPoints.length > 1) {
      const result = findClosestPair(newPoints);
      setClosestPair({ point1: result.point1, point2: result.point2 });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Closest Pair of Points</h1>
      <svg
        onClick={handleCanvasClick}
        width={800}
        height={600}
        style={{ border: "1px solid black", cursor: "crosshair" }}
      >
        {points.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r={5} fill="blue" />
        ))}
        {closestPair && (
          <line
            x1={closestPair.point1.x}
            y1={closestPair.point1.y}
            x2={closestPair.point2.x}
            y2={closestPair.point2.y}
            stroke="red"
            strokeWidth={2}
          />
        )}
      </svg>
    </div>
  );
};

export default App;
