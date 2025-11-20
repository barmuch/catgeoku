'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Loader2, Calculator } from 'lucide-react'

const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96">
      <Loader2 className="w-8 h-8 animate-spin text-accent-600" />
    </div>
  )
})

// Inverse Distance Weighting interpolation
function idwInterpolation(points, gridX, gridY, power = 2) {
  const result = []
  
  for (let i = 0; i < gridY.length; i++) {
    const row = []
    for (let j = 0; j < gridX.length; j++) {
      let weightSum = 0
      let valueSum = 0
      
      for (const point of points) {
        const distance = Math.sqrt(
          Math.pow(gridX[j] - point.x, 2) + 
          Math.pow(gridY[i] - point.y, 2)
        )
        
        if (distance < 0.0001) {
          weightSum = 1
          valueSum = point.value
          break
        }
        
        const weight = 1 / Math.pow(distance, power)
        weightSum += weight
        valueSum += weight * point.value
      }
      
      row.push(valueSum / weightSum)
    }
    result.push(row)
  }
  
  return result
}

export default function IDWVolumeCalculator() {
  const [points, setPoints] = useState([
    { x: 0, y: 0, z: 100, value: 0.25 },
    { x: 100, y: 0, z: 150, value: 0.30 },
    { x: 0, y: 100, z: 120, value: 0.28 },
    { x: 100, y: 100, z: 140, value: 0.32 },
  ])
  
  const [cutoff, setCutoff] = useState(0.25)
  const [power, setPower] = useState(2)
  const [resolution, setResolution] = useState(20)

  const { gridX, gridY, interpolated, volume } = useMemo(() => {
    const xMin = Math.min(...points.map(p => p.x))
    const xMax = Math.max(...points.map(p => p.x))
    const yMin = Math.min(...points.map(p => p.y))
    const yMax = Math.max(...points.map(p => p.y))
    
    const gridX = Array.from(
      { length: resolution }, 
      (_, i) => xMin + (xMax - xMin) * i / (resolution - 1)
    )
    const gridY = Array.from(
      { length: resolution }, 
      (_, i) => yMin + (yMax - yMin) * i / (resolution - 1)
    )
    
    const interpolated = idwInterpolation(points, gridX, gridY, power)
    
    // Calculate volume above cutoff
    const cellArea = ((xMax - xMin) / (resolution - 1)) * ((yMax - yMin) / (resolution - 1))
    let totalVolume = 0
    
    interpolated.forEach(row => {
      row.forEach(value => {
        if (value >= cutoff) {
          totalVolume += value * cellArea
        }
      })
    })
    
    return { gridX, gridY, interpolated, volume: totalVolume }
  }, [points, cutoff, power, resolution])

  const plotData = [{
    type: 'contour',
    x: gridX,
    y: gridY,
    z: interpolated,
    colorscale: 'Jet',
    contours: {
      start: 0,
      end: 0.4,
      size: 0.05,
    },
    colorbar: {
      title: 'Value',
      thickness: 20,
    },
  }, {
    type: 'scatter',
    mode: 'markers+text',
    x: points.map(p => p.x),
    y: points.map(p => p.y),
    text: points.map(p => p.value.toFixed(2)),
    textposition: 'top center',
    marker: {
      size: 12,
      color: 'white',
      line: { color: 'black', width: 2 }
    },
    name: 'Data Points',
  }]

  const layout = {
    title: 'IDW Interpolation - Contour Map',
    xaxis: { title: 'X (m)' },
    yaxis: { title: 'Y (m)' },
    autosize: true,
    margin: { l: 60, r: 80, t: 40, b: 60 },
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="card p-6">
        <h3 className="text-xl font-display font-bold text-primary-900 dark:text-white mb-6 flex items-center">
          <Calculator className="w-6 h-6 mr-2 text-accent-600" />
          IDW Volume Calculator
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">
              Cut-off Value
            </label>
            <input
              type="range"
              min="0"
              max="0.4"
              step="0.01"
              value={cutoff}
              onChange={(e) => setCutoff(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2 text-lg font-bold text-accent-600">
              {cutoff.toFixed(2)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">
              Power Factor
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={power}
              onChange={(e) => setPower(parseFloat(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2 text-lg font-bold text-accent-600">
              {power.toFixed(1)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary-700 dark:text-primary-300 mb-2">
              Grid Resolution
            </label>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={resolution}
              onChange={(e) => setResolution(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center mt-2 text-lg font-bold text-accent-600">
              {resolution} × {resolution}
            </div>
          </div>
        </div>

        {/* Volume Result */}
        <div className="mt-6 p-4 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl text-white">
          <div className="text-sm font-semibold mb-1">Calculated Volume (above cut-off)</div>
          <div className="text-3xl font-display font-bold">
            {volume.toFixed(2)} m³
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="card p-6">
        <div className="h-96 md:h-[500px]">
          <Plot
            data={plotData}
            layout={layout}
            config={{ responsive: true, displaylogo: false }}
            style={{ width: '100%', height: '100%' }}
            useResizeHandler={true}
          />
        </div>
      </div>

      {/* Data Points Table */}
      <div className="card p-6">
        <h4 className="text-lg font-display font-bold text-primary-900 dark:text-white mb-4">
          Data Points
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-100 dark:bg-primary-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary-700 dark:text-primary-300">X (m)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary-700 dark:text-primary-300">Y (m)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary-700 dark:text-primary-300">Z (m)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary-700 dark:text-primary-300">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-200 dark:divide-primary-700">
              {points.map((point, index) => (
                <tr key={index} className="hover:bg-primary-50 dark:hover:bg-primary-800/50">
                  <td className="px-4 py-3 text-primary-900 dark:text-primary-100">{point.x}</td>
                  <td className="px-4 py-3 text-primary-900 dark:text-primary-100">{point.y}</td>
                  <td className="px-4 py-3 text-primary-900 dark:text-primary-100">{point.z}</td>
                  <td className="px-4 py-3 text-primary-900 dark:text-primary-100 font-semibold">{point.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
