export interface Project {
  id: number;
  title: string;
  category: 'telegram' | 'automation' | 'vision' | 'all';
  categoryLabel: string;
  description: string;
  image: string;
  results: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface JobPosition {
  id: number;
  title: string;
  type: string;
  location: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface NavItem {
  label: string;
  path: string;
}