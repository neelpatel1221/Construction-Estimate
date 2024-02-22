import React, { useState } from "react";

const testimonialsData = [
  {
    quote:
      "ConstructEstimate Pro revolutionized the way we approach construction cost estimation. The intuitive interface and precision algorithms are unmatched.",
    author: "John Doe",
    position: "Project Manager",
  },
  {
    quote:
      "Effortless comparison and accurate estimates have made our project planning more efficient. ConstructEstimate Pro is a game-changer!",
    author: "Jane Smith",
    position: "Architect",
  },
  {
    quote:
      "We can confidently rely on ConstructEstimate Pro for our construction projects. It has simplified the entire process and saved us valuable time.",
    author: "Mike Johnson",
    position: "Contractor",
  },
];

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleNextTestimonial = () => {
    setCurrentTestimonial(
      (prevTestimonial) => (prevTestimonial + 1) % testimonialsData.length
    );
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial(
      (prevTestimonial) =>
        (prevTestimonial - 1 + testimonialsData.length) %
        testimonialsData.length
    );
  };

  return (
    <section className="bg-gray-800 text-white p-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold mb-8">What Our Clients Say</h2>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-md shadow-lg transform transition-transform ${
                index === currentTestimonial
                  ? "opacity-100"
                  : "opacity-50 scale-95"
              }`}
            >
              <p className="text-gray-700 mb-4">{testimonial.quote}</p>
              <p className="text-gray-500">
                - {testimonial.author}, {testimonial.position}
              </p>
            </div>
          ))}
          <button
            onClick={handlePrevTestimonial}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
          >
            &#8249;
          </button>
          <button
            onClick={handleNextTestimonial}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
