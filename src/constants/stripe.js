const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_3HvJFwULXOfVo5rWkbqeDwa7'
  : 'pk_test_3HvJFwULXOfVo5rWkbqeDwa7';

export default STRIPE_PUBLISHABLE;
