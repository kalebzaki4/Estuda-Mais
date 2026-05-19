import React from 'react';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <nav className="relative z-10 mb-8">
      <ul className="flex space-x-4 border-b border-white/10">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-4 text-sm font-medium transition-colors duration-300 ${activeTab === tab.id
                ? 'text-brand-300 border-b-2 border-brand-300'
                : 'text-white/70 hover:text-white/90'
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TabNavigation;