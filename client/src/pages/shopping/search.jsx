import ProductDetailsDialog from "../../components/shopping/productDetails";
import ShoppingProductTile from "../../components/shopping/productTile";
import { Input } from "../../components/ui/input";
import {
  Notification,
  NotificationType,
} from "../../components/ui/Notification";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  addProductToCart,
  getSearchResults,
  resetSearchResults,
  getCartItems as getAllCartItems,
  getProductDetail,
} from "../../store/slices/shopSlice";
import { userInformationSelector } from "../../store/selectors/authSelector";
import {
  shopCartItemsSelector,
  shopProductDetailsSelector,
  shopSearchResultsSelector,
} from "../../store/selectors/shopSelectors";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const searchResults = useSelector(shopSearchResultsSelector);
  const productDetails = useSelector(shopProductDetailsSelector);

  const user = useSelector(userInformationSelector);

  const cartItems = useSelector(shopCartItemsSelector);
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [dispatch, keyword, setSearchParams]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          Notification({
            message: `Only ${getQuantity} quantity can be added for this item`,
          });

          return;
        }
      }
    }

    dispatch(
      addProductToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllCartItems({ userId: user?.id }));
        Notification({
          message: "Product is added to cart",
          type: NotificationType.SUCCESS,
        });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(getProductDetail({ productId: getCurrentProductId }));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            key={item}
            handleAddtoCart={handleAddtoCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
