import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getTopic } from '../../api/getTopic';
import { mapPracticeChild } from '../../utils/rootTopic';
import './style.scss';

const Pratice = () => {
    const [topicSection, setTopicSection] = useState([]);
    const [topicTest, setTopicTest] = useState();
    const [sectionCurrent, setSectionCurrent] = useState();
    const [pagination, setPagination] = useState(false);

    // const param = window.location.pathname.split("/");
    // const topicParent = param[param.length - 1];
    const activeTopic = new URLSearchParams(window.location.search);
    const topic = activeTopic.get('topic');
    const activeTp = !activeTopic.get('section') ? 0 : activeTopic.get('section');
    mapPracticeChild[topic] = 'active';


    useEffect(() => {
        getTopic(topic)
            .then((section) => {
                setTopicSection(section);
                setSectionCurrent(section[activeTp]);

                getTopic(section[activeTp]?.topicExerciseId)
                    .then((test) => {
                        if (test.length < 10) setPagination(true);
                        setTopicTest(test);
                    })
            })
    }, [])

    const getTest = () => {
        getTopic(sectionCurrent?.topicExerciseId, topicTest.length)
            .then((test) => {
                if (test) {
                    if (test.length < 10) setPagination(true);
                    setTopicTest([...topicTest, ...test]);
                }
            })
    }

    console.log('render');
    // console.log('section', topicSection);
    // console.log('test', topicTest);

    return (
        <div className="practice">
            <div className="container">
                <div className="title-practice">
                    IELTS {topic}
                </div>
                <Grid container spacing={3}>
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                        <div className="list-test">
                            <div className="section-current">{sectionCurrent?.name}</div>
                            <div className="test-detail">
                                {
                                    topicTest && topicTest.map((item) => (
                                        <div className="test-item" key={item.topicExerciseId}>
                                            <FiberManualRecordIcon className="dot" />
                                            <div className="name">{item.name}</div>
                                            <div className="question-number">{item?.topicExercise?.questionsNum} câu hỏi</div>
                                            <div className="test-progress">{item.topicProgress ? item.topicProgress.progress + '%' : '0%'}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={pagination ? 'non-active' : 'show-more'}>
                                <Button className="btn-show-more" onClick={() => getTest()}>
                                    Xem thêm <KeyboardArrowDownIcon />
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <div className="section">
                            <div className="section-parent">
                                <div className="topic">IELTS {topic}</div>
                            </div>
                            <div className="list-section">
                                {
                                    topicSection && topicSection.map((item, index) => (
                                        <div className="section-child" key={item.topicExerciseId}>
                                            <div className="section-item"><a href={`/practice-list?topic=` + topic + `&section=` + index}>{item.name}</a></div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="other-pratice">
                            <div className="title">
                                Other Pratice
                            </div>
                            <div className="practice-child">
                                <div className={`pratice-item vocabulary ` + mapPracticeChild['vocabulary']}>
                                    <div className="name">VOCABULARY</div>
                                    <div className="btn-join"><a href="/practice-list?topic=vocabulary">Join</a></div>
                                </div>
                                <div className={`pratice-item writing ` + mapPracticeChild['writing']}>
                                    <div className="name">WRITING</div>
                                    <div className="btn-join"><a href="/practice-list?topic=writing">Join</a></div>
                                </div>
                                <div className={`pratice-item speaking ` + mapPracticeChild['speaking']}>
                                    <div className="name">SPEAKING</div>
                                    <div className="btn-join"><a href="/practice-list?topic=speaking">Join</a></div>
                                </div>
                                <div className={`pratice-item grammar ` + mapPracticeChild['grammar']}>
                                    <div className="name">GRAMMAR</div>
                                    <div className="btn-join"><a href="/practice-list?topic=grammar">Join</a></div>
                                </div>
                                <div className={`pratice-item reading ` + mapPracticeChild['reading']}>
                                    <div className="name">READING</div>
                                    <div className="btn-join"><a href="/practice-list?topic=reading">Join</a></div>
                                </div>
                                <div className={`pratice-item listening ` + mapPracticeChild['listening']}>
                                    <div className="name">LISTENING</div>
                                    <div className="btn-join"><a href="/practice-list?topic=listening">Join</a></div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Pratice