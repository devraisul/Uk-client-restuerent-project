import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import TodaysOrderComponent from '../TodayEatIn/TodaysOrderComponent';
import styles from './TodaysOrder.module.css';



// ================ Accordion =================
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));



// ============ AccordionSummary ==============
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem',color:'#fff' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));



// ============ AccordionDetails ==============
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid #0575B4',
}));




export default function TodaysOrder() {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className={styles.mainContainer}>
            <div>
                <Accordion  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary className={styles.AccordionSummary} aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Eat In</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* EAT IN TABLE  */}
                        <TodaysOrderComponent type={'eat_in'} />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary  className={styles.AccordionSummary} aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>Delivery</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* DELIVERY TABLE  */}
                        <TodaysOrderComponent type={'delivery'} />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary  className={styles.AccordionSummary} aria-controls="panel3d-content" id="panel3d-header">
                        <Typography>Take Away</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* TAKE AWAY TABLE  */}
                        <TodaysOrderComponent type={'take_away'} />
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}
