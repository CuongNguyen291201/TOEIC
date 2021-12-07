import axios from "axios";
import { mapRootTopic } from '../utils/rootTopic';

// get topic by paren id
export const getTopic = async (topic, skip=0, userId) => {
    const sectionTest = await axios.post("https://api-estudyme.koolsoft.ga/api/offset-topics-by-parent-id", {
        "courseId": "611220911e6e0c7cbe105835",
        "parentId": topic in mapRootTopic ? mapRootTopic[topic] : topic,
        userId,
        "field": "orderIndex",
        "skip": skip,
        "limit": 20
    });
    return sectionTest.data.data;
}