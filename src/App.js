import './App.css';
import Topic from './components/topic/Topic';

function App() {

  // useEffect(() => {
  //   // const getTopic = async (topic, activeTp) => {
  //   //   const section = await axios.post("https://api-estudyme.koolsoft.ga/api/offset-topics-by-parent-id", {
  //   //     "courseId": "6112209e1e6e0c7cbe105841",
  //   //     "parentId": mapRootTopic[topic],
  //   //     "field": "orderIndex",
  //   //     "skip": 0,
  //   //     "limit": 20
  //   //   });
  //   //   setTopicSection(section.data.data);

  //   //   const tests = await axios.post("https://api-estudyme.koolsoft.ga/api/offset-topics-by-parent-id", {
  //   //     "courseId": "6112209e1e6e0c7cbe105841",
  //   //     "parentId": section?.data?.data[activeTp].topicExerciseId,
  //   //     "field": "orderIndex",
  //   //     "skip": 0,
  //   //     "limit": 20
  //   //   });
  //   //   setTopicTest(tests.data.data);
  //   // };
  // }, [])

  return (
    <div>
       <Topic />
    </div>
  )
}

export default App;
