import { fadeIn } from "../framer_motion/variant";


const Benifits = ({heading, text }) => {
  return (
    <div
      variants={fadeIn(`down`, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0 }}
      className="bg-gray-900 p-6 rounded-lg shadow-md"
    >
      <div className="text-blue-600 text-4xl mb-4">🗓️</div>
      <h3 className="text-xl font-semibold mb-3 text-white">
        {heading}
      </h3>
      <h1 className="text-gray-200">{text}</h1>
    </div>
  );
};

export default Benifits;