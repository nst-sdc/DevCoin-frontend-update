import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member, Contribution, mockMembers } from '../types';

interface DevCoinContextType {
  members: Member[];
  addContribution: (memberId: string, contribution: Omit<Contribution, 'id' | 'date' | 'verified'>) => void;
  updateMemberCoins: (memberId: string, coins: number) => void;
}

const DevCoinContext = createContext<DevCoinContextType | undefined>(undefined);

export function DevCoinProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<Member[]>(() => {
    const savedMembers = localStorage.getItem('devClubMembers');
    return savedMembers ? JSON.parse(savedMembers) : mockMembers;
  });

  useEffect(() => {
    localStorage.setItem('devClubMembers', JSON.stringify(members));
  }, [members]);

  const addContribution = (
    memberId: string,
    contribution: Omit<Contribution, 'id' | 'date' | 'verified'>
  ) => {
    setMembers(prevMembers =>
      prevMembers.map(member => {
        if (member.id === memberId) {
          const newContribution: Contribution = {
            ...contribution,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            verified: false,
          };
          return {
            ...member,
            devCoins: member.devCoins + contribution.coins,
            contributions: [...member.contributions, newContribution],
          };
        }
        return member;
      })
    );
  };

  const updateMemberCoins = (memberId: string, coins: number) => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === memberId ? { ...member, devCoins: coins } : member
      )
    );
  };

  return (
    <DevCoinContext.Provider value={{ members, addContribution, updateMemberCoins }}>
      {children}
    </DevCoinContext.Provider>
  );
}

export function useDevCoin() {
  const context = useContext(DevCoinContext);
  if (context === undefined) {
    throw new Error('useDevCoin must be used within a DevCoinProvider');
  }
  return context;
}
