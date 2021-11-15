import React, { useState, useEffect } from 'react'
import { getTopic } from '../../api/getTopic';
import { Grid } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './style.scss';

const Pratice = () => {
    const [topicSection, setTopicSection] = useState([]);
    const [topicTest, setTopicTest] = useState([]);
    const [sectionCurrent, setSectionCurrent] = useState();

    const param = window.location.pathname.split("/");
    const activeTopic = new URLSearchParams(window.location.search);
    const topicParent = param[param.length - 1];
    const topic = activeTopic.get('topic');
    const activeTp = !activeTopic.get('section') ? 0 : activeTopic.get('section');

    useEffect(() => {
        getTopic(topic)
            .then((section) => {
                setTopicSection(section);
                setSectionCurrent(section[activeTp]?.name);

                getTopic(section[activeTp]?.topicExerciseId)
                    .then((test) => {
                        setTopicTest(test);
                    })
            })
    }, [])

    console.log('render');
    console.log('section', topicSection);
    console.log('test', topicTest);
    console.log('section current', sectionCurrent);

    return (
        <div className="practice">
            <div className="container">
                <Grid container spacing={1}>
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                        <div className="list-test">
                            <div className="section-current">{sectionCurrent}</div>
                            <div className="test-detail">

                                {
                                    topicTest && topicTest.map((item) => (
                                        <div className="test-item" key={item.topicExerciseId}>
                                            <FiberManualRecordIcon className="dot"/>
                                            <p className="name">{item.name}</p>
                                            <p className="question-number">{item?.topicExercise?.questionsNum} câu hỏi</p>
                                            <p className="test-progress">{item.topicProgress ? item.topicProgress.progress + '%' : ''}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={12}>
                        <div className="section">
                            <div className="section-parent">
                                <div className="topic">IELTS {topic}</div>
                            </div>
                            <div className="section-child">
                                {
                                    topicSection && topicSection.map((item, index) => (
                                        <div className="section-child" key={item.topicExerciseId}>
                                            <div className="section-item"><a href={`/practice?topic=`+topic+`&section=`+index}>{item.name}</a></div>
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
                                <div className="pratice-item vocabulary">
                                    <div className="name">VOCABULARY</div>
                                    <div className="btn-join">Join</div>
                                </div>
                                <div className="pratice-item writing">
                                    <div className="name">WRITING</div>
                                    <div className="btn-join">Join</div>
                                </div>
                                <div className="pratice-item speaking">
                                    <div className="name">SPEAKING</div>
                                    <div className="btn-join">Join</div>
                                </div>
                                <div className="pratice-item grammar">
                                    <div className="name">GRAMMAR</div>
                                    <div className="btn-join">Join</div>
                                </div>
                                <div className="pratice-item reading">
                                    <div className="name">READING</div>
                                    <div className="btn-join">Join</div>
                                </div>
                                <div className="pratice-item listening">
                                    <div className="name">LISTENING</div>
                                    <div className="btn-join">Join</div>
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
