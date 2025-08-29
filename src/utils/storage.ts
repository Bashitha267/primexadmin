import { WebProject, Event, GraphicDesign } from '../types';

const STORAGE_KEYS = {
  webProjects: 'primex_web_projects',
  events: 'primex_events',
  graphicDesigns: 'primex_graphic_designs',
  auth: 'primex_auth'
};

export const storageUtils = {
  // Web Projects
  getWebProjects: (): WebProject[] => {
    const data = localStorage.getItem(STORAGE_KEYS.webProjects);
    return data ? JSON.parse(data) : [];
  },
  
  saveWebProject: (project: WebProject): void => {
    const projects = storageUtils.getWebProjects();
    projects.push(project);
    localStorage.setItem(STORAGE_KEYS.webProjects, JSON.stringify(projects));
  },

  // Events
  getEvents: (): Event[] => {
    const data = localStorage.getItem(STORAGE_KEYS.events);
    return data ? JSON.parse(data) : [];
  },
  
  saveEvent: (event: Event): void => {
    const events = storageUtils.getEvents();
    events.push(event);
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
  },

  // Graphic Designs
  getGraphicDesigns: (): GraphicDesign[] => {
    const data = localStorage.getItem(STORAGE_KEYS.graphicDesigns);
    return data ? JSON.parse(data) : [];
  },
  
  saveGraphicDesign: (design: GraphicDesign): void => {
    const designs = storageUtils.getGraphicDesigns();
    designs.push(design);
    localStorage.setItem(STORAGE_KEYS.graphicDesigns, JSON.stringify(designs));
  },

  // Authentication
  getAuth: () => {
    const data = localStorage.getItem(STORAGE_KEYS.auth);
    return data ? JSON.parse(data) : null;
  },
  
  setAuth: (isAuthenticated: boolean) => {
    localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify({ isAuthenticated }));
  },
  
  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.auth);
  }
};