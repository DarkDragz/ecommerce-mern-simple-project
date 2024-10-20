import { useSelector } from "react-redux";
import { CheckAuth } from "./components/common/checkAuth";
import { Router } from "./routes";
import {
  isAuthenticatedSelector,
  userTypeSelector,
} from "./store/selectors/authSelector";

function App() {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const userType = useSelector(userTypeSelector);
  return (
    <div className="flex flex-col overflow-hidden bg-white  ">
      <CheckAuth isAuthenticated={isAuthenticated} userType={userType}>
        <Router />
      </CheckAuth>
    </div>
  );
}

export default App;
