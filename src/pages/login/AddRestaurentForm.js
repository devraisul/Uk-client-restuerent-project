import { Button, CircularProgress, Fade, Grid, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addRestaurent } from '../../Apis/Restaurent';
import useStyles from "./styles";
import toast, { Toaster } from 'react-hot-toast';

const AddRestaurentForm = () => {
    var [error, setError] = useState(null);
    var [isLoading, setIsLoading] = useState(false);
    var classes = useStyles();
    const [checked, setChecked] = useState(false);
    let history = useHistory()
    toast.success("Regestration Success.Now Add Restaurent");
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            "Name": e.target.Name.value,
            "Address": e.target.Address.value,
            "PostCode": e.target.PostCode.value,
            "enable_question": checked,
            "About": e.target.About.value,
            "Webpage": e.target.Webpage.value,
            "PhoneNumber": e.target.PhoneNumber.value,
            "EmailAddress": e.target.EmailAddress.value,
            "homeText": e.target.homeText.value,
            "AdditionalInformation": e.target.AdditionalInformation.value
        }
        addRestaurent(data)
            .then(res => {
                setIsLoading(false);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                history.push("/login")
            })
    };
    const onCheck = () => {
        setChecked(true)
    }
    return (
        <Grid container className={classes.container} >
            {/* <Grid container className={classes.container} style={{ backgroundImage: `url("https://i.ibb.co/cgNXhWs/authbg.jpg")`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}> */}
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <React.Fragment>
                        <form onSubmit={onSubmit}>
                            {/* <Typography variant="h1" className={classes.greeting}>
                Welcome!
              </Typography> */}
                            {/* <Typography variant="h2" className={classes.subGreeting}>
                Create your account
              </Typography> */}

                            <Fade in={error}>
                                <Typography color="secondary" className={classes.errorMessage}>
                                    Something is wrong with your login or password :(
                                </Typography>
                            </Fade>
                            <Tabs
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Add Restaurent" classes={{ root: classes.tab }} />
                            </Tabs>
                            <TextField
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                name="Name"
                                margin="normal"
                                placeholder="Enter Restaurent Name"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                name="Address"
                                margin="normal"
                                placeholder="Enter Restaurent Address"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                name="PostCode"
                                margin="normal"
                                placeholder="Enter Post Code"
                                type="number"
                                fullWidth
                            />
                            <div>
                                <input onChange={onCheck} type="checkbox" name="" id="" /> <label style={{ color: "white" }} htmlFor="">Enable question</label>
                            </div>
                            <TextField
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                name="About"
                                margin="normal"
                                placeholder="Enter Restaurent About"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                name="Webpage"
                                margin="normal"
                                placeholder="Enter WebPage Url"
                                type="url"
                                fullWidth
                            />
                            <TextField
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                name="PhoneNumber"
                                margin="normal"
                                placeholder="Enter Phone Number"
                                type="number"
                                fullWidth
                            />
                            <TextField
                                id="email"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                name="EmailAddress"
                                margin="normal"
                                placeholder="Enter Email Adress"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                name="homeText"
                                margin="normal"
                                placeholder="Enter Home Text"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                id="name"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                name="AdditionalInformation"
                                margin="normal"
                                placeholder="Enter Additional Information"
                                type="text"
                                fullWidth
                            />
                            <div className={classes.creatingButtonContainer}>
                                {isLoading ? (
                                    <CircularProgress size={26} />
                                ) : (
                                    <Button
                                        type="submit"
                                       z
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className={classes.createAccountButton}
                                    >
                                        Add
                                    </Button>
                                )}
                            </div>
                        </form>
                    </React.Fragment>
                </div>
            </div>
        </Grid>
    );
};

export default AddRestaurentForm;