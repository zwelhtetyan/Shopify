import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import BackBtn from '../../utilities/BackBtn';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../cart/CartItem';
import { wishListSliceAction } from '../../store/wishlist/wishlist-slice';
import { cartIconBtnProp } from '../../utilities/cartIconBtnProp';
import { hoverBtnProp } from '../../utilities/hoverBtnProp';

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishlists = useSelector((state) => state.wishList.wishlist);
    const { loading, error } = useSelector((state) => state.wishlistUI);

    const removeFromWishlistHandler = (id) => {
        dispatch(wishListSliceAction.removeFromWishlist(id));
    };

    const clearWishlistHandler = () => {
        dispatch(wishListSliceAction.clearWishlist());
    };

    const displayWishlist = wishlists.map((item) => (
        <CartItem
            {...item}
            isWishlist={true}
            key={item.id}
            removeItem={removeFromWishlistHandler}
        />
    ));

    const clearButton = (
        <Button
            sx={cartIconBtnProp}
            _hover={hoverBtnProp}
            width='100%'
            maxWidth='130px'
            onClick={clearWishlistHandler}
        >
            Clear Wishlist
        </Button>
    );

    const wishlistContent = (
        <>
            <Box maxWidth='1000px' m='auto' mt='1rem' mb='2rem'>
                <Box mb='2rem'>{displayWishlist}</Box>
                {wishlists.length > 0 ? (
                    clearButton
                ) : (
                    <Text textAlign='center' mt='2rem'>
                        Empty Wishlist Bro!
                    </Text>
                )}
            </Box>
        </>
    );

    return (
        <Box px={5} maxWidth='1200px' m='auto' mt='65px'>
            <Box
                marginTop={'6rem !important'}
                mb='2rem'
                px={['0', '1rem', '3rem']}
            >
                <BackBtn onBack={() => navigate('/')} />

                {error && (
                    <Text textAlign='center'>
                        {error}. Please check your internet connection and try
                        again.
                    </Text>
                )}
                {loading && <Text textAlign='center'>Loading...</Text>}
                {!error && !loading && wishlistContent}
            </Box>
        </Box>
    );
};

export default Wishlist;
