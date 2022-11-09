import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getAllTag, getSingleQuestion } from '../../../Apis/Review';
import Loading from '../../../components/Loading/Loading';
import styles from './EditQuestion.module.css';


const animatedComponents = makeAnimated();

export default function EditQuestion({ editQuestion, setEditQuestion }) {
    const restaurant_id = JSON.parse(localStorage.getItem('data'))?.restaurant[0]?.id


    const [singleQuestion, setSingleQuestion] = useState({})
    const [allTags, setAllTags] = useState([])

    const [isQuestionLoading, setIsQuestionLoading] = useState(true)
    const [isTagLoading, setIsTagLoading] = useState(true)

    const [linkInputs, setLinkInputs] = useState(
        {
            question_id: '',
            stars: [
                {
                    star_id: '',
                    tags: [
                        {
                            tag_id: ''
                        }
                    ]
                }
            ]

        })

    useEffect(() => {
        setIsQuestionLoading(true)
        getAllTag(restaurant_id, 1)
            .then(res => {
                setAllTags(res?.data?.data);
                console.log(res?.data?.data);
                getSingleQuestion(editQuestion?.id)
                    .then((res) => {
                        setSingleQuestion(res?.data)
                    })
                    .then(() => {
                        setIsQuestionLoading(false)
                    }).catch(err => { console.log(err) })
            }).catch(err => console.log(err))
    }, [editQuestion])


    var option = allTags.map(res => {
        const object = {
            value: res.id,
            label: res.tag
        }
        return object;
    })



    const handleSubmit = () => {

    }
    return (
        <div className={styles.popupContainer}>
            {isQuestionLoading ? <Loading />
                :
                <div className={styles.popupMain}>
                    <h3 className={styles.questionPopupTitle}>Edit Question</h3>
                    <div>
                        {/* QUESTION INFORMATIONS  */}

                        <div className={styles.questionPopupTableRowContainer}>
                            <div className={styles.questionPopupLeft}>Title</div>
                            <div className={styles.questionPopupRight}>
                                <input
                                    className={styles.questionPopupQuestionInput}
                                    defaultValue={singleQuestion.question}
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Question"
                                />
                            </div>
                        </div>
                        <div className={styles.questionPopupTableRowContainer}>
                            <div className={styles.questionPopupLeft}>Status</div>
                            <div className={styles.questionPopupRight}>
                                <Select
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
                        <div className={styles.questionPopupTableRowContainer}>
                            <div className={styles.questionPopupLeft}>⭐</div>
                            <div className={styles.questionPopupRight}>
                                {option.length === 0 ? 'loading...' :
                                    <Select
                                        styles={{ outline: 'none' }}
                                        components={animatedComponents}
                                        placeholder={'Select Tags'}
                                        isMulti
                                        options={option} />
                                }
                            </div>
                        </div>
                        <div className={styles.questionPopupTableRowContainer}>
                            <div className={styles.questionPopupLeft}>⭐⭐</div>
                            <div className={styles.questionPopupRight}>
                                {option.length === 0 ? 'loading...' :
                                    <Select
                                        styles={{ outline: 'none' }}
                                        components={animatedComponents}
                                        placeholder={'Select Tags'}
                                        isMulti
                                        options={option} />
                                }
                            </div>
                        </div>
                        <div className={styles.questionPopupTableRowContainer}>
                            <div className={styles.questionPopupLeft}>⭐⭐⭐</div>
                            <div className={styles.questionPopupRight}>
                                {option.length === 0 ? 'loading...' :
                                    <Select
                                        styles={{ outline: 'none' }}
                                        components={animatedComponents}
                                        placeholder={'Select Tags'}
                                        isMulti
                                        options={option} />
                                }
                            </div>
                        </div>
                        <div className={styles.questionPopupTableRowContainer}>
                            <div className={styles.questionPopupLeft}>⭐⭐⭐⭐</div>
                            <div className={styles.questionPopupRight}>
                                {option.length === 0 ? 'loading...' :
                                    <Select
                                        styles={{ outline: 'none' }}
                                        components={animatedComponents}
                                        placeholder={'Select Tags'}
                                        isMulti
                                        options={option} />
                                }
                            </div>
                        </div>
                        <div className={styles.questionPopupTableRowContainer}>
                            <div className={styles.questionPopupLeft}>⭐⭐⭐⭐⭐</div>
                            <div className={styles.questionPopupRight}>
                                {option.length === 0 ? 'loading...' :
                                    <Select
                                        styles={{ outline: 'none' }}
                                        components={animatedComponents}
                                        placeholder={'Select Tags'}
                                        isMulti
                                        options={option} />
                                }
                            </div>
                        </div>

                    </div>
                </div>
            }

            <Button onClick={handleSubmit} className={styles.submitButton}>Update</Button>
        </div>
    )
}
