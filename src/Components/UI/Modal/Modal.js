import React from "react";

import classes from './Modal.module.css'

import Aux from '../../../Hoc/Auxilary'

import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) =>
{
    // useEffect(() => { }, [props.show])
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closeModal} />
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Aux>
    )
}


export default Modal