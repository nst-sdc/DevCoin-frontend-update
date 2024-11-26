import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'My Coins', href: '/coins' },
  { name: 'Members', href: '/members' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'Contributions', href: '/contributions' },
];

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar navigation={navigation} />
      <main className="pt-16">
        {/* Content container with max width and padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
