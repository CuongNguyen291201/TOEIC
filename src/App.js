import './App.css';
import FullTest from './components/full-test/FullTest';
import Topic from './components/topic/Topic';

function App() {
  const param = window.location.pathname.split("/");
  const topicParent = param[param.length - 1];

  return (
    <div>
      {/* {
        topicParent === "practice-list" ?
          <Topic />
          :
          <FullTest />
      } */}
      <Topic />
    </div>
  )
}

export default App;