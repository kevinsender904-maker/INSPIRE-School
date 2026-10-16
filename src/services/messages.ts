import { mockMessages } from '@/data/mock/messages';
import { ContactMessage } from '@/types';

let localMessages = [...mockMessages];

export async function submitMessage(
  data: Omit<ContactMessage, 'id' | 'status' | 'created_at'>
): Promise<ContactMessage> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  const newMsg: ContactMessage = {
    ...data,
    id: `msg-${Date.now()}`,
    status: 'unread',
    created_at: new Date().toISOString(),
  };
  localMessages = [newMsg, ...localMessages];
  return newMsg;
}

export async function getMessagesList(): Promise<ContactMessage[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...localMessages];
}
