import { useEffect } from 'react';
import { DatabaseService } from './services/databaseService';
import { CreditCardOrderManager } from './components/CreditCardOrderManager';
import { ProductManager } from './components/ProductManager';
import { OrderManager } from './components/OrderManager';
import { CustomerForm } from './components/checkout/CustomerForm';

function App() {
  useEffect(() => {
    DatabaseService.initDatabase();
  }, []);

  return (
    <div>
      <h1>My Application</h1>
      <CreditCardOrderManager />
      <ProductManager />
      <OrderManager />
      <CustomerForm />
    </div>
  );
}

export default App;
