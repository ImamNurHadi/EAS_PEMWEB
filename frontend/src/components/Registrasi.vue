<template>
    <div class="container mx-auto p-4 text-white">
      <div class="bg-gray-700 p-4 rounded-lg shadow-lg mb-4">
        <h1 class="text-3xl font-bold mb-4">Registrasi Lomba</h1>
        <div>
          <button @click="showAddRegistrationForm = true"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">Daftar Lomba</button>
        </div>
      </div>
  
      <div v-if="showAddRegistrationForm" class="bg-gray-700 p-4 rounded-lg shadow-lg mb-4">
        <form @submit.prevent="submitRegistrationForm" class="custom-form">
          <div class="mb-4">
            <label for="Nama" class="block text-sm font-medium">Nama</label>
            <input v-model="newRegistration.nama" type="text" id="Nama" class="form-input mt-1 block w-full rounded-md pl-3 text-black">
          </div>
          <div class="mb-4">
            <label for="Email" class="block text-sm font-medium">Email</label>
            <input v-model="newRegistration.email" type="email" id="Email" class="form-input mt-1 block w-full rounded-md pl-3 text-black">
          </div>
          <div class="mb-4">
            <label for="AsalSekolah" class="block text-sm font-medium">Asal Sekolah</label>
            <input v-model="newRegistration.asal_sekolah" type="text" id="AsalSekolah" class="form-input mt-1 block w-full rounded-md pl-3 text-black">
          </div>
  
          <button type="button" @click="cancelForm" class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md ml-2">Batal</button>
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md ml-2">Daftar</button>
        </form>
      </div>
  
      <div class="bg-gray-700 p-4 rounded-lg shadow-lg mt-4">
        <h2 class="text-2xl font-semibold mb-2">Data Pendaftaran</h2>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Nama</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Asal Sekolah</th>
              <th class="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(registration, index) in registrations" :key="index" class="bg-gray-700 hover-bg-gray-800 transition duration-300 ease-in-out">
              <td class="px-4 py-2 text-gray-100">{{ registration.nama }}</td>
              <td class="px-4 py-2 text-gray-100">{{ registration.email }}</td>
              <td class="px-4 py-2 text-gray-100">{{ registration.asal_sekolah }}</td>
              <td class="px-4 py-2 text-gray-100">{{ registration.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        registrations: [],
        showAddRegistrationForm: false,
        newRegistration: {
          nama: "",
          email: "",
          asal_sekolah: "",
          status: "Waiting" // Default status
        }
      };
    },
    created() {
      this.fetchRegistrations();
    },
    methods: {
      async fetchRegistrations() {
        try {
          const response = await fetch('http://localhost:3000/api/pendaftaran/');
          const data = await response.json();
          this.registrations = data.docs;
        } catch (error) {
          console.error('Error fetching registrations:', error);
        }
      },
      async submitRegistrationForm() {
      try {
        const response = await fetch('http://localhost:3000/api/pendaftaran', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
    
          },
          body: JSON.stringify(this.newRegistration)
        });

        if (response.ok) {
          console.log('Registrasi berhasil!');
          this.showAddRegistrationForm = false;
          this.newRegistration = {
            nama: "",
            email: "",
            asal_sekolah: "",
            status: "Waiting"
          };
          this.fetchRegistrations();
        } else {
          console.error('Gagal mendaftar. Status:', response.status);
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mendaftar:', error);
      }
    },

      cancelForm() {
        this.showAddRegistrationForm = false;
        this.newRegistration = {
          nama: "",
          email: "",
          asal_sekolah: "",
          status: "Waiting"
        };
      }
    }
  };
  </script>
 
  
