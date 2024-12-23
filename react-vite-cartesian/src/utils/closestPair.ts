type Point = { x: number; y: number };

export function findClosestPair(points: Point[]): { point1: Point; point2: Point; distance: number } {
  if (points.length < 2) throw new Error("At least two points are required.");
  
  const dist = (p1: Point, p2: Point): number => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

  const merge = (left: Point[], right: Point[]): Point[] => {
    const result: Point[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i].y <= right[j].y) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  };

  const closestPairRecursive = (sortedX: Point[], sortedY: Point[]): { point1: Point; point2: Point; distance: number } => {
    if (sortedX.length <= 3) {
      let minDist = Infinity;
      let p1, p2;
      for (let i = 0; i < sortedX.length; i++) {
        for (let j = i + 1; j < sortedX.length; j++) {
          const d = dist(sortedX[i], sortedX[j]);
          if (d < minDist) {
            minDist = d;
            p1 = sortedX[i];
            p2 = sortedX[j];
          }
        }
      }
      return { point1: p1!, point2: p2!, distance: minDist };
    }

    const mid = Math.floor(sortedX.length / 2);
    const midPoint = sortedX[mid];

    const leftX = sortedX.slice(0, mid);
    const rightX = sortedX.slice(mid);
    const leftY = sortedY.filter((p) => p.x <= midPoint.x);
    const rightY = sortedY.filter((p) => p.x > midPoint.x);

    const leftPair = closestPairRecursive(leftX, leftY);
    const rightPair = closestPairRecursive(rightX, rightY);
    let bestPair = leftPair.distance < rightPair.distance ? leftPair : rightPair;

    const mergedY = merge(leftY, rightY);
    const strip = mergedY.filter((p) => Math.abs(p.x - midPoint.x) < bestPair.distance);
    
    for (let i = 0; i < strip.length; i++) {
      for (let j = i + 1; j < strip.length && strip[j].y - strip[i].y < bestPair.distance; j++) {
        const d = dist(strip[i], strip[j]);
        if (d < bestPair.distance) {
          bestPair = { point1: strip[i], point2: strip[j], distance: d };
        }
      }
    }

    return bestPair;
  };

  const sortedX = points.slice().sort((a, b) => a.x - b.x);
  const sortedY = points.slice().sort((a, b) => a.y - b.y);
  return closestPairRecursive(sortedX, sortedY);
}
