
import { Post, Source, TimelineEvent } from '../types';

export const sources: Source[] = [
  {
    id: 'src-1',
    name: 'Indian Army',
    handle: '@adgpi',
    profileImage: '/placeholder.svg',
    type: 'government',
    verificationStatus: 'official',
    trustScore: 95,
    bio: 'Official handle of the Indian Army'
  },
  {
    id: 'src-2',
    name: 'Ministry of Defence',
    handle: '@SpokespersonMoD',
    profileImage: '/placeholder.svg',
    type: 'government',
    verificationStatus: 'official',
    trustScore: 92,
    bio: 'Official handle of the Ministry of Defence, India'
  },
  {
    id: 'src-3',
    name: 'ISPR Pakistan',
    handle: '@ISPRPakistan',
    profileImage: '/placeholder.svg',
    type: 'government',
    verificationStatus: 'official',
    trustScore: 90,
    bio: 'Official handle of Inter-Services Public Relations, Pakistan'
  },
  {
    id: 'src-4',
    name: 'Jane Smith',
    handle: '@janesmith',
    profileImage: '/placeholder.svg',
    type: 'journalist',
    verificationStatus: 'verified-journalist',
    trustScore: 88,
    bio: 'War correspondent with 15 years of experience in conflict zones'
  },
  {
    id: 'src-5',
    name: 'John Doe',
    handle: '@johndoe',
    profileImage: '/placeholder.svg',
    type: 'journalist',
    verificationStatus: 'verified-journalist',
    trustScore: 85,
    bio: 'Independent journalist specializing in military analysis'
  },
  {
    id: 'src-6',
    name: 'Anonymous User',
    handle: '@anon_user123',
    profileImage: '/placeholder.svg',
    type: 'social-media',
    verificationStatus: 'unverified',
    trustScore: 45,
    bio: 'Social media user sharing updates'
  },
  {
    id: 'src-7',
    name: 'Trending Topic',
    handle: '@trending_now',
    profileImage: '/placeholder.svg',
    type: 'social-media',
    verificationStatus: 'disputed',
    trustScore: 30,
    bio: 'Sharing trending information'
  }
];

export const posts: Post[] = [
  {
    id: 'post-1',
    content: 'Official statement: Our forces have successfully conducted a planned training exercise near the eastern border. All personnel are safe.',
    timestamp: '2025-05-09T09:15:00Z',
    source: sources[0],
    verificationStatus: 'official',
    trustScore: 95,
    tags: ['official', 'govt-verified', 'military-statement', 'training-exercise'],
    media: [
      {
        type: 'image',
        url: '/placeholder.svg'
      }
    ],
    location: {
      lat: 28.5,
      lng: 77.2,
      name: 'Eastern Border'
    },
    engagement: {
      likes: 1250,
      shares: 432,
      comments: 87
    }
  },
  {
    id: 'post-2',
    content: 'The Ministry confirms that reports of conflict in the northern region are false. Please rely only on official channels for information.',
    timestamp: '2025-05-09T10:30:00Z',
    source: sources[1],
    verificationStatus: 'official',
    trustScore: 92,
    tags: ['official', 'govt-verified', 'fact-check', 'clarification'],
    engagement: {
      likes: 876,
      shares: 345,
      comments: 65
    }
  },
  {
    id: 'post-3',
    content: 'Pakistan Armed Forces successfully completed joint exercises with allied nations. These exercises are part of routine training programs.',
    timestamp: '2025-05-09T08:45:00Z',
    source: sources[2],
    verificationStatus: 'official',
    trustScore: 90,
    tags: ['official', 'govt-verified', 'military-statement', 'joint-exercise'],
    media: [
      {
        type: 'image',
        url: '/placeholder.svg'
      }
    ],
    location: {
      lat: 33.7,
      lng: 73.1,
      name: 'Training Grounds'
    },
    engagement: {
      likes: 950,
      shares: 287,
      comments: 54
    }
  },
  {
    id: 'post-4',
    content: 'From my position on the ground, I can confirm military movement near the contested area. This appears to be a routine patrol rather than escalation.',
    timestamp: '2025-05-09T11:20:00Z',
    source: sources[3],
    verificationStatus: 'verified-journalist',
    trustScore: 88,
    tags: ['verified-journalist', 'eyewitness', 'on-the-ground'],
    media: [
      {
        type: 'image',
        url: '/placeholder.svg'
      }
    ],
    location: {
      lat: 32.5,
      lng: 74.8,
      name: 'Contested Area'
    },
    engagement: {
      likes: 723,
      shares: 291,
      comments: 112
    }
  },
  {
    id: 'post-5',
    content: 'Analysis: Recent military movements suggest preparedness exercises rather than offensive positioning. Sources in both militaries confirm this assessment.',
    timestamp: '2025-05-09T12:15:00Z',
    source: sources[4],
    verificationStatus: 'verified-journalist',
    trustScore: 85,
    tags: ['verified-journalist', 'analysis', 'assessment'],
    engagement: {
      likes: 645,
      shares: 231,
      comments: 94
    }
  },
  {
    id: 'post-6',
    content: 'BREAKING: Seeing multiple explosions near the border! Something big happening! #conflict #breaking',
    timestamp: '2025-05-09T13:05:00Z',
    source: sources[5],
    verificationStatus: 'unverified',
    trustScore: 45,
    tags: ['not-verified', 'trending-unconfirmed', 'breaking'],
    media: [
      {
        type: 'image',
        url: '/placeholder.svg'
      }
    ],
    location: {
      lat: 34.1,
      lng: 74.5,
      name: 'Border Region'
    },
    engagement: {
      likes: 1520,
      shares: 876,
      comments: 345
    }
  },
  {
    id: 'post-7',
    content: 'Sources claim major troop movements on both sides of the border. War could break out any moment! Share this info!',
    timestamp: '2025-05-09T13:30:00Z',
    source: sources[6],
    verificationStatus: 'disputed',
    trustScore: 30,
    tags: ['not-verified', 'disputed', 'requires-verification'],
    engagement: {
      likes: 2310,
      shares: 1254,
      comments: 567
    }
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    title: 'Military Training Exercise Begins',
    description: 'Indian Army begins planned training exercise near eastern border',
    timestamp: '2025-05-09T09:15:00Z',
    relatedPosts: ['post-1'],
    verificationStatus: 'official',
    location: {
      lat: 28.5,
      lng: 77.2,
      name: 'Eastern Border'
    }
  },
  {
    id: 'event-2',
    title: 'Pakistan Joint Exercises',
    description: 'Pakistan Armed Forces complete joint exercises with allied nations',
    timestamp: '2025-05-09T08:45:00Z',
    relatedPosts: ['post-3'],
    verificationStatus: 'official',
    location: {
      lat: 33.7,
      lng: 73.1,
      name: 'Training Grounds'
    }
  },
  {
    id: 'event-3',
    title: 'False Reports of Conflict',
    description: 'Ministry of Defence debunks false reports of conflict in northern region',
    timestamp: '2025-05-09T10:30:00Z',
    relatedPosts: ['post-2'],
    verificationStatus: 'official'
  },
  {
    id: 'event-4',
    title: 'Journalist Confirms Routine Patrol',
    description: 'War correspondent confirms military movements are routine patrols',
    timestamp: '2025-05-09T11:20:00Z',
    relatedPosts: ['post-4'],
    verificationStatus: 'verified-journalist',
    location: {
      lat: 32.5,
      lng: 74.8,
      name: 'Contested Area'
    }
  },
  {
    id: 'event-5',
    title: 'Unverified Reports of Explosions',
    description: 'Unverified social media reports claim explosions near border',
    timestamp: '2025-05-09T13:05:00Z',
    relatedPosts: ['post-6'],
    verificationStatus: 'unverified',
    location: {
      lat: 34.1,
      lng: 74.5,
      name: 'Border Region'
    }
  }
];
