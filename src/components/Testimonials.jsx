import React from "react";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const testimonial = {
    name: "Lisa Norman",
    role: "Dental Patient",
    quote:
      "I want to express my appreciation for a very finely run and professional facility. My family was always encouraged to ask questions, which allowed them to participate in my recovery.",
  };
  return (
    <section className="bg-white py-12 px-6 max-w-7xl mx-auto">
      <h3 className="text-center text-lg font-semibold border w-max mx-auto px-6 py-1 border-gray-300 text-gray-600 mb-2">
        TESTIMONIALS
      </h3>
      <h2 className="text-center text-xl md:text-2xl font-bold mb-8">
        Feedbacks about our Service
        <br />
        from the bottom of heart
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <TestimonialCard key={i} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
