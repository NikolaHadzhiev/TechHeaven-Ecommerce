import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user";
import { FieldValues } from "react-hook-form";
import apiRequests from "../../api/requests";
import { router } from "../../router/Router";
import { toast } from "react-toastify";
import { setShoppingCart } from "./shoppingCartSlice";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
        const userData = await apiRequests.Account.login(data);
        const {shoppingCart, ...user} = userData;
        if(shoppingCart) thunkAPI.dispatch(setShoppingCart(shoppingCart));
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({error: error.data})
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
    "account/fetchCurrentUser",
    async (_, thunkAPI) => {
    
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {

          const userData = await apiRequests.Account.currentUser();
          const {shoppingCart, ...user} = userData;
              
          localStorage.setItem('user', JSON.stringify(user));
  
          return user;

      } catch (error: any) {
          return thunkAPI.rejectWithValue({error: error.data})
      }
    },
    {
        //only call the API when we have a token
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
  );

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
        state.user = null;
        localStorage.removeItem('user');
        router.navigate('/');
    },
    setUser: (state, action) => {
        state.user = action.payload
    }
  },
  extraReducers: (builder => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        localStorage.removeItem('user');
        toast.error('Session expired - please login again');
        router.navigate("/"); 
    });

    builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
        state.user = action.payload;
    });

    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
        throw action.payload
    })
  })
});

export const { signOut, setUser } = accountSlice.actions
