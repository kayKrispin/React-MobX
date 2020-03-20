import React from 'react';
import './App.css';
import { Tabs } from 'antd';
import ClassStore from "./classBasedStore";
import ClassComponent from "./ClassComponent";
import FunctionComponent from "./FunctionalComponent";
import Todo from "./Todo";


const { TabPane } = Tabs;

 class App extends React.Component {

  render () {
    return (
      <div className="App">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Function MobX" key="3">
            <Todo/>
          </TabPane>
          <TabPane tab="Class MobX" key="1">
            <ClassComponent store={ClassStore} />
          </TabPane>
          <TabPane tab="Function MobX" key="2">
            <FunctionComponent/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
