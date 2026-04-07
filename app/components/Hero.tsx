import { Link } from 'react-router';

type HeroProps = {
  name?: string;
  text?: string;
};

const Hero: React.FC<HeroProps> = ({
  name = '[NAME]',
  text = 'I build friendly web experiences and help others become confident, modern developers.',
}) => {
  return (
    <header className="bg-gray-900 px-4 py-20 text-center text-white transition-colors duration-300">
      <h2 className="mb-4 text-4xl font-bold">Hey, I' m {name} 👋</h2>
      <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-300">{text}</p>
      <div className="flex justify-center gap-4">
        <Link
          to="projects"
          className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
        >
          View Projects
        </Link>
        <Link
          to="/contact"
          className="rounded border border-blue-500 px-6 py-2 text-blue-400 transition hover:bg-blue-600 hover:text-white"
        >
          Contact Me
        </Link>
      </div>
    </header>
  );
};

export default Hero;
