import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getTopic } from '../../api/getTopic';
import { mapPracticeChild } from '../../utils/rootTopic';
import './style.scss';

const Pratice = () => {
    const [topicSection, setTopicSection] = useState();
    const [topicTest, setTopicTest] = useState();
    const [sectionCurrent, setSectionCurrent] = useState();
    const [pagination, setPagination] = useState(false);

    const activeTopic = new URLSearchParams(window.location.search);
    const topic = activeTopic.get('topic');
    const activeTp = !activeTopic.get('section') ? 0 : activeTopic.get('section');
    mapPracticeChild[topic] = 'active';

    useEffect(() => {
        const localUserId = localStorage.getItem("_static_uid");
        getTopic(topic, 0, localUserId || undefined)
            .then((section) => {
                setTopicSection(section);
                setSectionCurrent(section[activeTp]);

                getTopic(section[activeTp]?.topicExerciseId, 0, localUserId || undefined)
                    .then((test) => {
                        setTopicTest(test);
                    })
            })
    }, [])

    const getTest = () => {
        const localUserId = localStorage.getItem("_static_uid");
        if (topic === "practice") {
            getTopic(sectionCurrent?.topicExerciseId, topicTest.length, localUserId || undefined)
                .then((test) => {
                    if (test) {
                        if (test.length < 10) setPagination(true);
                        setTopicTest([...topicTest, ...test]);
                    }
                })
        } else {
            getTopic(topic, topicSection.length, localUserId || undefined)
                .then((test) => {
                    if (test) {
                        if (test.length < 10) setPagination(true);
                        setTopicSection([...topicSection, ...test]);
                    }
                })
        }
    }

    console.log('section', topicSection);
    console.log('test', topicTest);

    return (
        <div className="practice">
            <div className="container">
                <h1 className="title-practice">
                    {topic}
                </h1>
                <div className="btn-download">
                    <Button className="google-play">
                        <a href="https://play.google.com/store/apps/details?id=com.estudyme.toeic"><img src="https://ielts-testpro.com/wp-content/uploads/2021/09/Frame.png" alt="" /> <span>Google Play</span></a>
                    </Button>
                    <Button className="app-store">
                        <a href="https://apps.apple.com/us/app/practice-for-toeic-test-pro/id1073535605"><img src="https://ielts-testpro.com/wp-content/uploads/2021/09/Vector.png" alt="" /> <span>App Store</span></a>
                    </Button>
                </div>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className="section-mb">
                            <div className="section-parent">
                                <div className="topic">{topic}</div>
                            </div>
                            <div className="list-section">
                                {
                                    topicSection && topicSection.map((item, index) => (
                                        <div className={+activeTp === +index ? 'section-child section-active' : 'section-child'} key={item.topicExerciseId}>
                                            <div className="section-item"><a href={`?topic=` + topic + `&section=` + index}>{item.name}</a></div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                        <div className="list-test">
                            <div className="section-current">{sectionCurrent?.name}</div>
                            <div className="test-detail">
                                {
                                    topic === 'grammar' || topic === 'vocabulary'
                                        ?
                                        topicSection && topicSection.map((item) => (
                                            <div className="test-item" key={item.topicExerciseId}>
                                                <FiberManualRecordIcon className="dot" />
                                                <div className="name"><a href={`https://toeic-testpro.com/learning?id=${item._id}`}>{item.name}</a></div>
                                                <div className="question-number">{item?.topicExercise?.questionsNum} questions</div>
                                                <div className="test-progress">{item.topicProgress ? item.topicProgress.progress + '%' : '0%'}</div>
                                            </div>
                                        ))
                                        :
                                        topicTest && topicTest.map((item) => (
                                            <div className="test-item" key={item.topicExerciseId}>
                                                <FiberManualRecordIcon className="dot" />
                                                <div className="name"><a href={`https://toeic-testpro.com/learning?id=${item._id}`}>{item.name}</a></div>
                                                <div className="question-number">{item?.topicExercise?.questionsNum} questions</div>
                                                <div className="test-progress">{item.topicProgress ? item.topicProgress.progress + '%' : '0%'}</div>
                                            </div>
                                        ))

                                }
                            </div>
                            <div className={pagination ? 'non-active' : 'show-more'}>
                                <Button className="btn-show-more" onClick={() => getTest()} endIcon={<KeyboardArrowDownIcon />}>
                                    Load More
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <div className="other-practice">
                            <div className="title">
                                Other Pratice
                            </div>
                            <div className="practice-child">
                                <div className={`practice-item vocabulary ` + mapPracticeChild['vocabulary']}>
                                    <div className="name">VOCABULARY</div>
                                    <div className="btn-join"><a href="?topic=vocabulary">Join</a></div>
                                </div>
                                <div className={`practice-item grammar ` + mapPracticeChild['grammar']}>
                                    <div className="name">GRAMMAR</div>
                                    <div className="btn-join"><a href="?topic=grammar">Join</a></div>
                                </div>
                                <div className={`practice-item practice-test ` + mapPracticeChild['practice']}>
                                    <div className="name">PRACTICE</div>
                                    <div className="btn-join"><a href="?topic=practice">Join</a></div>
                                </div>
                            </div>
                        </div>
                        {
                            topic === 'practice'
                                ?
                                <div className="section">
                                    <div className="section-parent">
                                        <div className="topic">{topic}</div>
                                    </div>
                                    <div className="list-section">
                                        {
                                            topicSection && topicSection.map((item, index) => (
                                                <div className={+activeTp === +index ? 'section-child section-active' : 'section-child'} key={item.topicExerciseId}>
                                                    <div className="section-item"><a href={`?topic=` + topic + `&section=` + index}>{item.name}</a></div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                :
                                ""
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Pratice