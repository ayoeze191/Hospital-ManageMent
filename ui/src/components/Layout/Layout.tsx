import React from 'react'

interface childrenType {
  children?: JSX.Element
}

const Layout:React.FC<childrenType> = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Layout