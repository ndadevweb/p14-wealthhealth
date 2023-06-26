import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const employeesSlice = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {
    create: (state, action) => {
      const newEmployee = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        startDate: action.payload.startDate,
        department: action.payload.department,
        birthDate: action.payload.birthDate,
        street: action.payload.street,
        city: action.payload.city,
        state: action.payload.state,
        zipCode: action.payload.zipCode
      }
      state.push(newEmployee)
    }
  }
})

export const { create } = employeesSlice.actions

export const fetchAll = state => state.employees

export default employeesSlice.reducer