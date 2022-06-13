import React, { MouseEventHandler } from 'react'

interface proptypes {
    show: boolean,
    clicked(): MouseEventHandler
}

const Backdrop:React.FC<proptypes> = (props) => {
  return (
    props.show ? <div className='Backdrop' onClick={props.clicked()}></div> : null
  )
}

export default Backdrop