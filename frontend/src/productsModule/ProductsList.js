import { CardHeader, Grid, makeStyles, Paper } from "@material-ui/core";
import { Fragment, useEffect } from "react";
import ProductCard from "./ProductCard";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./store/actions";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
function ProductList({ posts = [], history, ...props }) {
  const classes = useStyles();
  const goCreate = () => {
    history.push("/product");
  };
  const products = useSelector(({ products }) => products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <Paper elevation={2} style={{ margin: 24, background: "aliceblue" }}>
        <CardHeader title={"Products"} />
        <Grid
          container
          spacing={3}
          style={{ padding: 12 }}
          justifyContent="center"
          alignItems="center"
        >
          {products.map((p) => (
            <Grid key={p._id} item xs={12} sm={6} md={4}>
              <ProductCard onlyHead product={p} />
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={goCreate}
      >
        <AddIcon />
      </Fab>
    </Fragment>
  );
}

export default withRouter(ProductList);
