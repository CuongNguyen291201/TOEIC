import './App.css';
import FullTest from './components/full-test/FullTest';
import Topic from './components/topic/Topic';

function App() {
  const param = window.location.pathname.split("/");
  const topicParent = param[param.length - 1];

  console.log('topic parent', topicParent);

  return (
    <>
      {
        topicParent === "practice-list" ?
          <Topic />
          :
          <FullTest />
      }
    </>
  )
}

export default App;