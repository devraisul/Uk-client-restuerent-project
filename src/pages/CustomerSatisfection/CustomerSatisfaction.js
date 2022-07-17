import React from 'react';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from 'react-modern-calendar-datepicker';
import './customdatepicker.css'
import { getReview } from '../../Apis/Review';
import { useAuth } from '../../context/AuthContext';
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@material-ui/core";
import Widget from '../../components/Widget/Widget';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    },
    qrcode: {
        display: "flex",
        justifyContent: "center",
        background: "white",
        marginTop: "20px",
        padding: "30px 0px",
        boxShadow: "0 0 10px 5px rgba(0,0,0,0.1)"
    }
}))
const CustomerSatisfaction = () => {
    const { user } = useAuth()
    const defaultValue = utils().getToday()
    const [selectedDay, setSelectedDay] = React.useState(defaultValue);
    const [selectedDay2, setSelectedDay2] = React.useState(defaultValue);
    const [rate, serRate] = React.useState({
        "one": "none",
        "two": "none",
        "three": "none",
        "four": "none",
        "five": "none",
        "total": "none"
    });
    const classes = useStyles();

    const formatInputValue = () => {
        if (!selectedDay) return '';
        return `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;
    };
    const formatInputValue2 = () => {
        if (!selectedDay2) return '';
        return `${selectedDay2.day}-${selectedDay2.month}-${selectedDay2.year}`;
    };
    const startDate = `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`
    const endDate = `${selectedDay2.year}-${selectedDay2.month}-${selectedDay2.day}`
    const handleDate = () => {
        getReview(user.restaurant[0].id, startDate, endDate)
            .then(res => {
                serRate(res)
            })
    }
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: '50px' }}>
                <DatePicker
                    value={selectedDay}
                    onChange={setSelectedDay}
                    inputPlaceholder="Select a date" // placeholder
                    formatInputText={formatInputValue} // format value
                    inputClassName="my-custom-input" // custom class
                    shouldHighlightWeekends
                />
                <p style={{ margin: "0px 10px" }}>To</p>
                <DatePicker
                    value={selectedDay2}
                    onChange={setSelectedDay2}
                    minimumDate={selectedDay}
                    inputPlaceholder="Select a date" // placeholder
                    formatInputText={formatInputValue2} // format value
                    inputClassName="my-custom-input" // custom class
                    shouldHighlightWeekends
                />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: '50px', marginBottom: "50px" }}>
                <button className='review_submit_btn' onClick={handleDate}>Submit</button>
            </div>
            <div>
                <Widget title="Customer Reviews" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                    <Table className="mb-0">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>Rating 1</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Rating 2</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Rating 3</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Rating 4</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Rating 5</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Total Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell className="pl-3 fw-normal">{rate?.one}</TableCell>
                                <TableCell>{rate?.two}</TableCell>
                                <TableCell>{rate?.three}</TableCell>
                                <TableCell>{rate?.four}</TableCell>
                                <TableCell>{rate?.five}</TableCell>
                                <TableCell>{rate?.total}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Widget>
            </div>
        </div>
    );
};

export default CustomerSatisfaction;