import React from 'react'
import { or } from 'ramda'

export default props => <h2>{or(props.message, 'No data')}</h2>