import { api } from '../../api';
import { API_URL } from '../../constants';

export const checkRoomExistence = (roomId: string) => api.get(`${API_URL}/rooms/${roomId}`);
