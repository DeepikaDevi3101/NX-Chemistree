import { supabase } from '../lib/supabase';

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'read' | 'unread';
}

export const saveMessage = async (formData: Omit<Message, 'id' | 'timestamp' | 'status'>) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          status: 'unread',
        }
      ])
      .select();

    if (error) throw error;
    
    return { success: true, id: data?.[0]?.id };
  } catch (error) {
    console.error('Error saving message:', error);
    return { success: false, error };
  }
};

export const getMessages = async (): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    
    return data as Message[] || [];
  } catch (error) {
    console.error('Error reading messages:', error);
    return [];
  }
};

export const markAsRead = async (id: string) => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ status: 'read' })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating message status:', error);
  }
};

export const deleteMessage = async (id: string) => {
  try {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};

export const getUnreadCount = async (): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'unread');

    if (error) throw error;
    
    return count || 0;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
};
