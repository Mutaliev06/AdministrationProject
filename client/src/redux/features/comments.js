const initialState = {
  items: [],
  loading: false,
  deleting: false,
  editing: false
};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {

    case 'comments/load/pending':
      return {
        ...state,
        loading: true
      }

    case 'comments/load/fulfilled':
      return {
        ...state,
        items: action.payload,
        loading: false
      };


    case 'comment/create/pending':
      return {
        ...state,
        loading: true
      }

    case "comment/create/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };

    case "comment/edit/pending":
      return {
        ...state,
        editing: true,
      };

    case "comment/edit/fulfilled":
      return {
        ...state,
        editing: false,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              ...action.payload.data,
            }
          }
          return item;
        }),
      };

    default:
      return state;
  }
}

export const loadComments = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'comments/load/pending'
    })

    const response = await fetch(`/claim/${id}/comment`)
    const json = await response.json();
      dispatch({
        type: 'comments/load/fulfilled',
        payload: json
      })
  }
}

export const postComment = (id, comment) => {
  return async (dispatch) => {
    dispatch({ type: "comment/create/pending" });
    const response = await fetch(`/claim/${id}/comment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: comment.comment,
        status: comment.stat
      })
    });
    const json = await response.json();
    dispatch({
      type: "comment/create/fulfilled",
      payload: json,
    })
    window.location.reload()
  }}

export const editComment = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "comment/edit/pending" });

    await fetch(`/claim/${id}/comment`, {
      method: "PATCH",
      body: JSON.stringify({
        status: data.stat,
        text: data.commentText
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    dispatch({ type: "comment/edit/fulfilled", payload: { id, data } });
    window.location.reload()
  };
};