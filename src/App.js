import { Provider } from "react-redux";

import "./App.css";
import BaseRoutes from "./Routing/routes";
import store from "./Redux/Store/Store";

export default function App() {
  return (
    <Provider store={store}>
      <BaseRoutes />
    </Provider>
  );
}
