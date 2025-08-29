export interface WebProject {
  id: string;
  title: string;
  link: string;
  image: string;
  description: string;
  technologies: string[];
  createdAt: string;
}

export interface Event {
  id: string;
  name: string;
  category: string;
  images: string[];
  mainImage: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface GraphicDesign {
  id: string;
  title: string;
  category: string;
  image: string;
  createdAt: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface DashboardStats {
  webProjects: number;
  events: number;
  graphicDesigns: number;
  totalProjects: number;
}