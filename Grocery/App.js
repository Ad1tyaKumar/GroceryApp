import Main from './Main';
import { Provider } from 'react-redux';
import store from './store'
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
          <Main />
      </Provider>
    </RootSiblingParent>
  );
}

