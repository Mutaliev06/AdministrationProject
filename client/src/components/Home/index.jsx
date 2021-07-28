import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadClaims } from "../../redux/features/claims";
import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import { loadStatus } from "../../redux/features/status";
import { BsSearch, BsSquareFill } from "react-icons/all";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700
  },
  status: {
    width: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  btn: {
    marginTop: "2px",
    marginBottom: "20px",
  },
  avatar: {
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
  navLink: {
    textDecoration: "none",
  },
  filter: {
    textDecoration: "none"
  },
  statusIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  },
  tableCont: {
    marginTop: "50px"
},
  search: {
    width: "300px",
    display: "flex",
  },
  searchIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: "10px"
  }
}));

function Home(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const claims = useSelector((state) => {
    return state.claims.items
    .map((item) => item)
    .filter((item) => {
      return item.title?.toLowerCase().includes(search.toLowerCase());
    });
  });

  const loading = useSelector((state) => state.claims.loading);
  const status = useSelector((state) => state.status.items);

  useEffect(() => {
    dispatch(loadClaims());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadStatus());
  }, [dispatch]);

  return (
    <div>
      <div className={classes.search}>
        <div>
          <BsSearch className={classes.searchIcon} />
        </div>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className={classes.textField}
          placeholder="Поиск…"
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {loading ? (
        "Идет загрузка ..."
      ) : (
        <TableContainer className={classes.tableCont} component={Paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead className={classes.tableHead}>
                  <TableRow className={classes.tableRow}>
                    <TableCell className={classes.tableCell}></TableCell>
                    <TableCell className={classes.tableCell}>
                      Описание
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      Последнее изменение
                    </TableCell>
                    <TableCell className={classes.tableCell}>Статус</TableCell>
                    <TableCell className={classes.tableCell}>
                      Количество записей
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claims.map((item, index) => {
                    const element = status.find(elem => elem._id === item.lastComment?.status);
                    return (
                      <TableRow className={classes.tableRow} key={index}>
                        <TableCell className={classes.tableCell} align="center">
                          <Avatar
                            alt="Лого"
                            src={`${item.pathToImage}`}
                            className={classes.avatar}
                          />
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          component="th"
                          scope="row"
                        >
                          <nav>
                            <NavLink
                              className={classes.navLink}
                              to={`/claim/${item._id}/comment`}
                              activeClassName="active"
                            >
                              <Button variant="outlined">
                                <h4>{item.title}</h4>
                              </Button>
                            </NavLink>
                          </nav>
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                          {dayjs(claims[index].lastComment?.updatedAt).format(
                            "DD.MM.YYYY HH:mm"
                          )}
                        </TableCell>
                        {claims[index].comments.length === 0 ? (
                          <TableCell>
                            <h4>Нет комментариев</h4>
                          </TableCell>
                        ) : (
                          <TableCell
                            className={classes.tableCell}
                            align="center"
                          >
                            <div className={classes.status}>
                              <div>
                                <BsSquareFill className={classes.statusIcon} color={element?.color} />
                              </div>
                              <p style={{fontWeight: 600}}>
                                {element?.title}
                              </p>
                            </div>
                          </TableCell>
                        )}
                        <TableCell className={classes.tableCell} align="center">
                          {item.comments.length}
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
    </div>
  );
}

export default Home;
