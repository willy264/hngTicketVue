import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ticket, TicketStats } from '../lib/types';
import { mockTicketsApi, setCurrentUser } from '../lib/utils';

export const useTicketStore = defineStore('tickets', () => {
  const tickets = ref<Ticket[]>([]);
  const stats = ref<TicketStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  async function fetchTickets(userId: string) {
    try {
      isLoading.value = true;
      error.value = null;
      setCurrentUser(userId);
      const fetchedTickets = await mockTicketsApi.list();
      tickets.value = fetchedTickets;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error('Error fetching tickets:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchStats(userId: string) {
    try {
      setCurrentUser(userId);
      const ticketStats = await mockTicketsApi.getStats();
      stats.value = ticketStats;
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }

  async function createTicket(ticketData: Omit<Ticket, 'id'>) {
    try {
      const newTicket = await mockTicketsApi.create(ticketData);
      tickets.value.push(newTicket);
      await fetchStats(ticketData.userId);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to create ticket' 
      };
    }
  }

  async function updateTicket(id: string, updates: Partial<Ticket>) {
    try {
      const updatedTicket = await mockTicketsApi.update(id, updates);
      const index = tickets.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tickets.value[index] = updatedTicket;
      }
      await fetchStats(updatedTicket.userId);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to update ticket' 
      };
    }
  }

  async function deleteTicket(id: string, userId: string) {
    try {
      await mockTicketsApi.delete(id);
      tickets.value = tickets.value.filter(t => t.id !== id);
      await fetchStats(userId);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to delete ticket' 
      };
    }
  }

  return {
    tickets,
    stats,
    isLoading,
    error,
    fetchTickets,
    fetchStats,
    createTicket,
    updateTicket,
    deleteTicket,
  };
});