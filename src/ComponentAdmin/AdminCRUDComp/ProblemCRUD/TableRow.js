import React from 'react';

import TableRowProblem1 from "./TableRowProblem1";


const TableRow = props => {
    //If no data were send from backend

    if (props.content.length === 0) {
        return (
            <div className="errorText">
                <h2>No data</h2>
            </div>
        )
    }
    // If able receive data from backend
    else {
        return (
            <div className="row">
                <table
                    className="table table-striped"
                    style={{ marginTop: 20 }}
                >
                    <thead>
                        <tr>
                            <th>Problem name</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.content.map((content, i) => (
                            <TableRowProblem1
                                problemData={content}
                                key={i}
                            />
                        ))}
                    </tbody>
                </table>        
            </div>
        )
    }
}

export default TableRow;