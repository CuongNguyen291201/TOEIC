import './App.css';
import Topic from './components/topic/Topic';
import PageNotFound from './components/notfound/PageNotFound';

function App() {
  const param = window.location.pathname.split("/");
  const topicParent = param[param.length - 2];

  console.log(typeof topicParent);

  return (
    <div>
      {
        topicParent === "practice-list" ?
          <Topic />
          :
          <PageNotFound />
      }
    </div>
  )
}

export default App;