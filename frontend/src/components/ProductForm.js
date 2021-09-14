import { Button, CardHeader, Grid, makeStyles, Paper } from "@material-ui/core";
import Formsy from "formsy-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { withRouter } from "react-router-dom";
import { patchProduct, postProduct } from "../productsModule/store/actions";
import FileUploader from "./FileUpload";
import TextFieldFormsy from "./formBasics/TextFieldFormsy";
/***** STYLES *****/
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "16px auto",
    padding: theme.spacing(3),
    maxWidth: 600,
  },
}));

const ProductForm = ({ id, reload, history, ...rest }) => {
  /**HOOKS */
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    img: "",
  });

  const [disableSave, setDisableSave] = useState(false);

  const [isEdition, setIsEdition] = useState(false);
  const products = useSelector(({ products }) => products.products);
  /**EFFECTS */

  /**preload data to form if is an edition */
  useEffect(() => {
    if (!params.id) return;
    const product = products.find((p) => p._id === params.id);
    if (!product) return;
    setForm({
      ...product,
    });
    setIsEdition(true);
  }, [params, products]);

  /**FUNCTIONS */
  const handleSubmit = async (e) => {
    setDisableSave(true);
    let res = {};
    if (isEdition) {
      res = await dispatch(patchProduct(form, form._id));
    } else {
      res = await dispatch(postProduct(form));
    }
    res?.valid && history.replace("/list");
    setDisableSave(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileInput = (e) => {
    setForm({ ...form, img: e});
  };
  /**CONST */
  const commonProps = {
    onChange: handleChange,
    variant: "filled",
    fullWidth: true,
    md: 6,
  };
  return (
    <Paper className={classes.paper}>
      <Formsy>
        <CardHeader title="Product Creation" subheader="add the data" />
        <Grid container spacing={4}>
          <TextFieldFormsy
            name="name"
            label="Name"
            value={form.name}
            {...commonProps}
          />
          <TextFieldFormsy
            name="category"
            label="Category"
            value={form.category}
            {...commonProps}
          />
          <TextFieldFormsy
            name="description"
            label="Description"
            value={form.description}
            {...commonProps}
            sm={12}
            md={12}
            multiline={true}
            rows={6}
          />
          <Grid item sm={12} md={12} xs={12} style={{textAlign:'center' }}>
            <FileUploader  handleFileInput={handleFileInput} />
          </Grid>
          <Button
            onClick={handleSubmit}
            disabled={disableSave}
            style={{ marginLeft: "auto" }}
            color={"primary"}
            variant="contained"
          >
            {isEdition ? "Edit" : "Create"}
          </Button>
        </Grid>
      </Formsy>
    </Paper>
  );
};

export default withRouter(ProductForm);
