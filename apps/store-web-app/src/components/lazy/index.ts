import dynamic from 'next/dynamic';

export const LazyCartModal = dynamic(() => import('../Modals/CartModal').then(mod => mod.CartModal), {
  loading: () => null,
  ssr: false
});

export const LazyCheckoutBill = dynamic(() => import('../CheckoutBill').then(mod => mod.CheckoutBill), {
  loading: () => null
});

export const LazyAddToCartModal = dynamic(() => import('../Modals/AddToCartModal').then(mod => mod.AddToCartModal), {
  loading: () => null,
  ssr: false
});
