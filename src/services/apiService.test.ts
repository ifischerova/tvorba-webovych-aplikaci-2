import { describe, it, expect, beforeEach } from 'vitest';
import { apiService } from '../services/apiService';

describe('API Service', () => {
  beforeEach(() => {
    localStorage.clear();
    apiService.init();
  });

  describe('Authentication', () => {
    it('should login with correct credentials', () => {
      const result = apiService.login('admin', 'admin123');
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('userId');
      expect(result.username).toBe('admin');
    });

    it('should throw error with incorrect credentials', () => {
      expect(() => apiService.login('admin', 'wrongpassword')).toThrow('Neplatné přihlašovací údaje');
    });

    it('should register new user', () => {
      const user = apiService.register('newuser', 'new@example.com', 'password123');
      expect(user.username).toBe('newuser');
      expect(user.email).toBe('new@example.com');
    });

    it('should throw error for duplicate username', () => {
      expect(() => apiService.register('admin', 'different@example.com', 'password123'))
        .toThrow('Uživatelské jméno již existuje');
    });

    it('should throw error for duplicate email', () => {
      expect(() => apiService.register('newuser', 'admin@bezcisobe.cz', 'password123'))
        .toThrow('Email již existuje');
    });

    it('should logout user', () => {
      apiService.login('admin', 'admin123');
      expect(apiService.getCurrentUser()).not.toBeNull();
      
      apiService.logout();
      expect(apiService.getCurrentUser()).toBeNull();
    });
  });

  describe('Races', () => {
    it('should get all races', () => {
      const races = apiService.getRaces();
      expect(races).toBeInstanceOf(Array);
      expect(races.length).toBeGreaterThan(0);
    });

    it('should get race by id', () => {
      const race = apiService.getRaceById('1');
      expect(race).not.toBeNull();
      expect(race?.name).toBe('Pražský maraton');
    });

    it('should return null for non-existent race', () => {
      const race = apiService.getRaceById('999');
      expect(race).toBeNull();
    });
  });

  describe('Rides', () => {
    it('should get all rides', () => {
      const rides = apiService.getRides();
      expect(rides).toBeInstanceOf(Array);
    });

    it('should create new ride', () => {
      const newRide = apiService.createRide({
        raceId: '1',
        userId: '1',
        type: 'OFFER' as any,
        from: 'Brno',
        to: 'Praha',
        car: 'Škoda Octavia',
        availableSeats: 3,
        occupiedSeats: 0,
        passengers: [],
      });

      expect(newRide).toHaveProperty('id');
      expect(newRide.from).toBe('Brno');
      expect(newRide.to).toBe('Praha');
    });

    it('should get rides by race', () => {
      const rides = apiService.getRidesByRace('1');
      expect(rides).toBeInstanceOf(Array);
    });

    it('should update ride', () => {
      const rides = apiService.getRides();
      const rideId = rides[0]?.id;
      
      if (rideId) {
        const updated = apiService.updateRide(rideId, { occupiedSeats: 2 });
        expect(updated.occupiedSeats).toBe(2);
      }
    });

    it('should delete ride', () => {
      const initialRides = apiService.getRides();
      const initialCount = initialRides.length;
      
      if (initialRides[0]) {
        apiService.deleteRide(initialRides[0].id);
        const remainingRides = apiService.getRides();
        expect(remainingRides.length).toBe(initialCount - 1);
      }
    });
  });

  describe('Reference Data', () => {
    it('should get track lengths', () => {
      const trackLengths = apiService.getTrackLengths();
      expect(trackLengths).toBeInstanceOf(Array);
      expect(trackLengths.length).toBeGreaterThan(0);
    });

    it('should get track types', () => {
      const trackTypes = apiService.getTrackTypes();
      expect(trackTypes).toBeInstanceOf(Array);
      expect(trackTypes.length).toBeGreaterThan(0);
    });

    it('should get race calendars', () => {
      const calendars = apiService.getRaceCalendars();
      expect(calendars).toBeInstanceOf(Array);
      expect(calendars.length).toBeGreaterThan(0);
    });
  });
});
