import React from 'react';

export default function JoinPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Join the Dev Club</h1>

      <p className="text-gray-700 mb-8">
        Ready to become part of our growing community? Fill out the form below to
        get started. We're excited to have you on board!
      </p>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
         <iframe
            title="Dev Club Join Form"
            src="https://docs.google.com/forms/d/e/1FAIpQLSd46ipMne4CJmGo0iGrvNw3COLak7-1UcggosLUcDujQpotnQ/viewform?embedded=true"
            width="100%"  // Changed to 100% width for responsiveness
            height="1200"  // Adjust the height as needed
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
         >
           Loading…
         </iframe>
      </div>
    </div>
  );
}