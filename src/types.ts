export interface Member {
  id: string;
  name: string;
  email: string;
  github: string;
  linkedinId?: string;
  role: string;
  avatar: string;
  devCoins: number;
  contributions: Contribution[];
  isAdmin?: boolean;
}

export interface Contribution {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  title: string;
  description: string;
  contributionType: ContributionType;
  devCoins: number;
  status: DevCoinRequestStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  comments?: string;
}

export type ContributionType = 
  | 'CODE_REVIEW' 
  | 'BUG_FIX' 
  | 'FEATURE' 
  | 'DOCUMENTATION' 
  | 'TESTING' 
  | 'MENTORING' 
  | 'OTHER';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  github: string;
  linkedinId: string;
  password: string; // This will be hashed
  role: string;
  isAdmin?: boolean;
}

export const CONTRIBUTION_TYPES = {
  PR: { label: 'Pull Request', coins: 50 },
  BUG_FIX: { label: 'Bug Fix', coins: 30 },
  DOCUMENTATION: { label: 'Documentation', coins: 20 },
  CODE_REVIEW: { label: 'Code Review', coins: 15 },
  WORKSHOP: { label: 'Workshop Hosting', coins: 100 },
  EVENT: { label: 'Event Organization', coins: 80 },
  MENTORING: { label: 'Mentoring Session', coins: 60 },
  BLOG: { label: 'Technical Blog', coins: 40 }
};

export type DevCoinRequestStatus = 'pending' | 'approved' | 'rejected';

export interface DevCoinRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  reason: string;
  description: string;
  status: DevCoinRequestStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  comments?: string;
}

export const mockMembers: Member[] = [
  // Frontend Developers
  {
    id: 'f1',
    name: 'Siddharth Pareek',
    email: '',
    github: 'siddharth-pareek',
    linkedinId: '',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'f2',
    name: 'NIHAL C',
    email: 'nihalchollampat@gmail.com',
    github: 'NIhalChollampat',
    linkedinId: 'https://www.linkedin.com/in/nihal-c-99704132b/',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'f3',
    name: 'Ayush Kumar Mandal',
    email: '',
    github: 'ayush-mandal',
    linkedinId: '',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'f4',
    name: 'Neel',
    email: 'neelarm.code@gmail.com',
    github: 'neel3o115',
    linkedinId: 'https://linkedin.com/in/neel-verma-141844318/',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'f5',
    name: 'Nitya Jain',
    email: '',
    github: 'nitya-jain',
    linkedinId: '',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'f6',
    name: 'Aditya Prakash',
    email: '',
    github: 'aditya-prakash',
    linkedinId: '',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },

  // Backend Developers
  {
    id: 'b1',
    name: 'Burra Karthikeya',
    email: '',
    github: 'burra-karthikeya',
    linkedinId: '',
    role: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1640951613773-54706e06851d?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'b2',
    name: 'Gunavanth Reddy',
    email: '',
    github: 'gunavanth-reddy',
    linkedinId: '',
    role: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'b3',
    name: 'Abhay Pratap Yadav',
    email: '',
    github: 'abhay-pratap',
    linkedinId: '',
    role: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'b4',
    name: 'Rahul Gupta',
    email: 'rahulgupta193246@gmail.com',
    github: 'Rahulgupta7777',
    linkedinId: 'https://linkedin.com/in/rahul-gupta-992259326',
    role: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'b5',
    name: 'Arohi Jadhav',
    email: '',
    github: 'arohi-jadhav',
    linkedinId: '',
    role: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    devCoins: 0,
    contributions: [],
  },

  // DevOps Engineers
  {
    id: 'd1',
    name: 'Vivek Wagdare',
    email: '',
    github: 'vivek-wagdare',
    linkedinId: '',
    role: 'DevOps Engineer',
    avatar: 'https://avatars.githubusercontent.com/u/92390419?v=4',
    devCoins: 200,
    contributions: [],
  },
  {
    id: 'd2',
    name: 'Ayush Shukla',
    email: '',
    github: 'ayush-shukla',
    linkedinId: '',
    role: 'DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'd3',
    name: 'B Sai Thrishul',
    email: '',
    github: 'sai-thrishul',
    linkedinId: '',
    role: 'DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },

  // Designers
  {
    id: 'des1',
    name: 'Riddhi',
    email: '',
    github: 'riddhi',
    linkedinId: '',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'des2',
    name: 'Sakina',
    email: 'sakena1303@gmail.com',
    github: 'sakina1303',
    linkedinId: '',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'des3',
    name: 'Ananya Gupta',
    email: 'ananynagupta@gmail.com',
    github: 'anya_xcode',
    linkedinId: 'https://linkedin.com/in/ananya-gupta-7235a5319',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'des4',
    name: 'Vipul',
    email: 'ydvvipul2005@gmail.com',
    github: 'codervipul775',
    linkedinId: 'https://linkedin.com/in/vipul-yadav-b0a82231a/',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },

  // Mobile App Developers
  {
    id: 'm1',
    name: 'Tanubhav',
    email: '',
    github: 'tanubhav',
    linkedinId: '',
    role: 'Mobile App Developer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'm2',
    name: 'Chiranjeev',
    email: '',
    github: 'chiranjeev',
    linkedinId: '',
    role: 'Mobile App Developer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'm3',
    name: 'Kanishk Kumar Ranjan',
    email: '',
    github: 'kanishk-kumar',
    linkedinId: '',
    role: 'Mobile App Developer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'm4',
    name: 'Daksh Saini',
    email: '',
    github: 'daksh-saini',
    linkedinId: '',
    role: 'Mobile App Developer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },

  // Volunteers
  {
    id: 'v1',
    name: 'Yash Mali',
    email: '',
    github: 'yash-mali',
    linkedinId: '',
    role: 'Volunteer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'v2',
    name: 'Arpit Sarang',
    email: '',
    github: 'arpit-sarang',
    linkedinId: '',
    role: 'Volunteer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'v3',
    name: 'Kirti Gautam',
    email: '',
    github: 'kirti-gautam',
    linkedinId: '',
    role: 'Volunteer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'v4',
    name: 'Birajit Saikia',
    email: '',
    github: 'birajit-saikia',
    linkedinId: '',
    role: 'Volunteer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'v5',
    name: 'Ayush Pandey',
    email: '',
    github: 'ayush-pandey',
    linkedinId: '',
    role: 'Volunteer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },
  {
    id: 'v6',
    name: 'Aditya Raj Soni',
    email: '',
    github: 'aditya-raj-soni',
    linkedinId: '',
    role: 'Volunteer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=400',
    devCoins: 0,
    contributions: [],
  },
];