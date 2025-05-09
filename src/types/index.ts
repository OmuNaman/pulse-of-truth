
export type VerificationType = 'official' | 'verified-journalist' | 'unverified' | 'disputed';

export type SourceType = 'government' | 'journalist' | 'social-media' | 'anonymous';

export interface Source {
  id: string;
  name: string;
  handle?: string;
  profileImage?: string;
  type: SourceType;
  verificationStatus: VerificationType;
  trustScore: number; // 0-100
  bio?: string;
}

export interface Post {
  id: string;
  content: string;
  timestamp: string;
  source: Source;
  verificationStatus: VerificationType;
  trustScore: number;
  tags: string[];
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
  location?: {
    lat: number;
    lng: number;
    name: string;
  };
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

// Removed TimelineEvent interface

export type FactCheckStatus = 'true' | 'false' | 'partially-true' | 'unverified';

export interface FactCheck {
  id: string;
  claim: string;
  status: FactCheckStatus;
  explanation: string;
  relatedPosts: string[]; // IDs of related posts
  timestamp: string;
}