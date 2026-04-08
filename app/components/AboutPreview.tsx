import { Link } from 'react-router';

const AboutPreview = () => {
  return (
    <section className="mt-12 flex flex-col items-center gap-8 bg-gray-900 p-10 md:flex-row">
      <img
        src="/images/profile.jpg"
        alt="profile"
        className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover shadow-md"
      />
      <div>
        <h2 className="mb-2 text-2xl font-bold text-white">👋 About Me</h2>
        <p className="mb-4 max-w-4xl text-gray-200">
          I'm Htet - a self-taught software developer and content creator passionate about building
          software and helping other grow into confident modern devs.
        </p>
        <Link to="/about" className="test-sm inline-block text-blue-400 hover:underline">
          Learn More About Me
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;
