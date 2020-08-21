import React from 'react';

import ListItem from './ListItem';

const List = props => {
    //If no data were send from backend

    if (props.cardContent.length === 0) {
        return (
            <div className="center">
                <h2>No hospital data</h2>
            </div>
        )
    }
    // If able receive data from backend
    else {
        return (
            <div className="row">
                {props.cardContent.map(content => (
                    <div className="col-12 col-md-6" key={content._id}>
                        <ListItem
                            id={content._id}
                            displayIcon={content.icon || 'https://dou3uzl0r1qje.cloudfront.net/wp-content/uploads/2019/05/SAMITIVEJ.jpg'}
                            displayText={content.text || content.hospitalName}
                            to={content.to}
                            data={content.data}
                            onDelete={props.onDeletePlace}
                            mainMenu={props.mainMenu || ""}
                            moreInfo={content.moreInfo || ""}
                        />
                    </div>
                ))}
            </div>
        )
    }
}

export default List;