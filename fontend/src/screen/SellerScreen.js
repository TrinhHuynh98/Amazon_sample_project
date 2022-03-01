import React, { useEffect } from 'react';
import Header from '../components/Layout/Header';
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import { useParams, Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import Messagebox from '../components/Messagebox';

export default function SellerScreen() {
  const { sellerId } = useParams();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const productlist = useSelector((state) => state.productlist);
  const {
    loading: loadingProductList,
    errorProductList,
    products,
  } = userDetails;

  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);
  return (
    <div>
      {' '}
      <Header />
      <Box sx={{ flexGrow: 1, marginLeft: 10, marginRight: 10 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={4} style={{ marginTop: 20 }}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <Messagebox>{error}</Messagebox>
            ) : (
              <>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {user.seller.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        <Link to={`mailto:${user.email}`}></Link>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </>
            )}
          </Grid>

          <Grid item xs={8} sm={8} md={8} style={{ marginTop: 20 }}>
            <Card sx={{ maxWidth: 345 }}>
              <Typography gutterBottom variant="h5" component="div">
                Right side
              </Typography>

              <CardActionArea>
                <CardContent></CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
