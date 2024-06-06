import { Form, Link, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login Successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error);
    return error;
  }
};
const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    try {
      await customFetch.post("/auth/login", {
        email: "test@test.com",
        password: "blog1234",
      });
      toast.success("Take a test drive");
      return navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };
  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Not a member yet?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
