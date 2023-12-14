<template>
    <div>
      <label for="email">Masukkan Email:</label>
      <input v-model="email" type="email" id="email" required>
  
      <button @click="checkStatus">Cek Status</button>
  
      <div v-if="status !== null">
        <p>Status Pendaftaran: {{ status }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        status: null,
      };
    },
    methods: {
      async checkStatus() {
        try {
          const response = await fetch(`/api/check-status?email=${this.email}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          this.status = data.status;
        } catch (error) {
          console.error('Error during fetch:', error);
          // Handle errors appropriately (e.g., show an error message)
        }
      },
    },
  };
  </script>
  