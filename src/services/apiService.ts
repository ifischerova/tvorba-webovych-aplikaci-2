import { User, Race, Ride, RaceCalendar, TrackLength, TrackType, Certification, RideType, Role } from '../types';

const STORAGE_KEYS = {
  USERS: 'bezci_sobe_users',
  RACES: 'bezci_sobe_races',
  RIDES: 'bezci_sobe_rides',
  CALENDARS: 'bezci_sobe_calendars',
  TRACK_LENGTHS: 'bezci_sobe_track_lengths',
  TRACK_TYPES: 'bezci_sobe_track_types',
  CERTIFICATIONS: 'bezci_sobe_certifications',
  CURRENT_USER: 'bezci_sobe_current_user',
  AUTH_TOKEN: 'bezci_sobe_token',
};

// Initialize mock data
const initializeMockData = () => {
  // Track Lengths
  if (!localStorage.getItem(STORAGE_KEYS.TRACK_LENGTHS)) {
    const trackLengths: TrackLength[] = [
      { id: '1', name: '5K' },
      { id: '2', name: '10K' },
      { id: '3', name: 'Půlmaraton' },
      { id: '4', name: 'Maraton' },
      { id: '5', name: 'Ultra' },
    ];
    localStorage.setItem(STORAGE_KEYS.TRACK_LENGTHS, JSON.stringify(trackLengths));
  }

  // Track Types
  if (!localStorage.getItem(STORAGE_KEYS.TRACK_TYPES)) {
    const trackTypes: TrackType[] = [
      { id: '1', name: 'Silnice' },
      { id: '2', name: 'Trail' },
      { id: '3', name: 'Dráha' },
    ];
    localStorage.setItem(STORAGE_KEYS.TRACK_TYPES, JSON.stringify(trackTypes));
  }

  // Certifications
  if (!localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS)) {
    const certifications: Certification[] = [
      { id: '1', name: 'IAAF' },
      { id: '2', name: 'AIMS' },
    ];
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(certifications));
  }

  // Race Calendars
  if (!localStorage.getItem(STORAGE_KEYS.CALENDARS)) {
    const calendars: RaceCalendar[] = [
      { id: '1', year: 2025, isActive: true },
    ];
    localStorage.setItem(STORAGE_KEYS.CALENDARS, JSON.stringify(calendars));
  }

  // Races
  if (!localStorage.getItem(STORAGE_KEYS.RACES)) {
    const races: Race[] = [
      {
        id: '1',
        name: 'Pražský maraton',
        place: 'Praha',
        date: '2025-05-04',
        startTime: '09:00',
        web: 'https://www.runczech.com/cs/akce/maraton/informace/',
        trackLength: { id: '4', name: 'Maraton' },
        trackType: { id: '1', name: 'Silnice' },
        certifications: [{ id: '1', name: 'IAAF' }, { id: '2', name: 'AIMS' }],
        raceCalendarId: '1',
      },
      {
        id: '2',
        name: 'Běchovice-Praha',
        place: 'Praha',
        date: '2025-09-13',
        startTime: '10:00',
        web: 'https://www.behej.com/',
        trackLength: { id: '2', name: '10K' },
        trackType: { id: '1', name: 'Silnice' },
        certifications: [],
        raceCalendarId: '1',
      },
      {
        id: '3',
        name: 'Brněnský půlmaraton',
        place: 'Brno',
        date: '2025-03-29',
        startTime: '10:00',
        web: 'https://www.pulmaraton.cz/',
        trackLength: { id: '3', name: 'Půlmaraton' },
        trackType: { id: '1', name: 'Silnice' },
        certifications: [{ id: '2', name: 'AIMS' }],
        raceCalendarId: '1',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.RACES, JSON.stringify(races));
  }

  // Users (with hashed passwords in real app)
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const users: User[] = [
      {
        id: '1',
        username: 'admin',
        email: 'admin@bezcisobe.cz',
        password: 'admin123', // In real app, this would be hashed
        firstName: 'Admin',
        lastName: 'User',
        roles: [Role.USER, Role.ADMIN],
      },
      {
        id: '2',
        username: 'jana.novakova',
        email: 'jana@example.cz',
        password: 'password123',
        firstName: 'Jana',
        lastName: 'Nováková',
        city: 'Praha',
        roles: [Role.USER],
      },
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  // Rides
  if (!localStorage.getItem(STORAGE_KEYS.RIDES)) {
    const rides: Ride[] = [
      {
        id: '1',
        raceId: '1',
        userId: '2',
        type: RideType.REQUEST,
        from: 'Praha',
        availableSeats: 1,
        occupiedSeats: 0,
        passengers: [],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        raceId: '2',
        userId: '1',
        type: RideType.OFFER,
        from: 'Brno',
        to: 'Praha',
        car: 'Škoda Octavia',
        availableSeats: 3,
        occupiedSeats: 1,
        passengers: ['2'],
        notes: 'Vyjíždím v 8:00',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(rides));
  }
};

// API Service
export const apiService = {
  // Initialize data
  init: () => {
    initializeMockData();
  },

  // Auth
  login: (username: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      const token = btoa(`${user.id}:${Date.now()}`); // Simple token for demo
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      return { token, userId: user.id, username: user.username, roles: user.roles };
    }
    throw new Error('Neplatné přihlašovací údaje');
  },

  register: (username: string, email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    
    if (users.find(u => u.username === username)) {
      throw new Error('Uživatelské jméno již existuje');
    }
    if (users.find(u => u.email === email)) {
      throw new Error('Email již existuje');
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password,
      roles: [Role.USER],
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Races
  getRaces: (): Race[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RACES) || '[]');
  },

  getRaceById: (id: string): Race | null => {
    const races = apiService.getRaces();
    return races.find(r => r.id === id) || null;
  },

  // Rides
  getRides: (): Ride[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RIDES) || '[]');
  },

  getRidesByRace: (raceId: string): Ride[] => {
    const rides = apiService.getRides();
    return rides.filter(r => r.raceId === raceId);
  },

  createRide: (ride: Omit<Ride, 'id' | 'createdAt'>): Ride => {
    const rides = apiService.getRides();
    const newRide: Ride = {
      ...ride,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    rides.push(newRide);
    localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(rides));
    return newRide;
  },

  updateRide: (id: string, updates: Partial<Ride>): Ride => {
    const rides = apiService.getRides();
    const index = rides.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Jízda nenalezena');
    
    rides[index] = { ...rides[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(rides));
    return rides[index];
  },

  deleteRide: (id: string): void => {
    const rides = apiService.getRides();
    const filtered = rides.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(filtered));
  },

  // Track Lengths
  getTrackLengths: (): TrackLength[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TRACK_LENGTHS) || '[]');
  },

  // Track Types
  getTrackTypes: (): TrackType[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TRACK_TYPES) || '[]');
  },

  // Calendars
  getRaceCalendars: (): RaceCalendar[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CALENDARS) || '[]');
  },
};

// Initialize on import
apiService.init();
