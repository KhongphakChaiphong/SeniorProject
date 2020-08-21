import React from 'react';

import Button from '../FormElements/Button';

import './ContentBox.css'

const ContentBox = props => {
    return (
        <div className={`content ${props.className}`}>
            <div className="row">
                {props.backButton && (
                    <div className="col-6 backBtn">
                        <Button onClick={props.backHandler}>
                            Back
                        </Button>
                    </div>
                )}
                {props.addButton && (
                    <div className="col-6 addBtn">
                        <Button onClick={props.click}>
                            {props.addButton}
                        </Button>
                    </div>
                )}
            </div>
            <div>
                {props.extraComponent}
            </div>
           
            {props.inner ? (
                <div className="innerContent"
                    style={{
                        position: 'relative',
                        height: '540',
                        marginBottom: '0px',
                        overflow: 'scroll',
                    }}
                >
                    {props.children}
                </div>
            ) :
                <div>
                    {props.children}
                </div>
            }
        </div>
    )
}

export default ContentBox;
