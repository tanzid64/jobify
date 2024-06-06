import FormRow from "../components/FormRow";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext, Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { SubmitBtn } from "../components";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 5000000) {
    toast.error("Image size exceeded");
    return null;
  }
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          {/* File Input */}
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 mb)
            </label>
            <input
              type="file"
              className="form-input"
              name="avatar"
              id="avatar"
              accept="image/*"
            />
          </div>
          {/* Other Input */}
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow type="text" name="lastName" defaultValue={lastName} />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
