import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { editComment } from "../../redux/features/comments";
import { loadStatus } from "../../redux/features/status";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    margin: "auto",
    width: "fit-content",
  },
  input: {
    width: 350,
  },
  formControl: {
    marginTop: theme.spacing(5),
    minWidth: 20,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function CommentEdit({ comment }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [stat, setStat] = useState(comment.status);
  const status = useSelector((state) => state.status.items);
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState(comment.text);
  const loading = useSelector((state) => state.comments.loading);

  useEffect(() => {
    dispatch(loadStatus());
  }, [dispatch]);

  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async () => {
    await dispatch(editComment(comment._id, { commentText, stat }))
    .then(() => {
      handleClose()
    })

  };

  const handleChangeComment = (even) => {
    setCommentText(even.target.value);
  };

  const handleChangeStatus = (e) => {
    setStat(e.target.value);
  };

  if (loading) {
    return (
      <>
        <Typography color="primary" variant="h6" noWrap>
          Идет загрузка ...
        </Typography>
      </>
    );
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Изменить
      </Button>
      <Dialog
        fullWidth={fullWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent className={classes.dialog}>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Введите комментарий"
              variant="outlined"
              value={commentText}
              onChange={handleChangeComment}
            />
          <TextField
                id="outlined-select-currency-native"
                select
                label="Выберите статус"
                value={stat}
                onChange={handleChangeStatus}
                SelectProps={{
                  native: true,
                }}
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
                onClick={handleEdit}
                variant="contained"
                type="submit"
                color="primary"
              >
                Сохранить
              </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
