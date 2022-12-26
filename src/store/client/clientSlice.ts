import { createSlice } from '@reduxjs/toolkit'
import { productProps, productAddedProps } from '../../client/features/types'

export interface clientProps {
  orderStatus: string,
  totalProducts: number,
  productsList: (Array<productProps>),
  orderList: (Array<productAddedProps>),
  clientName: string,
  clientReference?: string,
  clientPhone: string,
  payMethod: string,
  finalPrice: number,
  time: string,
  clientLocation: [number, number],
  clientAddress: string,
}

const initialState: clientProps = {
  orderStatus: 'buying',
  totalProducts: 0,
  productsList: [],
  orderList: [],
  clientName: '',
  clientReference: '',
  clientPhone: '',
  payMethod: 'efectivo',
  finalPrice: 2,
  time: '00:00',
  clientLocation: [-1.666780762262715, -78.65882635116579],
  clientAddress: 'Ingrese su dirección',
}

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload
    },
    addProductsToCart: (state, action) => {
      state.productsList = action.payload
      state.totalProducts += 1;
    },
    removeProductsFromCart: (state, action) => {
      state.productsList = action.payload
      state.totalProducts -= 1
    },
    deleteProductsFromCart: (state, action) => {
      const productId = action.payload[0]
      state.totalProducts -= action.payload[1]
      state.productsList = state.productsList.filter(product => product._id !== productId)
    },
    updateClientName: (state, action) => {
      state.clientName = action.payload
    },
    updateClientReference: (state, action) => {
      state.clientReference = action.payload
    },
    updateClientPhone: (state, action) => {
      state.clientPhone = action.payload
    },
    updatePayMethod: (state, action) => {
      state.payMethod = action.payload
    },
    updateClientLocation: (state, action) => {
      state.clientLocation = action.payload
    },
    updateClientAddress: (state, action) => {
      state.clientAddress = action.payload
    },
    updateFinalPrice: (state, action) => {
      state.finalPrice = action.payload
    },
    updateTime: (state, action) => {
      state.time = action.payload
    },
    addOrderList: (state, action) => {
      state.orderList = action.payload
    },
    handleOrderStatus: (state, action) => {
      state.orderStatus = action.payload
    },   

    resetCart: (state) => {
      state.totalProducts = 0
      state.productsList = []
    },
    resetCLient: (state) => {
      state.orderStatus = 'buying'
      state.clientName = ''
      state.orderList = []
      state.clientReference = ''
      state.clientPhone = ''
      state.payMethod = 'efectivo'
      state.finalPrice = 2
      state.time = '00:00'
      state.clientLocation = [-1.666780762262715, -78.65882635116579]
      state.clientAddress = 'Ingrese su dirección'
    }
  }
})

export const { 
  addProductsToCart, 
  removeProductsFromCart, 
  deleteProductsFromCart,
  updateClientName,
  updateClientPhone,
  updateClientReference,
  updatePayMethod, 
  updateClientLocation, 
  updateClientAddress, 
  updateFinalPrice,
  updateTime,
  handleOrderStatus,
  addOrderList,
  resetCart,
  resetCLient,
  hydrate
} = clientSlice.actions;
