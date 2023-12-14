// pendaftaran.ts

import { CollectionConfig } from 'payload/types';

const Pendaftaran: CollectionConfig = {
  slug: 'pendaftaran',
  labels: {
    singular: 'Pendaftaran',
    plural: 'Pendaftaran'
  },
  fields: [
    {
      name: 'nama',
      label: 'Nama',
      type: 'text',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      unique: true
    },
    {
      name: 'asal_sekolah',
      label: 'Asal Sekolah',
      type: 'text',
      required: true
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Waiting', value: 'Waiting' },
        { label: 'Rejected', value: 'Rejected' },
        { label: 'Accepted', value: 'Accepted' }
      ],
      required: true,
      defaultValue: 'Waiting'
    },
    {
      name: 'tanggal_pendaftaran',
      label: 'Tanggal Pendaftaran',
      type: 'date',
      required: true
    }
  ]
};

export default Pendaftaran;
