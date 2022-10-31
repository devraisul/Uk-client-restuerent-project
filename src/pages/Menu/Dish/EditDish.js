import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDishById } from '../../../Apis/dish';
import './EditDish.css';
const EditDish = ({ menuId, restaurentId, menuName, setIsChangeMenu, closeEditModal, singleDishId }) => {
    // Image For Dish 
    const [imageUrl, setImageUrl] = useState('')
    // USE FORM HOOK 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);



    const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false)
    const [dish, setDish] = useState({})
    useEffect(() => {
        getDishById(singleDishId).then(res => {
            setDish(res[0]);
            console.log(res[0]);
        })
    }, [singleDishId])

    return (
        <>
            {submittedSuccessfully ?
                (<div className='SubmitedMessage'>
                    <img src="https://i.postimg.cc/MGXQ6w85/13-pizza-outline.gif" alt="done" className='doneImage' />
                    <p>Submitted!</p>
                </div>)
                :
                (<div>
                    {/* POPUP CLOSE BUTTON  */}
                    <div className='crossPopup'>
                        <button onClick={closeEditModal}>X</button>
                    </div>
                    <div>
                        <h4 className='popupTitle'>Edit Dish</h4>
                        <form className='editDishForm' onSubmit={handleSubmit(onSubmit)}>

                            <label className='dishImage' title='upload image' htmlFor="image" >
                                <div className='imageDropper'>
                                    {!imageUrl ?
                                        <img className='imageUpPlaceholder'
                                            alt={"profile_pic"}
                                            src={"https://i.postimg.cc/rFzvBdw7/gallery.png"}
                                        /> :
                                        <img className='imageUp'
                                            alt={"profile_pic"}
                                            src={imageUrl}
                                        />
                                    }
                                    {!imageUrl && <>
                                        <p>Click to upload a file</p>
                                        <p style={{ fontSize: '0.7rem', color: '#ccc' }}>Only JPG, JPEG & PNG image supported</p>
                                    </>}
                                </div>
                            </label>
                            
                            <input type={"file"} accept={"image/x-png,image/jpg,image/jpeg"} style={{ display: 'none' }} placeholder="image" id='image' {...register("image", {
                                onChange: (e) => {
                                    setImageUrl(URL.createObjectURL(e.target.files[0]));
                                },
                                required: false,
                            })} />
                            <input
                                className='inputField'
                                defaultValue={dish?.name}
                                type="text"
                                placeholder="Dish Name"
                                {...register("DishName", { required: true })}
                            />
                            <input
                                className='inputField'
                                defaultValue={dish?.description}
                                type="text"
                                placeholder="Description"
                                {...register}
                            />
                            <input
                                className='inputField'
                                defaultValue={dish?.price}
                                type="number"
                                placeholder="Price"
                                {...register}
                            />


                            <input type="submit" />
                        </form>
                    </div>

                </div>)
            }
        </>
    );
};

export default EditDish;