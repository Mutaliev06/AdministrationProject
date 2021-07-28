import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadClaim } from "../../redux/features/claims";
import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { loadComments, postComment } from "../../redux/features/comments";
import { useParams } from "react-router-dom";
import { loadStatus } from "../../redux/features/status";
import dayjs from "dayjs";
import CommentEdit from "../CommentEdit/commentEdit";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  textField: {
    minWidth: "700px",
  },
  addComment: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  addCommentRh: {
    display: "flex",
    flexDirection: "column",
  },
  hr: {
    height: "5px",
    backgroundColor: "black",
    marginTop: "50px",
    marginBottom: "50px",
  },
  comments: {
    minWidth: "700px",
    marginTop: "50px",
  },
  comment: {
    minHeight: "100px",
    marginBottom: "50px",
    border: "2px solid black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
  commentBtn: {
    width: "50px",
  },
  btn: {
    width: "20px",
    height: "20px",
  },
  noComment: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  text: {
    width: "100%",
  },
  tableHead: {
    backgroundColor: "gray"
  }
});

function Comment(props) {
  const { id } = useParams();

  const classes = useStyles();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.items);
  const claims = useSelector((state) => state.claims.items);
  const status = useSelector((state) => state.status.items);
  const loading = useSelector((state) => state.claims.loading);

  const customColumnStyle = { width: "250px" };
  const customColumnStyleNum = { width: "50px" };

  const [comment, setComment] = React.useState("");
  const [stat, setStat] = React.useState("");

  const handleAddComment = () => {
    if (comment.length > 5 || status.length === 0) {
      return dispatch(postComment(id, { comment: comment, stat: stat }));
    }
    return null;
  };

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handleChangeStatus = (e) => {
    setStat(e.target.value);
  };

  useEffect(() => {
    dispatch(loadStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadComments(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadClaim(id));
  }, [dispatch]);

  return (
    <div>
      <h1>Все записи:</h1>
      {loading ? (
        "Идет загрузка ..."
      ) : (
        <>
          <div className={classes.addComment}>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Введите комментарий"
              variant="outlined"
              inputMode={"text"}
              value={comment}
              onChange={handleChangeComment}
            />
            <div className={classes.addCommentRh}>
              <TextField
                id="outlined-select-currency-native"
                select
                onChange={handleChangeStatus}
                SelectProps={{
                  native: true,
                }}
                helperText="----------------------------------------------------------------------"
                variant="outlined"
              >
                <option disabled selected>
                  Выберите статус
                </option>
                {status.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  );
                })}
              </TextField>
              <Button
                onClick={() => handleAddComment(claims._id)}
                variant="contained"
                type="submit"
                color="primary"
              >
                Добавить
              </Button>
            </div>
          </div>

          <hr className={classes.hr} />

          <div className={classes.comments}>
            {comments.length > 0 ? (
              <Table>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell>№</TableCell>
                    <TableCell>Дата изменения</TableCell>
                    <TableCell>Статус обращения</TableCell>
                    <TableCell>Комментарий</TableCell>
                    <TableCell>Изменить</TableCell>
                  </TableRow>
                </TableHead>
                {comments.map((item, index) => {
                  const element = status.find(
                    (elem) => elem._id === item.status
                  );
                  return (
                    <TableBody key={item.id}>
                      <TableRow className={classes.status}>
                        <TableCell style={customColumnStyleNum}>
                          {index + 1}
                        </TableCell>
                        <TableCell style={customColumnStyle}>
                          {dayjs(item.createdAt).format("DD.MM.YYYY HH:mm")}
                        </TableCell>
                        <TableCell
                          style={customColumnStyle}
                          bgColor={element?.color}
                        >
                          <h4>{element?.title}</h4>
                        </TableCell>
                        <TableCell className={classes.text}>
                          {item.text}
                        </TableCell>
                        <TableCell style={customColumnStyle}>
                          <CommentEdit comment={item} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
              </Table>
            ) : (
              <div className={classes.noComment}>
                <h1>Нет комментариев</h1>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Comment;
