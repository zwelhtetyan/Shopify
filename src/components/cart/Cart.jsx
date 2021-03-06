import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { cartSliceAction } from '../../store/cart/cart-slice';
import BackBtn from '../../utilities/BackBtn';
import { cartIconBtnProp } from '../../utilities/cartIconBtnProp';
import { hoverBtnProp } from '../../utilities/hoverBtnProp';
import CartItem from './CartItem';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { loading, error } = useSelector((state) => state.cartUI);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce(
        (amount, item) => amount + item.price * item.quantity,
        0
    );

    const removeFromCartHandler = (id) =>
        dispatch(cartSliceAction.removeFromCart(id));

    const displayCartItems = cartItems.map((item) => (
        <CartItem
            {...item}
            key={item.id}
            isWishlist={false}
            removeItem={removeFromCartHandler}
        />
    ));

    const cartItemSection =
        cartItems.length > 0 ? (
            displayCartItems
        ) : (
            <Text textAlign='center' mt='2rem'>
                Empty Cart Bro!
            </Text>
        );

    const clearCartHandler = () => {
        dispatch(cartSliceAction.clearCart());
    };

    const cartFooter = (
        <>
            <HStack justify='space-between' align='center' mb={'1rem'}>
                <Heading fontSize='20px'>TOTAL</Heading>
                <Heading fontSize='20px'>${totalPrice.toFixed(2)}</Heading>
            </HStack>
            <Button
                sx={cartIconBtnProp}
                _hover={hoverBtnProp}
                width='100%'
                maxWidth='130px'
                onClick={clearCartHandler}
            >
                Clear Cart
            </Button>
        </>
    );

    const cartContent = (
        <>
            <Box maxWidth='1000px' m='auto' mt='1rem' mb='2rem'>
                {cartItemSection}
            </Box>
            {cartItems.length > 0 && cartFooter}
        </>
    );

    //scroll to top when this component mount
    const loacation = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [loacation]);

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
                {!error && !loading && cartContent}
            </Box>
        </Box>
    );
};

export default Cart;
