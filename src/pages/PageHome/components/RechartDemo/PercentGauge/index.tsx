'use client'

import { useEffect, useState, useRef } from 'react'
import { PieChart, Pie, ResponsiveContainer, Cell, Label } from 'recharts'

const data = [{ name: 'Perecent', value: 100 }]

const RADIAN = Math.PI / 180

const needle = (options: any) => {
  const { value, data, cx, cy, iR, oR, color } = options

  let total = 0
  data.forEach((v: any) => {
    total += v.value
  })
  const ang = 180.0 * (1 - value / total)
  const length = (iR + 2 * oR) / 3
  const sin = Math.sin(-RADIAN * ang)
  const cos = Math.cos(-RADIAN * ang)
  const r = 4 // fatness of needle.
  const x0 = cx //! + 5
  const y0 = cy //! + 5
  const xba = x0 + r * sin
  const yba = y0 - r * cos
  const xbb = x0 - r * sin
  const ybb = y0 + r * cos
  const xp = x0 + length * cos
  const yp = y0 + length * sin

  return [
    <circle key='circle' cx={x0} cy={y0} r={r} fill={color} stroke='none' />,
    <path
      key='path'
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke='#none'
      fill={color}
    />
  ]
}

const twoColorGradient = (
  <linearGradient id='twoColorGradient' x1='0' y1='0' x2='100%' y2='0'>
    <stop offset='0%' stopColor='#38bdf8' />
    <stop offset='100%' stopColor='#7c3aed' />
  </linearGradient>
)

const threeColorGradient = (
  <linearGradient id='threeColorGradient' x1='0' y1='0' x2='100%' y2='0'>
    {/*  Here I experimented with anything between 0% and 10%. */}
    <stop offset='7.5%' stopColor='#66FF66' />
    {/* If we drew a line from left to right through the middle of the circle, 
    the nodes along the circumference for 1/3 and 2/3 would be exactly at 25% and 75%.
    Here, we're using 30% and 70% to help blend better. */}
    <stop offset='30%' stopColor='#FFFF66' />
    <stop offset='70%' stopColor='#FFFF66' />
    {/*  Here I experimented with anything between 90% and 10%. */}
    <stop offset='92.5%' stopColor='#FF6666' />
  </linearGradient>
)

/* ========================================================================

======================================================================== */

export const PercentGauge = ({ percent = 0 }: { percent?: number }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const cx = dimensions.width / 2
  const cy = dimensions.height / 2

  // This calculation is based on the assumption that recharts Pie is
  // always half of the container it's in. Technically, it will have default
  // margins of 5px around it as well, which make it slighly less than half.
  // However, I've removed those margins below.
  const radius = dimensions.width / 4 + 4 // Not sure why it needs + 4, but it does.
  const innerRadius = radius * 0.8
  const outerRadius = radius

  /* ======================
        useEffect()
  ====================== */

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) {
        return
      }
      const width = containerRef.current?.offsetWidth || 0
      const height = containerRef.current?.offsetHeight || 0

      setDimensions({ width, height })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /* ======================
           return
  ====================== */

  return (
    <>
      <ResponsiveContainer width='100%' height='100%' ref={containerRef}>
        <PieChart
          // This is imporatant to do so the cx, cy, and radius are correct.
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          style={{
            transform: 'scale(1.5) translateY(18.75%)'
          }}
        >
          <defs>
            {twoColorGradient}
            {threeColorGradient}
          </defs>

          <Pie
            // stroke='transparent'
            // paddingAngle={5}
            animationDuration={500}
            startAngle={180}
            endAngle={0}
            data={data}
            fill='var(--tw-sky-400)'
            dataKey='value'
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            cx={cx}
            cy={cy}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill='url(#twoColorGradient)'
                stroke={'#333'}
                strokeWidth={0.5}
              />
            ))}

            <Label
              value={Math.round(percent) + '%'}
              position='center'
              fill='var(--tw-violet-600)' //fill='#444'
              style={{
                fontSize: '20px',
                fontWeight: 800
              }}
              dy={cy * 0.15}
            />
          </Pie>

          {needle({
            value: percent,
            data,
            cx,
            cy,
            iR: innerRadius,
            oR: outerRadius,
            color: 'var(--tw-violet-800)' //'#444'
          })}
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}
