import React, { MouseEventHandler } from 'react'
import Backdrop from './backdrop'
import './Modal.css'
interface proptypes {
    show: boolean,
    children: JSX.Element,
    modalClosed(): MouseEventHandler
}

const Modal:React.FC<proptypes> = (props) => {
  return (
    <>
        <Backdrop show={props.show} clicked={props.modalClosed} />
                <div
                    className='Modal'
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    {props.children}
                </div>
    </>
  )
}

export default Modal