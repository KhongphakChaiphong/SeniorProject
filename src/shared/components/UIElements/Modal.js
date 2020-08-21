import React from 'react';
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import './Modal.css'

import Backdrop from './Backdrop'
const ModalOverlay = props => {
    const content = (
        // get style from user
        <div className={`p-modal ${props.className}`} style={props.style}>
            <header className={`p-modal__header ${props.headerClass}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
                <div className={`p-modal__content ${props.contentClass}`}>
                    {props.children}
                </div>
                <footer className={`p-modal__footer ${props.footerClass}`}>
                    {props.footer}
                </footer>
            </form>
        </div>
    )
    return ReactDOM.createPortal(
        content,
        document.getElementById('modal-hook')
    )
}

const Modal = (props) => {
    return (
        <React.Fragment>
            {props.show ? <Backdrop onClick={props.onCancel} />
                : null
            }
            {/* Show modal or not depend on in= {} */}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="p-modal"
            >
                {/* ...props ==> pass props to other components */}
                <ModalOverlay {...props} />
            </CSSTransition>
        </React.Fragment>
    )
}

export default Modal;