import { api } from './';
import { API_URL } from '../constants';

export const checkRoomExistence = (roomId: string) => api.get(`${API_URL}/rooms/${roomId}`);
