export const FUNCTIONALITIES = {
  appointments: {
    list: 1,
    create: 2,
    update: 2,
    cancel: 4,
  },
  customers: {
    list: 8,
    create: 16,
    update: 16,
    delete: 2097152,
  },
  orders: {
    list: 32,
    create: 64,
    cancel: 128,
  },
  activities: {
    list: 256,
    create: 512,
    update: 512,
    createEventTimes: 1024,
    editEventTimes: 1024,
  },
  packages: {
    list: 2048,
    create: 4096,
    update: 4096,
    delete: 2 ** 35,
  },
  workoutProfile: {
    list: 536870912,
    createUpdate: 1073741824,
    delete: 2147483648,
  },
  notifications: {
    list: 2 ** 32,
    createOrUpdate: 2 ** 33,
    delete: 2 ** 34,
  },
  settings: {
    employees: {
      list: 8192,
      create: 16384,
      update: 16384,
      delete: 4194304,
    },
    profiles: {
      list: 32768,
      create: 65536,
      update: 65536,
    },
    categories: {
      list: 131072,
      create: 262144,
      update: 262144,
    },
    discount: {
      list: 524288,
      create: 1048576,
      update: 1048576,
    },
    specialties: {
      list: 8388608,
      create: 16777216,
      update: 16777216,
      delete: 33554432,
    },
    waivers: {
      list: 67108864,
      create: 134217728,
      update: 134217728,
      delete: 268435456,
    },
    calendar: {
      list: 1,
      create: 1,
      update: 1,
      delete: 1,
    },
  },
};
