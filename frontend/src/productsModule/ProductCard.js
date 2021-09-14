

import PropTypes from "prop-types";
import { useHistory } from "react-router";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { deleteProduct } from "./store/actions";
import { useDispatch } from "react-redux";


const ProductCard = ({ product, ...rest }) => {
  /**HOOKS */
  const history = useHistory();
  const dispatch = useDispatch();
  /**EFFECTS */

  const goEdition = () => {
    history.push(`product/${product._id}`);
  };
  const hanldeDelete = async () => {
    await dispatch(deleteProduct(product._id));
  };
  return (
    <Card elevation={0} color={""}>
      <CardHeader title={product.title} subheader={product.category} />
      {product.img ? (
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={product.img}
          title="Contemplative Reptile"
        />
      ) : null}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit" onClick={goEdition}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={hanldeDelete}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};
export default ProductCard;
