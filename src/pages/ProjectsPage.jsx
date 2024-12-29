import React from 'react';
import ProjectList from '../components/projects/ProjectList';


export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Projects</h1>
       <p className="text-gray-700 mb-8">
        Check out the projects we are currently working on!
      </p>
      <div className="bg-white rounded-lg shadow-md p-4">
        <ProjectList />
      </div>

    </div>
  );
}