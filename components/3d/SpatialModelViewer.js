'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96">
      <Loader2 className="w-8 h-8 animate-spin text-accent-600" />
    </div>
  )
})

export default function SpatialModelViewer({ data, title = '3D Spatial Model' }) {
  const [colorscale, setColorscale] = useState('Viridis')

  const plotData = [{
    type: 'scatter3d',
    mode: 'markers',
    x: data?.x || [],
    y: data?.y || [],
    z: data?.z || [],
    marker: {
      size: data?.size || 5,
      color: data?.values || [],
      colorscale: colorscale,
      showscale: true,
      colorbar: {
        title: data?.colorbarTitle || 'Value',
        thickness: 20,
        len: 0.7,
      },
    },
    text: data?.text || [],
    hovertemplate: '<b>X:</b> %{x}<br><b>Y:</b> %{y}<br><b>Z:</b> %{z}<br><b>Value:</b> %{marker.color}<extra></extra>',
  }]

  const layout = {
    title: {
      text: title,
      font: { size: 20, family: 'Poppins, sans-serif' }
    },
    autosize: true,
    scene: {
      xaxis: { title: 'X (m)', gridcolor: '#e2e8f0', showbackground: true },
      yaxis: { title: 'Y (m)', gridcolor: '#e2e8f0', showbackground: true },
      zaxis: { title: 'Z (m)', gridcolor: '#e2e8f0', showbackground: true },
      camera: {
        eye: { x: 1.5, y: 1.5, z: 1.5 }
      },
      aspectmode: 'cube',
    },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    margin: { l: 0, r: 0, t: 40, b: 0 },
  }

  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['toImage'],
    modeBarButtonsToAdd: [{
      name: 'Download as PNG',
      icon: {
        width: 857.1,
        height: 1000,
        path: 'm214-7h429v214h-429v-214z m500 0h72v500q0 8-6 21t-11 20l-157 156q-5 6-19 12t-22 5v-232q0-22-15-38t-38-16h-322q-22 0-37 16t-16 38v232h-72v-714h72v232q0 22 16 38t37 16h465q22 0 38-16t15-38v-232z',
        transform: 'matrix(1 0 0 -1 0 850)'
      },
      click: function(gd) {
        window.Plotly.downloadImage(gd, {
          format: 'png',
          width: 1200,
          height: 800,
          filename: 'spatial-model'
        })
      }
    }],
  }

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-display font-bold text-primary-900 dark:text-white">
          {title}
        </h3>
        <select
          value={colorscale}
          onChange={(e) => setColorscale(e.target.value)}
          className="input py-2 px-3 text-sm"
        >
          <option value="Viridis">Viridis</option>
          <option value="Jet">Jet</option>
          <option value="Hot">Hot</option>
          <option value="Earth">Earth</option>
          <option value="Portland">Portland</option>
          <option value="Rainbow">Rainbow</option>
        </select>
      </div>
      
      <div className="h-96 md:h-[500px] lg:h-[600px]">
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
        />
      </div>
    </div>
  )
}
