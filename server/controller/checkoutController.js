
const mockDatabase = [];

export const checkoutController = async (req, res) => {
  try {
    const { name, email, address, paymentMethod, items, shipping, total } = req.body;

    if (!name || !email || !address || !paymentMethod || !items || !total) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const order = {
      name,
      email,
      address,
      paymentMethod,
      items,
      shipping,
      total,
      createdAt: new Date()
    };

    // Save to mock database
    mockDatabase.push(order);

    return res.status(200).json({ success: true, message: 'Form submitted successfully (Mock DB)' });
  } catch (error) {
    console.error('Submission Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getMockData = (req, res) => {
  res.status(200).json({ success: true, data: mockDatabase });
};

export { mockDatabase };

// USING REAL DATABASE SYSTEM : 

// import Checkout from "../models/schema.js";
// const checkoutController = async (req, res) => {
//   try {
//     const { name, email, address, paymentMethod, items, shipping, total } = req.body;

//     if (!name || !email || !address || !paymentMethod || !items || !total) {
//       return res.status(400).json({ success: false, message: 'All fields are required.' });
//     }

//     const order = new Checkout({ name, email, address, paymentMethod, items, shipping, total });
//     await order.save();

//     return res.status(200).json({ success: true, message: 'Form submitted successfully' });
//   } catch (error) {
//     console.error('Submission Error:', error);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// export default checkoutController;
