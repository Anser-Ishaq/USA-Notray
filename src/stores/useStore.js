import { create } from 'zustand'
import axios from 'axios'
const useStore = create((set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    decreaseCount: () => set((state) => ({ count: state.count - 1 })),

    price: 0,
    setPrice: (newPrice) => set({ price: newPrice }),

    selectedDate: null,
    setSelectedDate: (date) => set({ selectedDate: date }),

    specificNotary: [],
    fetchSpecificNotary: async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/users/getonlynotaryusers`,
            )

            const transformedNotaryUsers = response.data.map((user, index) => ({
                id: index + 1,
                value: user.label,
                label: user.label,
                email: user.email,
            }))

            const specificNotary = [
                { id: 0, value: '', label: '-- Select Specific Notary --', disabled: true },
                ...transformedNotaryUsers,
            ]

            set({ specificNotary }) // Store data in specificNotary
        } catch (error) {
            console.error('Failed to fetch notary users:', error)
        }
    },
}))

export default useStore
