const initialState = {
  items: [],
  loading: false,
};

export default function claimsReducer(state = initialState, action) {
  switch (action.type) {
    case "claims/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "claims/load/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case "claims/remove/pending":
      return {
        ...state,
        deleting: true,
      };

    case "claims/remove/fulfilled":
      return {
        ...state,
        deleting: false,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    case "claim/create/pending":
      return {
        ...state,
        loading: true,
      };

    case "claim/create/fulfilled":
      return {
        ...state,
        loading: true,
        items: action.payload,
      };

    default:
      return state;
  }
}

export const loadClaims = () => {
  return async (dispatch) => {
    dispatch({
      type: "claims/load/pending",
    });
    const response = await fetch("http://localhost:5000/");
    const json = await response.json();
    dispatch({
      type: "claims/load/fulfilled",
      payload: json,
    });
  };
};

export const loadClaim = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "claims/load/pending",
    });

    const response = await fetch(`http://localhost:5000/claim/${id}/comment`);
    const json = await response.json();

    dispatch({
      type: "claims/load/fulfilled",
      payload: json,
    });
  };
};

export const removeClaim = (id) => {
  return async (dispatch) => {
    dispatch({
      type: "claims/remove/pending",
    });
    await fetch(`http://localhost:5000/claim/${id}`, {
      method: "DELETE",
    });
    dispatch({
      type: "claims/remove/fulfilled",
      payload: id,
    });
  };
};

export const postClaim = (data) => {
  return async (dispatch) => {
    dispatch({ type: "claim/create/pending" });
    const response = await fetch("http://localhost:5000/admin/claim", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: data.titleText,
        pathToImage: data.image
      }),
    });
    const json = await response.json();
    dispatch({
      type: "claim/create/fulfilled",
      payload: json,
    });
    window.location.reload();
  };
};
