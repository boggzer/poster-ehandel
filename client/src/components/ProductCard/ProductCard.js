import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardHeader,
  CardMedia,
  TextField,
  Typography,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import useStyles from "./ProductCardStyles";
import { UserContext } from "../../Contexts/UserContext";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

const ProductCard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { product, path } = props;
  const { addToCartAndLocalStorage, updateCounter, deleteProduct } = useContext(
    UserContext
  );

  const handleClick = () => {
    if (props.case !== "cart" || props.case !== "checkout") {
      history.push(path);
    }
  };

  const handleAddToCart = () => {
    addToCartAndLocalStorage(product);
  };

  return (
    <Card style={{ height: "100%" }}>
      <CardActionArea
        className={
          props.case === "cart" ||
          props.case === "checkout" ||
          props.case === "orders"
            ? classes.cartDisplay
            : null
        }
        onClick={handleClick}
      >
        <CardMedia
          className={
            props.case === "cart" ||
            props.case === "checkout" ||
            props.case === "orders"
              ? classes.cartmedia
              : props.case === "productview"
              ? classes.productpagemedia
              : classes.media
          }
          image={`http://localhost:8080/api/image/product/${product._id}`}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <CardHeader
            title={product.name}
            titleTypographyProps={{ variant: "h6" }}
            classes={
              props.case === "cart"
                ? { title: classes.titleCart }
                : { title: classes.title }
            }
          />
          {props.case === "main" || props.case === "productview" ? (
            <Typography style={{ padding: "1rem" }}>
              {product.description}
            </Typography>
          ) : null}
          <div style={{ display: "flex", marginLeft: "1rem" }}>
            {props.case === "cart" || props.case === "checkout"
              ? product.cartAmount > 1 && (
                  <Typography className={classes.cartSmallText}>
                    {product.cartAmount} items&nbsp;
                  </Typography>
                )
              : null}
            {props.case === "cart" || props.case === "checkout"
              ? product.cartAmount === 1 && (
                  <Typography className={classes.cartSmallText}>
                    {product.cartAmount} item&nbsp;
                  </Typography>
                )
              : null}
            {props.case === "main" || props.case === "productview" ? (
              <Typography>{product.price} SEK</Typography>
            ) : props.case === "updateProduct" ? null : (
              <Typography className={classes.cartSmallText}>
                á {product.price} SEK
              </Typography>
            )}
          </div>
        </div>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        {props.case === "main" ? (
          <Button size="small" onClick={handleClick}>
            View product
          </Button>
        ) : null}
        {props.case === "main" || props.case === "productview" ? (
          <Button
            disabled={
              product.inventory < 1 || product.inventory <= product.cartAmount
            }
            size="small"
            onClick={handleAddToCart}
          >
            {product.inventory < 1 || product.inventory <= product.cartAmount
              ? "Not in stock"
              : "Add to cart"}
          </Button>
        ) : props.case === "updateProduct" ? (
          <form
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            onSubmit={props.updateProduct}
          >
            <TextField
              name={product._id}
              style={{ width: 40 }}
              label="Inventory"
              type="number"
              defaultValue={product.inventory}
              onChange={(event) =>
                props.handleChange(event, product._id, "productInventory")
              }
            ></TextField>
            <RadioGroup
              row
              style={{ justifyContent: "center" }}
              defaultValue={product.category}
              aria-label="category"
              onChange={(event) =>
                props.handleChange(event, product._id, "productCategory")
              }
            >
              <FormControlLabel
                value="Forest"
                control={<Radio />}
                label="Forest"
              />
              <FormControlLabel
                value="Mountain"
                control={<Radio />}
                label="Mountain"
              />
              <FormControlLabel
                value="Water"
                control={<Radio />}
                label="Water"
              />
            </RadioGroup>

            <Button
              type="submit"
              style={{ marginLeft: "1rem" }}
              size="small"
              className={classes.submitButton}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </form>
        ) : null}
        {props.case === "cart" || props.case === "checkout" ? (
          <div className={classes.flexedDiv}>
            <Button
              className={classes.cartButtons}
              variant="contained"
              size="small"
              onClick={() => updateCounter(product, "add")}
              disabled={product.inventory <= product.cartAmount}
            >
              <AddCircleOutlineIcon />
            </Button>
            <Button
              className={classes.cartButtons}
              variant="contained"
              size="small"
              onClick={() => updateCounter(product, "remove")}
            >
              <RemoveCircleOutlineIcon />
            </Button>
            <Button
              className={classes.cartButtons}
              variant="contained"
              size="small"
              onClick={() => deleteProduct(product)}
            >
              <DeleteIcon />
            </Button>
          </div>
        ) : null}
      </CardActions>
      {props.case === "cart" || props.case === "checkout" ? (
        <Container style={{ display: "flex", flexDirection: "column" }}>
          {product.inventory <= product.cartAmount && (
            <Typography style={{ textAlign: "center" }}>
              Product stock empty
            </Typography>
          )}
        </Container>
      ) : null}
    </Card>
  );
};

export default ProductCard;
