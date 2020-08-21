import React from 'react';

import ListCategory from './ListCategory';
const Category = props => {

    if (props.cardContent.length === 0) {
        return (
            <div className="errorText">
                <h2>No Category data</h2>
            </div>
        )
    }else {
        return (
            <div className="row">
                {props.cardContent.map(content => (
                    <div className="col-12 col-md-6" key={content._id}>
                        <ListCategory
                            id={content._id}
                            displayIcon={content.icon || 'https://dou3uzl0r1qje.cloudfront.net/wp-content/uploads/2019/05/SAMITIVEJ.jpg'}
                            displayText={content.text || content.CategoryName}
                            to={content.to}
                            data={content.data}
                            onDelete={props.onDeleteCategory}
                        />
                    </div>
                ))}
            </div>
        )
    }
}


export default Category
