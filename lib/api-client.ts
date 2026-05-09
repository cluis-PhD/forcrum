/**
 * API Client para forScrum - Neon PostgreSQL
 * Substitui completamente o cliente Supabase
 */

const API_BASE_URL = '/api';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Wrapper genérico para fetch com tratamento de erros
 */
async function fetchAPI<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`[API Client] Erro em ${endpoint}:`, error);
    throw error;
  }
}

// ==================== COURSES ====================

export const getCourses = () =>
  fetchAPI<{ success: boolean; courses: any[] }>('/courses');

export const getCourse = (id: string) =>
  fetchAPI<{ success: boolean; course: any }>(`/courses/${id}`);

export const createCourse = (data: any) =>
  fetchAPI<{ success: boolean; course: any }>('/courses', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateCourse = (id: string, data: any) =>
  fetchAPI<{ success: boolean; course: any }>(`/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteCourse = (id: string) =>
  fetchAPI<{ success: boolean }>(`/courses/${id}`, {
    method: 'DELETE',
  });

// ==================== STUDENTS ====================

export const getStudents = () =>
  fetchAPI<{ success: boolean; students: any[] }>('/students');

export const getStudent = (id: string) =>
  fetchAPI<{ success: boolean; student: any }>(`/students/${id}`);

export const createStudent = (data: any) =>
  fetchAPI<{ success: boolean; student: any }>('/students', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateStudent = (id: string, data: any) =>
  fetchAPI<{ success: boolean; student: any }>(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteStudent = (id: string) =>
  fetchAPI<{ success: boolean }>(`/students/${id}`, {
    method: 'DELETE',
  });

// ==================== TEAMS ====================

export const getTeams = () =>
  fetchAPI<{ success: boolean; teams: any[] }>('/teams');

export const getTeam = (id: string) =>
  fetchAPI<{ success: boolean; team: any }>(`/teams/${id}`);

export const createTeam = (data: any) =>
  fetchAPI<{ success: boolean; team: any }>('/teams', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateTeam = (id: string, data: any) =>
  fetchAPI<{ success: boolean; team: any }>(`/teams/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteTeam = (id: string) =>
  fetchAPI<{ success: boolean }>(`/teams/${id}`, {
    method: 'DELETE',
  });

// ==================== SPRINTS ====================

export const getSprints = () =>
  fetchAPI<{ success: boolean; sprints: any[] }>('/sprints');

export const getSprint = (id: string) =>
  fetchAPI<{ success: boolean; sprint: any }>(`/sprints/${id}`);

export const createSprint = (data: any) =>
  fetchAPI<{ success: boolean; sprint: any }>('/sprints', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateSprint = (id: string, data: any) =>
  fetchAPI<{ success: boolean; sprint: any }>(`/sprints/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteSprint = (id: string) =>
  fetchAPI<{ success: boolean }>(`/sprints/${id}`, {
    method: 'DELETE',
  });

// ==================== STORIES ====================

export const getStories = () =>
  fetchAPI<{ success: boolean; stories: any[] }>('/stories');

export const getStory = (id: string) =>
  fetchAPI<{ success: boolean; story: any }>(`/stories/${id}`);

export const createStory = (data: any) =>
  fetchAPI<{ success: boolean; story: any }>('/stories', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateStory = (id: string, data: any) =>
  fetchAPI<{ success: boolean; story: any }>(`/stories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteStory = (id: string) =>
  fetchAPI<{ success: boolean }>(`/stories/${id}`, {
    method: 'DELETE',
  });

// ==================== MESSAGES ====================

export const getMessages = () =>
  fetchAPI<{ success: boolean; messages: any[] }>('/messages');

export const createMessage = (data: any) =>
  fetchAPI<{ success: boolean; message: any }>('/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// ==================== ALERTS ====================

export const getAlerts = () =>
  fetchAPI<{ success: boolean; alerts: any[] }>('/alerts');

export const createAlert = (data: any) =>
  fetchAPI<{ success: boolean; alert: any }>('/alerts', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// ==================== EXPORT DEFAULT ====================
// Para compatibilidade com imports do projeto original
export default {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  getSprints,
  getSprint,
  createSprint,
  updateSprint,
  deleteSprint,
  getStories,
  getStory,
  createStory,
  updateStory,
  deleteStory,
  getMessages,
  createMessage,
  getAlerts,
  createAlert,
};
