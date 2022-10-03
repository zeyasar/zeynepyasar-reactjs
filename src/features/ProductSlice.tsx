import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = process.env.TOKEN;

export interface ProductObj {
  _id: string;
  name?: string | null;
  avatar: string;
  description: string;
  price: number;
  category: string;
  developerEmail: string;
  createdAt: string;
  updatedAt: string;
  __v?: string;
}
export type ProductArr = {
  productList: Array<Object>;
};

export interface CategotyObj {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v?: string;
}
export interface FormData {
  name?: string;
  price?: string;
  avatar?: string;
  category?: string;
  developerEmail?: string;
  description?: string;
}

export type InitialState = {
  productList: ProductObj[] | [];
  favProduct: ProductObj[] | [];
  categories: CategotyObj[] | [];
  isLoading: boolean;
  toggleForm: boolean;
  indiviProd: ProductObj[] | [];
};

const initialState: InitialState = {
  productList: [],
  favProduct: [],
  categories: [],
  isLoading: false,
  toggleForm: false,
  indiviProd: [],
};

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async () => {
    var config = {
      method: 'get',
      url: 'https://upayments-studycase-api.herokuapp.com/api/products/',
      headers: { 
        '': '', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp5bnB5c3I2N0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vemV5YXNhciIsImlhdCI6MTY2NDU2NTAzMCwiZXhwIjoxNjY0OTk3MDMwfQ.Je7E_t-Ii-ST_z4TlEkH6Nzw76VK081tuveXuKEmpuQ'
      },
    };
    
  await axios(config)
    .then(function (response) {
      console.log(response.status)
      return response.data.products;
    })
    .catch(function (error) {
      return error.message;
    });   
  });

export const getCategory = createAsyncThunk(
  "product/getCategory",
  async (data, thunkApi) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const res = await axios.get<ProductArr[]>(
        "https://upayments-studycase-api.herokuapp.com/api/categories",
        config
      );
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.massage);
    }
  }
);
export const toggleCategory = createAsyncThunk(
  "product/toggleCategory",
  async (cat: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const res = await axios.get<ProductArr[]>(
        `https://upayments-studycase-api.herokuapp.com/api/products`,
        config
      );
      return { ...res.data, cat };
    } catch (error: any) {}
  }
);

export const addProduct = createAsyncThunk(
  "product/addProducts",
  async (obj: any) => {
    const config: object = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    await axios.post<ProductArr[]>(
        "https://upayments-studycase-api.herokuapp.com/api/products",
        obj,
        config
      )
      .then((res)=>{
        return res.data;
      })
      
    .catch((err)=>{
      console.log(err.message);
    })
  }
);
export const getIndiProduct = createAsyncThunk(
  "product/getIndiProduct",
  async (id: any) => {
    const config: object = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    try {
      const res = await axios.get<ProductArr[]>(
        `https://upayments-studycase-api.herokuapp.com/api/products/${id}`,
        config
      );
      return res.data;
    } catch (error: any) {}
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<String>) => {
      const newDat = state.productList.filter((elem: ProductObj) => {
        return elem._id !== action.payload;
      });
      state.productList = newDat;
    },
    addTofavrites: (state, action: PayloadAction<ProductObj>) => {
      state.favProduct = [...state.favProduct, action.payload];
    },
    removeFromFavrites: (state, action: PayloadAction<string>) => {
      const newData = state.favProduct.filter((elem) => {
        return elem._id !== action.payload;
      });
      state.favProduct = newData;
    },
    showForm: (state, action: PayloadAction<any>) => {
      state.toggleForm = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getProduct.pending, (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(
      getProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.productList = [...action.payload.products];
        state.isLoading = false;
      }
    );
    builder.addCase(
      getProduct.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(
      toggleCategory.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      toggleCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        const arr = [...action.payload.products];
        if (action.payload.cat !== "all") {
          const newData = arr.filter((elem: ProductObj) => {
            return elem.category === action.payload.cat;
          });

          state.productList = [...newData];
        } else {
          state.productList = [...arr];
        }
        state.isLoading = false;
      }
    );
    builder.addCase(
      toggleCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(
      getCategory.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      getCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.categories = [...action.payload.categories];
        state.isLoading = false;
      }
    );
    builder.addCase(
      getCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(addProduct.pending, (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(
      addProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.productList = [...state.productList, action.payload.product];
        state.isLoading = false;
      }
    );
    builder.addCase(
      addProduct.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
    builder.addCase(
      getIndiProduct.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      getIndiProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.indiviProd = [action.payload.product];
        state.isLoading = false;
      }
    );
    builder.addCase(
      getIndiProduct.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
  },
});
export default productSlice.reducer;
export const { deleteProduct, addTofavrites, showForm, removeFromFavrites } =
  productSlice.actions;