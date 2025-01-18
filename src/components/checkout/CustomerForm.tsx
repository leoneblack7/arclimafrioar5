import React, { useState } from 'react';

export interface CustomerFormProps {
  onChange: (data: any) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onChange }) => {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onChange({ ...customerData, [name]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Customer Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={customerData.address}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={customerData.city}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">State</label>
          <input
            type="text"
            name="state"
            value={customerData.state}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={customerData.zipCode}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
