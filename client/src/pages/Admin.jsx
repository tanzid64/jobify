import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const res = await customFetch.get("/users/admin/app-sats");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        count={users}
        title="Users"
        icon={<FaSuitcaseRolling />}
        color="#e9b949"
        bcg="#fcefc7"
      />
      <StatItem
        count={jobs}
        title="Jobs"
        icon={<FaCalendarCheck />}
        color="#647acb"
        bcg="#e0e8f9"
      />
    </Wrapper>
  );
};
export default Admin;
