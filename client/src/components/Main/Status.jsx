import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStatus, postStatus } from "../../redux/features/status";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import {
  MdFormatColorFill,
  RiPlayListAddFill,
} from "react-icons/all";

const useStyles = makeStyles((theme) => ({
  adminDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  tableCont: {
    marginTop: "20px",
  },
  symbol: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: "black",
  },
  btn: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  filter: {
    textDecoration: "none",
  },
  tableHead: {
    backgroundColor: "gray",
  }
}));

function Status(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status.items);
  const loading = useSelector((state) => state.status.loading);
  const [open, setOpen] = React.useState(false);
  const [titleText, setTitleText] = useState("");
  const [statColor, setStatColor] = useState("");

  const handleAddTitleText = (e) => {
    setTitleText(e.target.value);
  };

  const handleAddColor = (e) => {
    setStatColor(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(loadStatus());
  }, [dispatch]);

  const handlePostStatus = () => {
    dispatch(postStatus({ titleText: titleText, statColor: statColor }));
  };
  return (
    <div>
      <div className={classes.adminDiv}>
        <h3>Статусы:</h3>
        <Fab variant="outlined" color="primary" onClick={handleClickOpen}>
          <RiPlayListAddFill />
        </Fab>
      </div>
      {loading ? (
        "Идет загрузка ..."
      ) : (
        <TableContainer className={classes.tableCont} component={Paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Table className="table">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell>Описание</TableCell>
                    <TableCell>Цвет</TableCell>
                    <TableCell>Код цвета</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {status.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <h3>{item.title}</h3>
                        </TableCell>
                        <TableCell>
                          <MdFormatColorFill
                            color={item?.color}
                            className={classes.symbol}
                          />
                        </TableCell>
                        <td>{item.color}</td>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </TableContainer>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Новый статус</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Создание нового статуса
          </DialogContentText>
          <TextField
            value={titleText}
            autoFocus
            margin="dense"
            id="name"
            label="Введите наименование нового статуса"
            type="text"
            fullWidth
            onChange={handleAddTitleText}
          />
          <TextField
            value={statColor}
            autoFocus
            margin="dense"
            id="name"
            label="Введите цвет нового статуса (#******)"
            type="text"
            fullWidth
            onChange={handleAddColor}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={handlePostStatus} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Status;
