const initialState = {
  items: [],
  loading: false,
};

export default function statusReducer(state = initialState, action) {
  switch (action.type) {

    case 'status/load/pending':
      return {
        ...state,
        loading: true
      }

    case 'status/load/fulfilled':
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case "status/remove/pending":
      return {
        ...state,
        deleting: true,
      };

    case 'status/remove/fulfilled':
      return {
        ...state,
        status: state.items.filter(item => {
          if (item.id === action.payload) {
            return false
          }
          return true
        })
      }

    case "status/create/pending":
      return {
        ...state,
        loading: true,
      };

    case "status/create/fulfilled":
      return {
        ...state,
        loading: true,
        items: action.payload,
      };

    default:
      return state;
  }
}

export const loadStatus = () => {
  return async (dispatch) => {
    dispatch({
      type: 'status/load/pending'
    })

    const response = await fetch('/status')
    const json = await response.json();
      dispatch({
        type: 'status/load/fulfilled',
        payload: json
      })
  }
}

export const postStatus = ( data ) => {
  return async (dispatch) => {
    dispatch({ type: "status/create/pending" });
    const response = await fetch("/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: data.titleText,
        color: data.statColor
      }),
    });
    const json = await response.json();
    dispatch({
      type: "status/create/fulfilled",
      payload: json,
    });
    window.location.reload();
  };
};