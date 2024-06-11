import { ReactNode } from 'react'
import { AreaChart } from './AreaChart'
import { BarChart } from './BarChart'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { PieChart2 } from './PieChart2'
import { PieProgress } from './PieProgress'
import { RadialProgress } from './RadialProgress'

/* ========================================================================

======================================================================== */
// I began by using Tremor Charts, which is just an abstraction over Recharts.
// However, there was a lot of additional package downloads and modifications
// to the Tailwind config that I didn't really like. I can understand why
// Tremor exists. Recharts is fairly complex. That said, an abstraction like
// Tremor also limits the flexibility of the underlying Recharts library.

// https://www.youtube.com/watch?v=Fu_YFp-9xoQ&t=14s

export const RechartDemo = () => {
  return (
    <>
      <div className='grid w-full gap-8 lg:grid-cols-2 2xl:grid-cols-4'>
        <GridItem>
          <AreaChart />
        </GridItem>

        <GridItem>
          <BarChart />
        </GridItem>

        <GridItem>
          <LineChart />
        </GridItem>

        <GridItem>
          <PieChart />
        </GridItem>

        <GridItem>
          <PieChart2 />
        </GridItem>

        <GridItem>
          <PieProgress />
        </GridItem>

        <GridItem>
          <RadialProgress />
        </GridItem>
      </div>
    </>
  )
}

const GridItem = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`flex aspect-video flex-col items-center justify-center rounded-xl border-[1.5px] border-[#409] 
      bg-[rgb(247,252,255)] p-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]
      `}
    >
      {children}
    </div>
  )
}
