import React, { useState, useEffect } from 'react'
import { Grid, Button, Link, Box } from '@mui/material';
import { styled } from "@mui/material/styles";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const ReviewButton = styled(Button)({
        borderRadius: "5px",
        border: "0.5px solid #B6B6B6",
        color: "#797979",
        fontWeight: 600,
        '&:hover': {
            border: "0.5px solid #B6B6B6",
            color: "#797979"
        }
    });

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
                    <Grid item sm={12} xs={12}>
                        <div className="section-mb">
                            <div className="section-parent">
                                <div className="topic">OTHER PRACTICES</div>
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
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <div className="list-test">
                            <div className="section-current">{topic === 'practice' ? sectionCurrent?.name : topic}</div>
                            <div className="test-detail">
                                {
                                    topic === 'grammar' || topic === 'vocabulary'
                                        ?
                                        topicSection && topicSection.map((item) => {
                                            const isPlayed = typeof item?.score !== "undefined";

                                            return (
                                                <div className="test-item" key={item.topicExerciseId}>
                                                    <Link style={{ color: "#29313A" }} href={`https://toeic-testpro.com/learning?id=${item._id}`} underline="none" flex={1}>
                                                        <Box display="flex" alignItems="center">
                                                            {isPlayed ? <img src="/wp-content/uploads/2021/12/Group-9790.svg" alt="check-icon" className="done-topic-icon" /> : <FiberManualRecordIcon className="dot" />}
                                                            <div className="name">{item.name}</div>
                                                        </Box>
                                                    </Link>
                                                    <Box display="flex" alignItems="center" gap="8px">
                                                        {isPlayed && <ReviewButton className="btn-review" onClick={() => {
                                                            window.location.href = `https://toeic-testpro.com/learning?id=${item._id}&review`;
                                                        }} variant="outlined">Review</ReviewButton>}
                                                        <div className="test-progress">{!!item.topicProgress ? item.topicProgress.progress + '%' : '0%'}</div>
                                                    </Box>
                                                </div>
                                            )
                                        })
                                        :
                                        topicTest && topicTest.map((item) => {
                                            const isPlayed = typeof item?.score !== "undefined";

                                            return (
                                                <div className="test-item" key={item.topicExerciseId}>
                                                    <Link style={{ color: "#29313A" }} href={`https://toeic-testpro.com/learning?id=${item._id}`} underline="none" flex={1}>
                                                        <Box display="flex" alignItems="center">
                                                            {isPlayed ? <img src="/wp-content/uploads/2021/12/Group-9790.svg" alt="check-icon" className="done-topic-icon" /> : <FiberManualRecordIcon className="dot" />}
                                                            <div className="name">{item.name}</div>
                                                        </Box>
                                                    </Link>
                                                    <Box display="flex" alignItems="center" gap="8px">
                                                        {isPlayed && <ReviewButton className="btn-review" onClick={() => {
                                                            window.location.href = `https://toeic-testpro.com/learning?id=${item._id}&review`;
                                                        }} variant="outlined">Review</ReviewButton>}
                                                        <div className="test-progress">{!!item.topicProgress ? item.topicProgress.progress + '%' : '0%'}</div>
                                                    </Box>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                            <div className={pagination ? 'non-active' : 'show-more'}>
                                <Button className="btn-show-more" onClick={() => getTest()} endIcon={<KeyboardArrowDownIcon />}>
                                    Load More
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <div className="other-practice">
                            <div className="title">Other Practices</div>
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
                                    <div className="section-parent">OTHER PARTS</div>
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