import React from "react";
import { useObserver, useLocalStore } from "mobx-react";
import { Button } from "antd";

const StoreContext = React.createContext();

function StoreContextProvider({ children }) {

  const store = useLocalStore(() => ({
    bugs: ["жук", "колорад", "сволоч"],
    addBug: bug => {
      store.bugs.push(bug)
    },
    get bugsLength() {
      return store.bugs.length;
    }
  }));

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>

};

function BugHeader() {
  const store = React.useContext(StoreContext);


  return  useObserver( () =>
    <h1>{store.bugsLength} : Bugs</h1>
  )
}

function BugForm() {
  const store = React.useContext(StoreContext);
  const [bug, setBug] = React.useState("");

  const onAdd = () => {
    store.addBug(bug);
    setBug("");
  };

  return (
    <form>
      <input value={bug} onChange={e => setBug(e.target.value)} type="text"/>
      <Button onClick={onAdd}>Add btn</Button>
    </form>
  )
};

function BugList() {
  const store = React.useContext(StoreContext);

  return useObserver(() => (
    <>
      <main>Bugs</main>
      <ul>
        {store.bugs.map(bug => <li>{bug}</li>)}
      </ul>
    </>
  ))
};


export default function Bugs() {
  return (
    <StoreContextProvider>
        <BugHeader/>
        <BugList/>
        <BugForm/>
    </StoreContextProvider>
  )
};
