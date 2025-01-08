import React, { useState } from 'react';
import { Gamepad2, Wallet } from 'lucide-react';

const chains = [
  { id: 'polygon', name: 'Polygon', icon: '⬡' },
  { id: 'bnb', name: 'BNB Chain', icon: '⛓' },
  { id: 'ronin', name: 'Ronin', icon: '🗡' },
  { id: 'starknet', name: 'Starknet', icon: '★' }
];

const Dashboard = () => {
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [steamConnected, setSteamConnected] = useState(false);
  const [step, setStep] = useState(1);

  const handleChainSelect = (chainId: string) => {
    setSelectedChains(prev => 
      prev.includes(chainId) 
        ? prev.filter(id => id !== chainId)
        : [...prev, chainId]
    );
  };

  const handleSteamConnect = () => {
    setSteamConnected(true);
    setStep(2);
  };

  const handleSubmit = () => {
    // Handle final submission
    console.log('Selected chains:', selectedChains);
    console.log('Steam connected:', steamConnected);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to worldRep</h1>
        <p className="text-gray-600">Connect your gaming accounts to get started</p>
      </div>

      <div className={`transition-opacity duration-300 ${step !== 1 ? 'opacity-50' : ''}`}>
        <h2 className="text-xl font-semibold mb-4">Step 1: Connect your Steam account</h2>
        <button
          onClick={handleSteamConnect}
          className={`flex items-center justify-center gap-2 w-full p-4 rounded-lg 
            ${steamConnected 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-gray-800 hover:bg-gray-700'} 
            text-white transition-colors`}
        >
          <Gamepad2 className="w-6 h-6" />
          {steamConnected ? 'Steam Connected' : 'Connect Steam Account'}
        </button>
      </div>

      <div className={`transition-opacity duration-300 ${step !== 2 ? 'opacity-50' : ''}`}>
        <h2 className="text-xl font-semibold mb-4">Step 2: Connect with these popular chains</h2>
        <div className="grid grid-cols-2 gap-4">
          {chains.map(chain => (
            <button
              key={chain.id}
              onClick={() => handleChainSelect(chain.id)}
              disabled={step !== 2}
              className={`p-4 rounded-lg border-2 transition-all
                ${selectedChains.includes(chain.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'}
                flex items-center justify-between`}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{chain.icon}</span>
                {chain.name}
              </span>
              <Wallet className={`w-5 h-5 ${selectedChains.includes(chain.id) ? 'text-blue-500' : 'text-gray-400'}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={handleSubmit}
          disabled={!steamConnected || selectedChains.length === 0}
          className={`w-full p-4 rounded-lg text-white transition-colors
            ${(!steamConnected || selectedChains.length === 0)
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Dashboard;