import { Button, Config, Space, Tabs } from "antd";
import RecordAudio from "./components/RecordAudio";
import UploadAudio from "./components/UploadAudio"
import Intro from "./components/Intro"
import Response from "./components/Response";
function App() {
  let items  = [
    {
      label: `Record Audio`,
      key: 1,
      children: <RecordAudio/>,
    },
    {
      label: `Upload Audio`,
      key: 2,
      children: <UploadAudio/>,
    }

  ]
  return (
    <div className="App">
    <Intro/>


      <Tabs
        tabPosition={'top'}
        items={items}
        
      />

      <Response/>


    </div>
  );
}

export default App;
