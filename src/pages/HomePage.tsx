import React from 'react';
import { Code2, Users, Trophy, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectList from '../components/projects/ProjectList';

export default function HomePage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}


          {/* Hero Section */}
        <section className="text-center mb-20 relative">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 to-white opacity-20 rounded-lg">
           </div>
           <div className="relative z-10">  {/* This was missing a closing tag before */}

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Level Up Your Skills with Dev Club
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Join our vibrant community, contribute to exciting projects, and grow as a developer. Let's code, collaborate, and achieve greatness together!
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/projects" className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md transition-colors font-medium">
              Explore Projects
            </Link>
            <Link to="/join" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md transition-colors font-medium">
              Join the Club
            </Link>
          </div>
           </div> {/* Closing tag added here */}
        </section>

      {/* Projects Section */}
      <section className="mb-20">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900">Active Projects</h2>
            <Link
              to="/projects"
              className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
            >
              View All Projects <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
           <div className="bg-white rounded-lg shadow-md p-4">
            <ProjectList />
           </div>
        </section>

        {/* Features Section */}
          <section className="mb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            to="/coins"
            icon={<Code2 className="h-8 w-8 text-indigo-600" />}
            title="Dev Coins"
            description="Track your contributions and earn rewards through our Dev Coin system."
          />
          <FeatureCard
            to="/members"
            icon={<Users className="h-8 w-8 text-indigo-600" />}
            title="Members"
            description="Connect with fellow developers and explore member profiles."
          />
          <FeatureCard
            to="/leaderboard"
            icon={<Trophy className="h-8 w-8 text-indigo-600" />}
            title="Leaderboard"
            description="Compete with others and climb the ranks in our Dev Coin leaderboard."
          />
           <FeatureCard
            to="/events"
            icon={<Calendar className="h-8 w-8 text-indigo-600" />}
            title="Events"
            description="Participate in upcoming events, workshops, and hackathons."
          />
           <FeatureCard
            to="/challenges"
            icon={<Sparkles className="h-8 w-8 text-indigo-600" />}
            title="Challenges"
            description="Test your skills with our weekly coding challenges."
          />
        </div>
      </section>
      </div>
    </div>
  );
}

function FeatureCard({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1 focus:shadow-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-indigo-50 rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-indigo-600 font-medium">
          Learn More <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}