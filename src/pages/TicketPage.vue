<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-vue-next';
import { toast } from 'sonner';
import Button from '../components/ui/Button.vue';
import Input from '../components/ui/Input.vue';
import Modal from '../components/ui/Modal.vue';
import StatusBadge from '../components/ui/StatusBadge.vue';
import PriorityBadge from '../components/ui/PriorityBadge.vue';
import type { Ticket } from '../lib/types';
import { useAuthStore } from '../stores/auth';
import { useTicketStore } from '../stores/tickets';
import { validateTicket, type ValidationError } from '../lib/validation';

const authStore = useAuthStore();
const ticketStore = useTicketStore();
const isModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedTicket = ref<Ticket | null>(null);
const validationErrors = ref<ValidationError>({});

const formData = ref<Omit<Ticket, 'id'>>({
  userId: authStore.user?.id || '',
  title: '',
  description: '',
  status: 'open',
  priority: 'medium',
});

function resetForm() {
  formData.value = {
    userId: authStore.user?.id || '',
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
  };
  selectedTicket.value = null;
  validationErrors.value = {};
}

async function handleSubmit(e: Event) {
  e.preventDefault();
  const errors = validateTicket(formData.value);
  if (Object.keys(errors).length > 0) {
    validationErrors.value = errors;
    return;
  }

  try {
    if (selectedTicket.value) {
      const result = await ticketStore.updateTicket(
        selectedTicket.value.id,
        formData.value
      );
      if (result.success) {
        toast.success('Ticket updated successfully');
        isModalOpen.value = false;
        resetForm();
      } else {
        toast.error(result.error || 'Failed to update ticket');
      }
    } else {
      const result = await ticketStore.createTicket(formData.value);
      if (result.success) {
        toast.success('Ticket created successfully');
        isModalOpen.value = false;
        resetForm();
      } else {
        toast.error(result.error || 'Failed to create ticket');
      }
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'An error occurred');
  }
}

async function handleDelete() {
  if (!selectedTicket.value || !authStore.user) return;
  
  try {
    const result = await ticketStore.deleteTicket(
      selectedTicket.value.id,
      authStore.user.id
    );
    if (result.success) {
      toast.success('Ticket deleted successfully');
      isDeleteModalOpen.value = false;
      selectedTicket.value = null;
    } else {
      toast.error(result.error || 'Failed to delete ticket');
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed to delete ticket');
  }
}

function handleEdit(ticket: Ticket) {
  selectedTicket.value = ticket;
  formData.value = {
    userId: ticket.userId,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
  };
  validationErrors.value = {};
  isModalOpen.value = true;
}

onMounted(async () => {
  if (authStore.user) {
    await ticketStore.fetchTickets(authStore.user.id);
  }
});

</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Tickets</h1>
        <p class="text-gray-600 mt-2">Manage your support tickets</p>
      </div>
      <Button @click="() => { resetForm(); isModalOpen = true; }" class="flex items-center">
        <Plus class="w-5 h-5" />
        Create New Ticket
      </Button>
    </div>

    <div v-if="ticketStore.isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="ticketStore.tickets.length === 0" class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <h3 class="text-xl font-medium text-gray-900">No tickets found</h3>
      <p class="mt-2 text-gray-500">Get started by creating a new ticket</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="ticket in ticketStore.tickets" :key="ticket.id" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div class="flex justify-between items-start mb-4">
          <div class="space-y-1">
            <h3 class="font-semibold text-gray-900">{{ ticket.title }}</h3>
            <p class="text-sm text-gray-500">{{ ticket.description }}</p>
          </div>
          <div class="flex gap-2">
            <Button variant="secondary" @click="handleEdit(ticket)" class="text-gray-400  transition-colors">
              <Edit2 class="w-4 h-4" />
            </Button>
            <Button variant="danger" @click="() => { selectedTicket = ticket; isDeleteModalOpen = true; }" class="text-gray-400 transition-colors">
              <Trash2 class="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div class="mt-8 flex gap-2 justify-between">
          <StatusBadge :status="ticket.status" />
          <PriorityBadge :priority="ticket.priority" />
        </div>
      </div>
    </div>

    <!-- create/edit -->
    <Modal :isOpen="isModalOpen" @close="() => { isModalOpen = false; resetForm(); }">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">{{ selectedTicket ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="space-y-1">
            <label for="title" class="block text-sm font-medium text-gray-700">
              Title <span class="text-red-500">*</span>
            </label>
            <Input
              id="title"
              v-model="formData.title"
              :disabled="ticketStore.isLoading"
              placeholder="Enter ticket title"
              :class="validationErrors.title ? 'border-red-500' : ''"
            />
            <p v-if="validationErrors.title" class="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle class="w-4 h-4" />
              {{ validationErrors.title }}
            </p>
          </div>

          <div class="space-y-1">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="3"
              :disabled="ticketStore.isLoading"
              placeholder="Enter ticket description"
              :class="[
                'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                validationErrors.description ? 'border-red-500' : 'border-gray-300'
              ]"
            />
            <p v-if="validationErrors.description" class="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle class="w-4 h-4" />
              {{ validationErrors.description }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label for="status" class="block text-sm font-medium text-gray-700">
                Status <span class="text-red-500">*</span>
              </label>
              <select
                id="status"
                v-model="formData.status"
                :disabled="ticketStore.isLoading"
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  validationErrors.status ? 'border-red-500' : 'border-gray-300'
                ]"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div class="space-y-1">
              <label for="priority" class="block text-sm font-medium text-gray-700">
                Priority <span class="text-red-500">*</span>
              </label>
              <select
                id="priority"
                v-model="formData.priority"
                :disabled="ticketStore.isLoading"
                :class="[
                  'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  validationErrors.priority ? 'border-red-500' : 'border-gray-300'
                ]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end gap-4 mt-4">
            <Button variant="outline" type="button" @click="() => { isModalOpen = false; resetForm(); }">
              Cancel
            </Button>
            <Button type="submit" :disabled="ticketStore.isLoading">
              {{ selectedTicket ? 'Update' : 'Create' }}
            </Button>
          </div>
        </form>
      </div>
    </Modal>

    <!-- delete -->
    <Modal :isOpen="isDeleteModalOpen" @close="isDeleteModalOpen = false">
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <AlertCircle class="w-6 h-6 text-red-600" />
          <h3 class="text-lg font-medium">Delete Ticket</h3>
        </div>

        <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
        
        <div class="flex justify-end gap-4 mt-4">
          <Button variant="outline" @click="isDeleteModalOpen = false">
            Cancel
          </Button>
          <Button variant="danger" @click="handleDelete">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>