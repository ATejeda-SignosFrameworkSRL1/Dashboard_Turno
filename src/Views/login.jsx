import { LoginLogic } from "../components/login/LoginLogic";
import { Footer } from "../components/footer/footer";

export const Login = function () {
  return (
    <>
      <div className="App">
        <LoginLogic />
        <Footer />
      </div>
    </>
  );
};
