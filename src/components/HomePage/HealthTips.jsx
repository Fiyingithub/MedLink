import assets from "../../assets/images/assets";
import HealthTipCard from "./HealthTipCard";

const tips = [
  {
    title: "Stress vs. anxiety: How to tell the difference",
    description:
      "Everyone gets stressed and anxious from time to time. Find out the differences...",
    image: assets.Tips1Img,
    link: "#",
  },
  {
    title: "Why do I have a headache?",
    description:
      "There are many types of headache. Some are mild and pass quickly, while...",
    image: assets.Tips2Img,
    link: "#",
  },
  {
    title: "Asthma & allergies",
    description:
      "Asthma is a chronic airway condition that leads to wheezing and difficulty breathing...",
    image: assets.Tips3Img,
    link: "#",
  },
];

const HealthTips = () => {
  return (
    <section className="py-12 px-4 bg-white" id="health">
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold">Latest Healthcare Tips</h2>
        <a href="#" className="text-blue-800 font-medium hover:underline">
          See all
        </a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[...tips, ...tips].map((tip, index) => (
          <HealthTipCard key={index} {...tip} />
        ))}
      </div>
    </section>
  );
};

export default HealthTips;
