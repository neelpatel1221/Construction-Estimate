import React from "react";

const Testimonials = () => {
  const testimonialsData = [
    {
      quote:
        "ConstructEstimate Pro revolutionized the way we approach construction cost estimation. The intuitive interface and precision algorithms are unmatched.",
      author: "John Doe, Project Manager",
    },
    {
      quote:
        "Effortless comparison and accurate estimates have made our project planning more efficient. ConstructEstimate Pro is a game-changer!",
      author: "Jane Smith, Architect",
    },
    {
      quote:
        "We can confidently rely on ConstructEstimate Pro for our construction projects. It has simplified the entire process and saved us valuable time.",
      author: "Mike Johnson, Contractor",
    },
  ];

  const testimonialSectionStyle = {
    backgroundColor: "#3b82f6", // Change this color to your desired background color
  };

  return (
    <section className="p-16 bg-gray-800">
      <div className="container mx-auto text-white">
        <h2 className="text-4xl font-extrabold mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-md shadow-lg">
              <p className="text-gray-700 mb-4">{testimonial.quote}</p>
              <p className="text-gray-500">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
