import React from 'react'

import GradingTable from '../../components/Grading/GradingTable'

const data = [
  {
    key: 1,
    id: 1,
    status: 'Pending',
  },
  {
    key: 2,
    id: 2,
    status: 'Graded',
  },
]

const Grading = props => (
  <div>
    <h1>Grading</h1>
    <GradingTable data={data} />
  </div>
)

export default Grading
