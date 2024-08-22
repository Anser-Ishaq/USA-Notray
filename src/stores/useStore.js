import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  decreaseCount: () => set((state) => ({ count: state.count - 1 })),
  
  price: 0, 
  setPrice: (newPrice) => set({ price: newPrice }),

  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default useStore;
