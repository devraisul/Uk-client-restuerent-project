import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { editSingleQuestion, getAllTag, getReviewAllWithLinkedTags, getSingleQuestion, updateLinkReview } from '../../../Apis/Review';
import Loading from '../../../components/Loading/Loading';
import styles from './EditQuestion.module.css';


const animatedComponents = makeAnimated();

export default function EditQuestion({ editQuestion, setEditQuestion, setPopupIsOpend, allQuestionStars, setIsQuestionUpdated }) {
    const restaurant_id = JSON.parse(localStorage.getItem('data'))?.restaurant[0]?.id;
    const stars = allQuestionStars;

    // DATA FROM API 
    const [singleQuestion, setSingleQuestion] = useState({})
    const [linkedTags, setLinkedTags] = useState([])
    const [allTags, setAllTags] = useState([])
    const [defaultOption, setDefaultOption] = useState([])

    // STAR & TAGS 
    const [star1, setStar1] = useState()
    const [star2, setStar2] = useState()
    const [star3, setStar3] = useState()
    const [star4, setStar4] = useState()
    const [star5, setStar5] = useState()
    // DEFAULT STAR & TAGS 
    const [defaultTags1, setDefaultTags1] = useState([])
    const [defaultTags2, setDefaultTags2] = useState([])
    const [defaultTags3, setDefaultTags3] = useState([])
    const [defaultTags4, setDefaultTags4] = useState([])
    const [defaultTags5, setDefaultTags5] = useState([])

    // QUESTION 
    const [questionDetails, setQuestionDetails] = useState(editQuestion?.question)
    const [questionStatus, setQuestionStatus] = useState(1)

    // LOADING 
    const [isQuestionLoading, setIsQuestionLoading] = useState(true)
    const [isTagsLoading, setIsTagsLoading] = useState(true)
    const [isSubmissionLoading, setIsSubmissionLoading] = useState(false)

    const [isAllDone, setIsAllDone] = useState(false)

    // ERRORS 
    const [errors, setErrors] = useState({
        star1: '',
        star2: '',
        star3: '',
        star4: '',
        star5: '',
    })

    // SUBMISSION TRIGER 
    const [isSubmited, setIsSubmited] = useState(false)

    // GET ALL STAR'S TAGS 
    const handleChangeForStar1 = (selectedOption) => {
        setStar1({
            star_id: 1,
            tags: selectedOption.map(singleTag => {
                return { tag_id: singleTag?.value }
            })
        });
        setIsSubmited(false)
        setErrors({
            star1: '',
            star2: '',
            star3: '',
            star4: '',
            star5: '',
        })
    }
    const handleChangeForStar2 = (selectedOption) => {
        setStar2({
            star_id: 2,
            tags: selectedOption.map(singleTag => {
                return { tag_id: singleTag?.value }
            })
        });
        setIsSubmited(false)
        setErrors({
            star1: '',
            star2: '',
            star3: '',
            star4: '',
            star5: '',
        })
    }
    const handleChangeForStar3 = (selectedOption) => {
        setStar3({
            star_id: 3,
            tags: selectedOption.map(singleTag => {
                return { tag_id: singleTag?.value }
            })
        });
        setIsSubmited(false)
        setErrors({
            star1: '',
            star2: '',
            star3: '',
            star4: '',
            star5: '',
        })
    }
    const handleChangeForStar4 = (selectedOption) => {
        setStar4({
            star_id: 4,
            tags: selectedOption.map(singleTag => {
                return { tag_id: singleTag?.value }
            })
        });
        setIsSubmited(false)
        setErrors({
            star1: '',
            star2: '',
            star3: '',
            star4: '',
            star5: '',
        })
    }
    const handleChangeForStar5 = (selectedOption) => {
        setStar5({
            star_id: 5,
            tags: selectedOption.map(singleTag => {
                return { tag_id: singleTag?.value }
            })
        });
        setIsSubmited(false)
        setErrors({
            star1: '',
            star2: '',
            star3: '',
            star4: '',
            star5: '',
        })
    }


    // GET TAGS AND  QUESTION 
    useEffect(() => {
        setIsTagsLoading(true)
        setIsQuestionLoading(true)
        getAllTag(restaurant_id)
            .then(res => {
                setAllTags(res?.data);
                getSingleQuestion(editQuestion?.id)
                    .then((res) => {
                        console.log('single', res?.data?.stars.find((res) => res.value === 1)?.tags);
                        setSingleQuestion(res?.data);
                        setStar1({
                            star_id: 1,
                            tags: res?.data?.stars.find((res) => res.value === 1)?.tags.map(singleTag => { return { tag_id: singleTag?.id } })
                        })
                        setStar2({
                            star_id: 2,
                            tags: res?.data?.stars.find((res) => res.value === 2)?.tags.map(singleTag => { return { tag_id: singleTag?.id } })
                        })
                        setStar3({
                            star_id: 3,
                            tags: res?.data?.stars.find((res) => res.value === 3)?.tags.map(singleTag => { return { tag_id: singleTag?.id } })
                        })
                        setStar4({
                            star_id: 4,
                            tags: res?.data?.stars.find((res) => res.value === 4)?.tags.map(singleTag => { return { tag_id: singleTag?.id } })
                        })
                        setStar5({
                            star_id: 5,
                            tags: res?.data?.stars.find((res) => res.value === 5)?.tags.map(singleTag => { return { tag_id: singleTag?.id } })
                        })

                        setDefaultTags1(res?.data?.stars.find((res) => res.value === 1)?.tags.map(tag => { return { value: tag?.id, label: tag?.tag } }))
                        setDefaultTags2(res?.data?.stars.find((res) => res.value === 2)?.tags.map(tag => { return { value: tag?.id, label: tag?.tag } }))
                        setDefaultTags3(res?.data?.stars.find((res) => res.value === 3)?.tags.map(tag => { return { value: tag?.id, label: tag?.tag } }))
                        setDefaultTags4(res?.data?.stars.find((res) => res.value === 4)?.tags.map(tag => { return { value: tag?.id, label: tag?.tag } }))
                        setDefaultTags5(res?.data?.stars.find((res) => res.value === 5)?.tags.map(tag => { return { value: tag?.id, label: tag?.tag } }))
                    })
                    .then(() => {
                        setIsAllDone(true)
                        setIsQuestionLoading(false)
                    }).catch(err => { console.log(err) })
            }).catch(err => console.log(err))

        getReviewAllWithLinkedTags(restaurant_id)
            .then(res => {
                setLinkedTags(res.filter(data => data.id === editQuestion.id)[0]?.stars)
                setIsTagsLoading(false)
            })
    }, [editQuestion])

    useEffect(() => {
        if (isSubmited) {
            setErrors({
                star1: star1 !== undefined ? '' : '* At least one tag have to select!',
                star2: star2 !== undefined ? '' : '* At least one tag have to select!',
                star3: star3 !== undefined ? '' : '* At least one tag have to select!',
                star4: star4 !== undefined ? '' : '* At least one tag have to select!',
                star5: star5 !== undefined ? '' : '* At least one tag have to select!',
            })
        }
    }, [isSubmited])



    useEffect(() => {
        // linkedTags && console.log(linkedTags.filter(link => link?.value === 1));
    }, [linkedTags])


    // MAKE CUSTOM OBJECT FROM  ALL TAGS
    var option = allTags.map((res) => {
        const object = {
            value: res.id,
            label: res.tag
        }
        return object;
    })




    // UPDATE BUTTON HANDLER 
    const handleSubmit = () => {
        setIsSubmited(true)

        const questionData = {
            id: singleQuestion?.id,
            question: questionDetails,
            restaurant_id: restaurant_id,
            is_active: questionStatus
        };
        var linkData = {
            question_id: singleQuestion?.id,
            stars: []
        };

        star1 !== undefined && linkData.stars.push(star1);
        star2 !== undefined && linkData.stars.push(star2);
        star3 !== undefined && linkData.stars.push(star3);
        star4 !== undefined && linkData.stars.push(star4);
        star5 !== undefined && linkData.stars.push(star5);

        // IF ALL STAR HAVE AT LEAST 1 VALUE 
        if ((star1 !== undefined) && (star2 !== undefined) && (star3 !== undefined) && (star4 !== undefined) && (star5 !== undefined)) {
            setIsSubmissionLoading(true)
            editSingleQuestion(questionData).then(res => {
                console.log({res});
                // IF QUESTION UPDATE DONE
                if (res?.data?.id) {
                    console.log({linkData});
                    updateLinkReview(linkData).then(res => {
                        // IF LINKED DONE 
                        if (res?.data?.message) {
                            toast.success("Question Updated Successfully!")
                            setTimeout(() => {
                                setEditQuestion({
                                    mode: false,
                                    id: '',
                                    question: '',
                                    serial: ''
                                })
                                setPopupIsOpend(false);
                                setIsQuestionUpdated(Math.random())
                            }, 1000);
                            setIsSubmissionLoading(false)
                        }
                    }).catch(err => console.log(err))
                }
            }).catch(err => console.log(err))
        }
    }

    return (
        <div className={styles.popupContainer}>
            {isQuestionLoading && isAllDone ? <Loading />
                :
                <div className={styles.popupMain}>
                    <h3 className={styles.questionPopupTitle}>Edit Question</h3>
                    <div>

                        {/* QUESTION INFORMATIONS  */}
                        <div className={styles.questionPopupTableRowContainer}>
                            <div className={styles.questionPopupLeft}>Title</div>
                            <div className={styles.questionPopupRight}>
                                <input
                                    onChange={(e) => setQuestionDetails(e.target.value)}
                                    className={styles.questionPopupQuestionInput}
                                    defaultValue={editQuestion?.question}
                                    type="text"
                                    name='question'
                                    placeholder="Question"
                                />
                            </div>
                        </div>
                        <div className={styles.questionPopupTableRowContainer}>
                            <div className={styles.questionPopupLeft}>Status</div>
                            <div className={styles.questionPopupRight}>
                                <Select
                                    required
                                    onChange={(e) => setQuestionStatus(e.value)}
                                    name='status'
                                    isSearchable
                                    styles={{ outline: 'none' }}
                                    components={animatedComponents}
                                    defaultValue={[{ value: singleQuestion.is_active, label: singleQuestion.is_active ? 'Public' : 'Private' }]}
                                    options={[
                                        { value: 0, label: 'Private' },
                                        { value: 1, label: 'Public' },
                                    ]} />
                            </div>
                        </div>
                        <br />
                        <br />

                        {/* TAG INFORMATIONS  */}


                        <div className={styles.questionPopupTableRowContainer}>
                            <div className={styles.questionPopupLeft}>Ratings</div>
                            <div className={styles.questionPopupRight}>Tags</div>
                        </div>

                        {!isTagsLoading && isAllDone &&
                            <>
                                <div className={styles.questionPopupTableRowContainer}>
                                    <div className={styles.questionPopupLeft}>⭐</div>
                                    <div className={styles.questionPopupRight}>
                                        <span className={styles.errorMessage}>{errors.star1 !== '' && errors.star1}</span>
                                        {option.length === 0 ? 'loading...' :
                                            <Select
                                                required
                                                onChange={handleChangeForStar1}
                                                styles={{ outline: 'none' }}
                                                components={animatedComponents}
                                                placeholder={'Select Tags'}
                                                isMulti
                                                defaultValue={defaultTags1}
                                                options={option} />
                                        }
                                    </div>
                                </div>
                                <div className={styles.questionPopupTableRowContainer}>
                                    <div className={styles.questionPopupLeft}>⭐⭐</div>
                                    <div className={styles.questionPopupRight}>
                                        <span className={styles.errorMessage}>{errors.star2 !== '' && errors.star2}</span>
                                        {option.length === 0 ? 'loading...' :
                                            <Select
                                                required
                                                onChange={handleChangeForStar2}
                                                styles={{ outline: 'none' }}
                                                components={animatedComponents}
                                                placeholder={'Select Tags'}
                                                isMulti
                                                defaultValue={defaultTags2}
                                                options={option} />
                                        }
                                    </div>
                                </div>
                                <div className={styles.questionPopupTableRowContainer}>
                                    <div className={styles.questionPopupLeft}>⭐⭐⭐</div>
                                    <div className={styles.questionPopupRight}>
                                        <span className={styles.errorMessage}>{errors.star3 !== '' && errors.star3}</span>
                                        {option.length === 0 ? 'loading...' :
                                            <Select
                                                required
                                                onChange={handleChangeForStar3}
                                                styles={{ outline: 'none' }}
                                                components={animatedComponents}
                                                placeholder={'Select Tags'}
                                                isMulti
                                                defaultValue={defaultTags3}
                                                options={option} />
                                        }
                                    </div>
                                </div>
                                <div className={styles.questionPopupTableRowContainer}>
                                    <div className={styles.questionPopupLeft}>⭐⭐⭐⭐</div>
                                    <div className={styles.questionPopupRight}>
                                        <span className={styles.errorMessage}>{errors.star4 !== '' && errors.star4}</span>
                                        {option.length === 0 ? 'loading...' :
                                            <Select
                                                required
                                                onChange={handleChangeForStar4}
                                                styles={{ outline: 'none' }}
                                                components={animatedComponents}
                                                placeholder={'Select Tags'}
                                                isMulti
                                                defaultValue={defaultTags4}
                                                options={option} />
                                        }
                                    </div>
                                </div>
                                <div className={styles.questionPopupTableRowContainer}>
                                    <div className={styles.questionPopupLeft}>⭐⭐⭐⭐⭐</div>
                                    <div className={styles.questionPopupRight}>
                                        <span className={styles.errorMessage}>{errors.star5 !== '' && errors.star5}</span>
                                        {option.length === 0 ? 'loading...' :
                                            <Select
                                                required
                                                onChange={handleChangeForStar5}
                                                styles={{ outline: 'none' }}
                                                components={animatedComponents}
                                                placeholder={'Select Tags'}
                                                isMulti
                                                defaultValue={defaultTags5}
                                                options={option} />
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            }

            <Button disabled={isSubmissionLoading} onClick={handleSubmit} className={styles.submitButton}>
                {isSubmissionLoading ? "Loading..." : "Update"}
            </Button>
        </div>
    )
}
