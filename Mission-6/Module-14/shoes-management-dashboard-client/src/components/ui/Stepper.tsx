import { Steps } from "antd";

const Stepper = ({ index }: { index: number }) => {
  return (
    <Steps
      current={index}
      items={[
        {
          title: "Pending",
        },
        {
          title: "In-Progress",
        },
        {
          title: "Completed",
        },
      ]}
    />
  );
};
export default Stepper;
