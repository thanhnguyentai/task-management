import React from 'react';
import createStore from './createStore';
import {Provider} from 'react-redux';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import App from './App';

function InitApp() {
  return (
    <Provider store={createStore()}>
      <DragDropContextProvider backend={HTML5Backend}>
        <App/>
      </DragDropContextProvider>
    </Provider>
  );
}

export default InitApp;
