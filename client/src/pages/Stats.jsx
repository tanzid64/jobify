import customFetch from "../../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import StatsContainer from "../components/StatsContainer";
import ChartContainer from "../components/ChartContainer";
export const loader = async () => {
  try {
    const res = await customFetch.get("/jobs/stats");
    return res.data;
  } catch (error) {
    return error;
  }
};
const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications.length > 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
