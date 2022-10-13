import React, { Fragment, useState } from 'react';
import { BiLink } from 'react-icons/bi';
import { FiLoader, FiSave, FiUploadCloud } from 'react-icons/fi';
import { IoCloudDoneOutline } from 'react-icons/io5';
import Popup from 'reactjs-popup';
import { addDishImage, deleteDish } from '../../../Apis/dish';
import { getVariation } from '../../../Apis/variation';
import { useAuth } from '../../../context/AuthContext';
import LinkVariation from '../../ViewMenu/LinkVariation';
// import { BiLink } from 'react-icons/bi';
// import { FiLoader, FiSave, FiUploadCloud } from 'react-icons/fi';
// import { IoCloudDoneOutline } from 'react-icons/io5';
// // import configData from "../../config.json";
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
// import { addDishImage, deleteDish } from '../../Apis/dish';
// import { getVariation } from '../../Apis/variation';
// import { useAuth } from '../../context/AuthContext';
// import LinkVariation from './linkvariationform';
//all dishes show UI in owner dashboard
const EditAllDishesUI = ({ dishes,
    menuId, index, id, setIsChangeMenu }) => {
    const [showuploader, setsshowuploader] = useState(false);
    const [showlink, setsshowlink] = useState(false);
    const [editflag, setseditflag] = useState(false);
    const [open, setOpen] = useState(false);
    // const closeModal = () => setOpen(false);
    // const [open2, setOpen2] = useState(false);
    // const closeModal2 = () => setOpen2(false);
    const [dishimage, setimage] = useState();
    const { user } = useAuth();
    const [variationData, setVariationData] = useState([])
    const [isUploaded, setIsUploaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState("")
    const [formData, setFormData] = useState({  
        Did: dishes?.id,
        Name: dishes?.name,
        Price: dishes?.price,
        Description: dishes?.description,
    });
    const { Did, Name, Price, Description } = formData;


    React.useEffect(() => {
        getVariation(user.restaurant[0].id)
            .then(res => {
                setVariationData(res?.data);
            })
    }, [menuId])


    //set uploaded image in state
    const onFileChange = (e) => {
        setimage(e.target.files[0]);
    };

    // show upload option
    const handleAddClick = () => {
        if (showuploader) {
            setsshowuploader(false)
        }
        else {
            setsshowuploader(true)
        }
    }
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleLinkClick = () => {
        if (showlink) {
            setsshowlink(false)
            setOpen(false)
        }
        else {
            setsshowlink(true)
            setOpen(true)
        }
    }

    const handlepopup = () => {
        if (showlink) {
            setsshowlink(false)
            setOpen(false)
        }
        else {
            setsshowlink(true)
            setOpen(true)
        }
    }

    const onSubmit2 = async (e) => {
        e.preventDefault();
        setIsChangeMenu(Math.random())
        setseditflag(!editflag)
    };

    const onSubmit3 = async (e, id) => {
        e.preventDefault();
        // unlink(id, dishes?.id)

        // window.location.reload(false)
    };

    const handleDeleteDish = async (e) => {
        e.preventDefault();
        deleteDish(dishes?.id).then(res => {
            if (res.data.message === "ok") {
                setIsChangeMenu(Math.random())
            }
        })
    };
    //submit the image to API
    const onSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        const Data = new FormData();
        if (dishimage !== undefined) {
            Data.append('image', dishimage, dishimage.name);
            addDishImage(dishes?.id, Data).then((res) => {
                if (res.data) {
                    setErrors("")
                    setIsUploaded(true)
                    setIsLoading(false)
                    setTimeout(() => { setsshowuploader(true) }, 200)
                }
            })
        }
        if (dishimage === undefined) {
            setIsLoading(false)
            setErrors("Please add an image")
        }
    };




    const trimString = (string, length = 15) => {
        return string
            .slice(0, string.length >= length - 3 ? length - 3 : string.length)
            .padEnd(string.length >= length - 3 ? length : string.length,
                '.')
    }




    // STYLES 
    const Styles = {
        uploadImageButtonContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
        },
        variationButtonContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
        },
        variationButton: {
            display: 'block',
            cursor: 'pointer',
            textAlign: 'center',
            color: '#fff',
            background: '#0575B4',
            padding: '15px 5px',

            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            width: '140px',
        }
    }
    return (
        <Fragment>
            <tbody>
                <tr>
                    <td width="2%" >
                        {index}
                    </td>
                    <td width="15%">
                        {/* NAME  */}
                        <form className='form' >
                            <div className='form-groupnopadding'>
                                <input
                                    style={{
                                        outline: 'none',
                                        fontSize: '0.8rem'
                                    }}
                                    type='text'
                                    placeholder='Enter Restaurant Name'
                                    name='Name'
                                    value={Name}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                        </form>

                    </td>
                    <td width="14%">
                        {/* PRICE  */}
                        <form className='form' >
                            <div className='form-groupnopadding'>
                                <input
                                    style={{
                                        outline: 'none',
                                        fontSize: '0.8rem',
                                    }}
                                    type='number'
                                    placeholder='Enter Price'
                                    name='Price'
                                    value={Price}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                        </form>
                    </td>
                    <td width="22%">
                        <form className='form' >
                            <div className='form-groupnopadding'>
                                <input
                                    style={{
                                        outline: 'none',
                                        fontSize: '0.8rem'
                                    }}
                                    type='text'
                                    placeholder='Enter Description'
                                    name='Description'
                                    value={Description}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                        </form>
                    </td>
                    <td width="5%">
                        {isUploaded ?
                            <div>
                                <IoCloudDoneOutline style={{ fontSize: "1.4rem", color: 'green' }} />
                            </div>
                            :
                            <>
                                <button title='upload image' style={{ background: '#0575B4' }} className='btn btn-primary2' onClick={(e) => handleAddClick(e)} >
                                    {isLoading ? <FiLoader style={{ fontSize: "1.4rem" }} color='white' /> : <FiUploadCloud color='white' style={{ fontSize: "1.4rem" }} />}
                                </button>
                                {showuploader &&
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <input
                                            required
                                            type='file'
                                            id='image'
                                            name='image'
                                            onChange={(e) => onFileChange(e)}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                                            {errors && <span style={{ background: '#ffcccc', color: '#ff0000', padding: '2px 5px', borderRadius: '10px', marginTop: '5px' }} >{errors && errors}</span>}
                                            <input type='submit' className='btn btn-primary2' value='Add ' onClick={(e) => onSubmit(e)} />
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </td>

                    <td width="15%">
                        <button title='Link Variation' className='btn btn-primary2' onClick={(e) => handleLinkClick(e)} >
                            <BiLink />
                        </button>
                        {showlink &&
                            <Fragment>
                                <Popup open={open} closeOnDocumentClick onClose={(e) => (handlepopup())}>
                                    <button style={{ color: '#0575B4' }} className="close" onClick={(e) => (setOpen(false))}>
                                        &times;
                                    </button>
                                    <div className='padding20px'>
                                    </div>
                                    <LinkVariation id={dishes?.id} rid={dishes?.restaurant_id} />
                                </Popup>
                            </Fragment>

                        }
                    </td>
                    <td width="2%">
                        <div>
                            <button title='update' className='btn btn-primary2' onClick={(e) => onSubmit2(e)}><FiSave /></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </Fragment>
    )
};

export default EditAllDishesUI;