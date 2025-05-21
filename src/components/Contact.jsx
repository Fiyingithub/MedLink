const ContactUs = () => {
  return (
    <section className="bg-white py-12 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-2xl font-bold mb-2">Our Contact</h2>
        <p className="text-sm text-gray-600 mb-6">
          We're Here to Help You Every Step of the way
        </p>
        <form className="space-y-4">
          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="E.g 'John Biden'"
          />
          <input
            className="w-full border px-4 py-2 rounded"
            placeholder="E.g 'Johnbiden@gmail.com'"
          />
          <textarea
            className="w-full border px-4 py-2 rounded"
            placeholder="Your Consultation message"
            rows="4"
          />
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" /> Stay on Top of your
            Wellness
          </label>
          <button className="bg-blue-900 text-white w-full py-2 rounded font-semibold">
            Send Your Message Here
          </button>
        </form>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-blue-800 font-semibold text-lg">Get In touch</h3>
          <p className="text-sm text-gray-600 mt-2">
            Whether you have a question about our services, need help with your
            account, or want to provide feedback.
          </p>
        </div>
        <div>
          <h3 className="text-blue-800 font-semibold text-lg">Chat With Us</h3>
          <p className="text-sm text-gray-600 mt-2">
            Our Team is Available to Provide quick friendly assistance
          </p>
        </div>
        <div>
          <h3 className="text-blue-800 font-semibold text-lg">Call Us</h3>
          <p className="text-sm text-gray-600 mt-2">
            Need immediate Assistance? Call Us Today we’re here to Support Your
            Health Journey.
          </p>
        </div>
      </div>
    </section>
  );
};
export default ContactUs;
