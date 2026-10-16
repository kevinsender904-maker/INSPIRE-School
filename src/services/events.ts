import { mockEvents } from '@/data/mock/events';
import { Event } from '@/types';

export async function getEventsList(): Promise<Event[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...mockEvents];
}
