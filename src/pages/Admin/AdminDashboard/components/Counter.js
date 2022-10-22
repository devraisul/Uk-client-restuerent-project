import { Paper } from '@material-ui/core';
import React from 'react';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import './Counter.css';

export default function Counter({title,countData,total}) {
    return (
        <Paper className="counterContainer">
            <h2 className="counterTitle">{title}</h2>
            <div className="counterDetails">
                <span className="counterNumber">{total}</span>
                {countData && <span className="growth">
                    {
                        (parseInt(countData.previous) > parseInt(countData.current)) ?
                            (
                                <div className="negativeGrowth">
                                    <BsArrowDown /> {parseFloat((parseInt(countData.previous) / parseInt(countData.current)) * 100).toPrecision(5)} %
                                </div>
                            )
                            : (
                                <div className="possitiveGrowth">
                                    <BsArrowUp /> {parseFloat((parseInt(countData.current) / parseInt(countData.previous)) * 100).toPrecision(5)} %
                                </div>
                            )
                    }
                </span>}
            </div>
        </Paper>
    )
}
