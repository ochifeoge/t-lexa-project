export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    /* case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      }; */

    case "ADD_TO_CART": {
      const itemExists = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemExists) {
        // If item already exists, increase quantity
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      } else {
        // If item does not exist, add it with qty: 1
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };

    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };

    case "INCREASE_BY_ONE":
      return {
        ...state,
        cart: state.cart.map((item) => {
          return action.payload.id === item.id
            ? {
                ...item,
                qty:
                  item.qty >= item.quantity ? item.qty : action.payload.qty + 1,
              }
            : item;
        }),
      };
    case "DECREASE_BY_ONE":
      return {
        ...state,
        cart: state.cart.map((item) => {
          return action.payload.id === item.id
            ? { ...item, qty: item.qty <= 1 ? 1 : item.qty - 1 }
            : item;
        }),
      };

    case "CHANGE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    default:
      return state;
  }
};
