// App.jsx (Main React File)
import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'Card'
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.address.trim()) errs.address = 'Address is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Payment method required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setMessage('');
      return;
    }
    setErrors({});

    const payload = {
      ...formData,
      items: [
        { name: 'Product A', price: 20 },
        { name: 'Product B', price: 15 }
      ],
      shipping: 5,
      total: 40
    };

    try {
      const res = await fetch('http://localhost:8080/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Form submitted successfully!');
        setFormData({ name: '', email: '', address: '', paymentMethod: 'Card' });
      } else {
        setMessage('Submission failed. Try again.');
      }
    } catch (error) {
      setMessage('An error occurred during submission.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Billing Address</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label><br />
          <input name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>

        <div>
          <label>Email</label><br />
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>

        <div>
          <label>Address</label><br />
          <input name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <div style={{ color: 'red' }}>{errors.address}</div>}
        </div>

        <div>
          <label>Pay Via</label><br />
          <input type="radio" name="paymentMethod" value="Card" checked={formData.paymentMethod === 'Card'} onChange={handleChange} /> Card
          <input type="radio" name="paymentMethod" value="UPI" checked={formData.paymentMethod === 'UPI'} onChange={handleChange} style={{ marginLeft: '1rem' }} /> UPI
          <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={formData.paymentMethod === 'Cash on Delivery'} onChange={handleChange} style={{ marginLeft: '1rem' }} /> Cash on Delivery
          {errors.paymentMethod && <div style={{ color: 'red' }}>{errors.paymentMethod}</div>}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Order Summary</h3>
          <p>Product A: $20.00</p>
          <p>Product B: $15.00</p>
          <p>Shipping: $5.00</p>
          <h4>Total: $40.00</h4>
        </div>

        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Proceed to Checkout</button>
      </form>

      {message && <div style={{ marginTop: '1rem', fontWeight: 'bold', color: message.includes('successfully') ? 'green' : 'red' }}>{message}</div>}
    </div>
  );
};

export default App;
