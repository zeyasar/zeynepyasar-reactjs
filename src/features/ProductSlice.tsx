import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  indiviProd: ProductObj[] | [];
};

const initialState: InitialState = {
  productList: [],
  favProduct: [],
  categories: [],
  isLoading: false,
  indiviProd: [],
};

export const getProduct = createAsyncThunk("product/getProduct", async () => {
  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp5bnB5c3I2N0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vemV5YXNhciIsImlhdCI6MTY2NDU2NTAzMCwiZXhwIjoxNjY0OTk3MDMwfQ.Je7E_t-Ii-ST_z4TlEkH6Nzw76VK081tuveXuKEmpuQ",
    },
  };

  const res = await axios.get(
    "https://upayments-studycase-api.herokuapp.com/api/products/",
    config
  );
  return res.data;
});

export const getCategory = createAsyncThunk("product/getCategory", async () => {
  const config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp5bnB5c3I2N0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vemV5YXNhciIsImlhdCI6MTY2NDU2NTAzMCwiZXhwIjoxNjY0OTk3MDMwfQ.Je7E_t-Ii-ST_z4TlEkH6Nzw76VK081tuveXuKEmpuQ",
    },
  };

  const res = await axios.get(
    "https://upayments-studycase-api.herokuapp.com/api/categories",
    config
  );
  return res.data;
});

export const toggleCategory = createAsyncThunk(
  "product/toggleCategory",
  async (cat: string) => {
    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp5bnB5c3I2N0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vemV5YXNhciIsImlhdCI6MTY2NDU2NTAzMCwiZXhwIjoxNjY0OTk3MDMwfQ.Je7E_t-Ii-ST_z4TlEkH6Nzw76VK081tuveXuKEmpuQ",
      },
    };
    const res = await axios.get<ProductArr[]>(
      `https://upayments-studycase-api.herokuapp.com/api/products`,
      config
    );
    return { ...res.data, cat };
  }
);

export const addProduct = createAsyncThunk(
  "product/addProducts",
  async (obj: any) => {
    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp5bnB5c3I2N0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vemV5YXNhciIsImlhdCI6MTY2NDU2NTAzMCwiZXhwIjoxNjY0OTk3MDMwfQ.Je7E_t-Ii-ST_z4TlEkH6Nzw76VK081tuveXuKEmpuQ",
      },
    };
    const res = await axios
      .post<ProductArr[]>(
        "https://upayments-studycase-api.herokuapp.com/api/products",
        obj,
        config
      )
        return res.data;
  }
);
export const getIndiProduct = createAsyncThunk(
  "product/getIndiProduct",
  async (id: any) => {
    const config = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp5bnB5c3I2N0BnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vemV5YXNhciIsImlhdCI6MTY2NDU2NTAzMCwiZXhwIjoxNjY0OTk3MDMwfQ.Je7E_t-Ii-ST_z4TlEkH6Nzw76VK081tuveXuKEmpuQ",
      },
    };

    const res = await axios.get(
      `https://upayments-studycase-api.herokuapp.com/api/products/${id}`,
      config
    );
    // console.log(res)
    return res.data;
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
    addFavorite: (state, action: PayloadAction<ProductObj>) => {
      state.favProduct = [...state.favProduct, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const newData = state.favProduct.filter((elem) => {
        return elem._id !== action.payload;
      });
      state.favProduct = newData;
    },
  },
  extraReducers(builder) {
    builder.addCase(getProduct.pending, (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.productList = action.payload.products;
      state.isLoading = false;
    });
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
    builder.addCase(getIndiProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIndiProduct.fulfilled, (state, action) => {
      state.indiviProd = [action.payload.product];
      state.isLoading = false;
    });
    builder.addCase(
      getIndiProduct.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
  },
});

export default productSlice.reducer;
export const { deleteProduct, addFavorite, removeFavorite } =
  productSlice.actions;
