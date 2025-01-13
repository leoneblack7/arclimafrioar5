export const generateOrderId = () => {
  return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};