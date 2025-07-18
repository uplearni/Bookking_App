export const DUMMY_SERVICES = [
  { id: 1, name: 'Consultation', duration: 30, price: 50, description: 'Initial consultation meeting' },
  { id: 2, name: 'Therapy Session', duration: 60, price: 100, description: 'One-hour therapy session' },
  { id: 3, name: 'Group Workshop', duration: 90, price: 75, description: 'Group workshop session' },
  { id: 4, name: 'Follow-up', duration: 30, price: 40, description: 'Follow-up appointment' }
];

export const DUMMY_BOOKINGS = [
  { id: 1, customerName: 'John Doe', email: 'john@example.com', phone: '123-456-7890', service: 'Consultation', date: '2024-07-20', time: '10:00', status: 'confirmed' },
  { id: 2, customerName: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', service: 'Therapy Session', date: '2024-07-21', time: '14:00', status: 'pending' },
  { id: 3, customerName: 'Bob Johnson', email: 'bob@example.com', phone: '555-123-4567', service: 'Group Workshop', date: '2024-07-22', time: '09:00', status: 'confirmed' }
];

export const DUMMY_TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];