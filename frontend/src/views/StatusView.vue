<template>
  <div class="container mx-auto p-4 text-white">
    <div class="bg-gray-700 p-4 rounded-lg shadow-lg mb-4">
      <h1 class="text-3xl font-bold mb-4">Status Pendaftar</h1>
      <div>
        <label for="inputEmail" class="block text-sm font-medium">Masukkan Email:</label>
        <input v-model="inputEmail" type="email" id="inputEmail"
          class="form-input mt-1 block w-full rounded-md pl-3 text-black">
        <button @click="checkStatus" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mt-2">Cek Status</button>
      </div>
    </div>

    <div v-if="status" class="bg-gray-700 p-4 rounded-lg shadow-lg mb-4">
      <h2 class="text-2xl font-semibold mb-2">Status Pendaftar</h2>
      <p class="text-gray-100">Nama: {{ status.nama }}</p>
      <p class="text-gray-100">Asal Sekolah: {{ status.asal_sekolah }}</p>
      <p class="text-gray-100">Status: {{ status.status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputEmail: '',
      status: null,
    };
  },
  methods: {
    async checkStatus() {
      try {
        // const response = await fetch(`http://localhost:3000/api/pendaftaran/status?email=${this.email}`);
        const response = await fetch(`http://localhost:3000/api/pendaftaran?email=${this.inputEmail}`);
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.docs.length > 0) {
            this.status = responseData.docs[0];
          } else {
            console.log('Pendaftar tidak ditemukan.');
          }
        } else {
          const errorData = await response.json();
          console.error('Gagal mendapatkan status. Status:', response.status, errorData);
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat memeriksa status:', error);
      }
    },
  },
};
</script>
