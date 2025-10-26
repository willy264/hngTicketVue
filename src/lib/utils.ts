import type { Ticket } from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockUsers = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  },
];

const loadTickets = (userId: string): Ticket[] => {
  const savedTickets = localStorage.getItem(`tickets_${userId}`);
  return savedTickets ? JSON.parse(savedTickets) : [];
};

const saveTickets = (tickets: Ticket[], userId: string) => {
  localStorage.setItem(`tickets_${userId}`, JSON.stringify(tickets));
};

let currentUserId: string | null = null;
const userTickets: { [key: string]: Ticket[] } = {};

const ensureUserTickets = (userId: string): Ticket[] => {
  if (!userTickets[userId]) {
    userTickets[userId] = loadTickets(userId);
  }
  return userTickets[userId];
};

export const setCurrentUser = (userId: string) => {
  currentUserId = userId;
  ensureUserTickets(userId);
};

export const mockAuthApi = {
  login: async (email: string, password: string) => {
    await delay(500);
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  signup: async (name: string, email: string, password: string) => {
    await delay(500);
    if (mockUsers.some((u) => u.email === email)) {
      throw new Error("Email already exists");
    }
    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      password,
    };
    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },
};

export const mockTicketsApi = {
  list: async () => {
    await delay(500);
    if (!currentUserId) throw new Error("No user logged in");
    return ensureUserTickets(currentUserId);
  },

  create: async (ticket: Omit<Ticket, "id">) => {
    await delay(500);
    if (!currentUserId) throw new Error("No user logged in");
    const newTicket: Ticket = {
      ...ticket,
      id: String(Date.now()),
      userId: currentUserId,
    };
    const tickets = ensureUserTickets(currentUserId);
    tickets.push(newTicket);
    saveTickets(tickets, currentUserId);
    return newTicket;
  },

  update: async (id: string, updates: Partial<Ticket>) => {
    await delay(500);
    if (!currentUserId) throw new Error("No user logged in");
    const tickets = ensureUserTickets(currentUserId);
    const index = tickets.findIndex(
      (t) => t.id === id && t.userId === currentUserId
    );
    if (index === -1) {
      throw new Error("Ticket not found");
    }
    const ticket = tickets[index]!; 
    const updatedTicket: Ticket = {
      ...ticket,
      ...updates,
      id: ticket.id,
      userId: ticket.userId,
      title: updates.title ?? ticket.title,
      description: updates.description ?? ticket.description,
      status: updates.status ?? ticket.status,
      priority: updates.priority ?? ticket.priority
    };
    tickets[index] = updatedTicket;
    saveTickets(tickets, currentUserId);
    return updatedTicket;
  },

  delete: async (id: string) => {
    await delay(500);
    if (!currentUserId) throw new Error("No user logged in");
    const tickets = ensureUserTickets(currentUserId);
    const index = tickets.findIndex(
      (t) => t.id === id && t.userId === currentUserId
    );
    if (index === -1) {
      throw new Error("Ticket not found");
    }
    tickets.splice(index, 1);
    saveTickets(tickets, currentUserId);
  },

  getStats: async () => {
    await delay(500);
    if (!currentUserId) throw new Error("No user logged in");
    const tickets = ensureUserTickets(currentUserId);
    return {
      total: tickets.length,
      open: tickets.filter((t) => t.status === "open").length,
      inProgress: tickets.filter((t) => t.status === "in_progress").length,
      closed: tickets.filter((t) => t.status === "closed").length,
    };
  },
};