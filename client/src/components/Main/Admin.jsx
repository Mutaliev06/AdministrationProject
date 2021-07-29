import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadClaims, postClaim, removeClaim } from "../../redux/features/claims";
import {
  Avatar,
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, TextField,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { FaFilter, MdDelete, RiPlayListAddFill } from 'react-icons/all';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  tableCont: {
    marginTop: 20
  },
  admin: {},
  status: {
    width: "100px",
    display: "flex",
    justifyContent: "space-between",
  },
  btn: {
    marginTop: "2px",
    marginBottom: "20px",
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  tableRow: {},
  tableCell: {
    fontSize: 14,
  },
  tableHead: {
    backgroundColor: "gray",
  },
  adminDiv:  {
    display: "flex",
    justifyContent: 'space-between'
  },
  button: {
    margin: theme.spacing(1),
  },
  navLink: {
    textDecoration: "none"
  },
  filter: {
    textDecoration: "none"
  }
}));

function Admin(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const claims = useSelector((state) => state.claims.items);
  const loading = useSelector((state) => state.claims.loading);

  const [open, setOpen] = useState(false);
  const [titleText, setTitleText] = useState("")
  const [image, setImage] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(loadClaims());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(removeClaim(id))
  }

  const handleAddImage = (e) => {
    setImage(e.target.value)
  }

  const handleAddTitleText = (e) => {
    setTitleText(e.target.value)
  }

  const handlePostClaim = () => {
    dispatch(postClaim({titleText: titleText, image: image}))
  }

  return (
    <div className={classes.admin}>
      <div className={classes.adminDiv}>
        <div>
          <h3>Админка</h3>
          <NavLink to="/filter" className={classes.filter}>
            <Button className={classes.btn} variant="contained" color="secondary" startIcon={<FaFilter />}>
              показать фильтр
            </Button>
          </NavLink>
        </div>
        <Fab variant="outlined" color="primary" onClick={handleClickOpen}>
          <RiPlayListAddFill/>
        </Fab>
      </div>
      {loading ? (
        "Идет загрузка ..."
      ) : (
        <TableContainer className={classes.tableCont} component={Paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Table className={classes.table}>
                <TableBody>
                  {claims.map((item, index) => {
                    return (
                      <TableRow className={classes.tableRow} key={index}>
                        <TableCell className={classes.tableCell} align="center">
                          <Avatar
                            alt="Лого"
                            src={`${item.pathToImage}`}
                            className={classes.large}
                          />
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          component="th"
                          scope="row"
                        >
                          <nav>
                            <NavLink
                              to={`/claim/${item._id}/comment`}
                              className={classes.navLink}
                              activeClassName="active"
                            >
                              <Button variant="outlined">
                                <h3>
                                {item.title}
                              </h3>
                              </Button>
                            </NavLink>
                          </nav>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDelete(item._id)}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<MdDelete />}
                          >
                            удалить
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Новое обращение</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Создание нового обращения
          </DialogContentText>
          <TextField
            value={titleText}
            autoFocus
            margin="dense"
            id="name"
            label="Введите текст"
            type="text"
            fullWidth
            onChange={handleAddTitleText}
          />
          <TextField
            value={image}
            autoFocus
            margin="dense"
            id="name"
            label="Вставьте ссылку на аватарку"
            type="text"
            fullWidth
            onChange={handleAddImage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={handlePostClaim} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default Admin;
