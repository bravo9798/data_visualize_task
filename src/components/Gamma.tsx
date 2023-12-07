import React, { useEffect, useState } from 'react';
import wineData from '../data/winedata';

// Define the type for each point in the dataset
interface WinePoint {
  Alcohol: any;
  Ash: any;
  Hue: any;
  Magnesium: any;
}

// Function to calculate gamma for a given data point
const calculateGamma = (point: WinePoint): number => (point.Ash * point.Hue) / point.Magnesium;

// Function to calculate statistics for the gamma values
const calculateStats = (data: WinePoint[]) => {
  // Utility function to calculate mean
  const calculateMean = (values: number[]): number => values.reduce((acc, val) => acc + val, 0) / values.length;

  // Utility function to calculate median
  const calculateMedian = (values: number[]): number => {
    const sortedValues = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);
    return sortedValues.length % 2 === 0
      ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
      : sortedValues[middle];
  };

  // Utility function to calculate mode
  const calculateMode = (values: number[]): number => {
    const countMap: Record<string, number> = {};
    values.forEach((val) => {
      countMap[val.toString()] = (countMap[val.toString()] || 0) + 1;
    });

    let mode: number | null = null;
    let maxCount = 0;

    for (const val in countMap) {
      if (countMap[val] > maxCount) {
        mode = Number(val);
        maxCount = countMap[val];
      }
    }

    return mode !== null ? mode : 0;
  };

  // Extract unique classes from the data
  const uniqueClasses = [...new Set(data.map((item) => item.Alcohol))];

  // Object to store calculated statistics
  const stats = {
    mean: {} as Record<string, number>,
    median: {} as Record<string, number>,
    mode: {} as Record<string, number>,
  };

  // Calculate statistics for each class
  uniqueClasses.forEach((currentClass) => {
    const classData = data.filter((item) => item.Alcohol === currentClass);
    const gammaValues = classData.map(calculateGamma);

    // Store calculated statistics for each class
    stats.mean[currentClass] = calculateMean(gammaValues);
    stats.median[currentClass] = calculateMedian(gammaValues);
    stats.mode[currentClass] = calculateMode(gammaValues);
  });

  return stats;
};

const GammaStats: React.FC = () => {
  const [stats, setStats] = useState(calculateStats(wineData));

  // Update statistics when wineData changes
  useEffect(() => {
    setStats(calculateStats(wineData));
  }, [wineData]);

  console.log(stats, "stat");

  return (
    <div>
      <h1>Gamma Statistics</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(stats.mean).map((currentClass) => (
              <th key={currentClass}>Class {currentClass}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mean Gamma</td>
            {Object.values(stats.mean).map((mean, index) => (
              <td key={index}>{mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Median Gamma</td>
            {Object.values(stats.median).map((median, index) => (
              <td key={index}>{median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Mode Gamma</td>
            {Object.values(stats.mode).map((mode, index) => (
              <td key={index}>{mode.toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GammaStats;
