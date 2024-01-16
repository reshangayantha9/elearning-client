import React, { FC, useState } from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardWidgets from './widgets/DashboardWidgets'

type Props = {
  isDashboard:boolean
}

const DashboardHero:FC<Props> = ({isDashboard}) => {
  const [open,setOpen]=useState(false);
  return (
    <div>
        <DashboardHeader open={open} setOpen={setOpen}/>
        <DashboardWidgets open={open}/>
    </div>
  )
}

export default DashboardHero