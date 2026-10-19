import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';

const router = Router();

// GET all products
router.get('/products', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    query += ' ORDER BY price DESC';

    const products = await db.all<any>(query, params);
    const parsed = products.map((p) => ({
      ...p,
      specs: JSON.parse(p.specs_json || '{}'),
      inStock: Boolean(p.in_stock),
    }));

    return res.json({ products: parsed });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to retrieve products.' });
  }
});

// GET product by slug
router.get('/products/:slug', async (req: Request, res: Response) => {
  try {
    const product = await db.get<any>('SELECT * FROM products WHERE slug = ?', [req.params.slug]);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    return res.json({
      product: {
        ...product,
        specs: JSON.parse(product.specs_json || '{}'),
        inStock: Boolean(product.in_stock),
      },
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to retrieve product details.' });
  }
});

// POST /api/store/checkout - Sandbox / Test Checkout
router.post('/checkout', async (req: Request, res: Response) => {
  try {
    const { customerEmail, customerName, shippingAddress, items, totalAmount } = req.body;
    if (!customerEmail || !customerName || !shippingAddress || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Customer email, name, shipping address, and items are required.' });
    }

    const orderId = `TS-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const paymentRef = `SANDBOX-PAY-${uuidv4().slice(0, 8).toUpperCase()}`;

    await db.run(
      `INSERT INTO orders (id, customer_email, customer_name, total_amount, status, shipping_address_json, items_json, payment_reference)
       VALUES (?, ?, ?, ?, 'CONFIRMED', ?, ?, ?)`,
      [
        orderId,
        customerEmail.trim(),
        customerName.trim(),
        parseFloat(totalAmount) || 0,
        JSON.stringify(shippingAddress),
        JSON.stringify(items),
        paymentRef,
      ]
    );

    const order = await db.get('SELECT * FROM orders WHERE id = ?', [orderId]);
    return res.status(201).json({
      order: {
        ...order,
        shippingAddress: JSON.parse(order.shipping_address_json),
        items: JSON.parse(order.items_json),
      },
      paymentMode: 'SANDBOX_TEST_INTEGRATION',
      message: 'Hardware order successfully registered in test sandbox environment.',
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return res.status(500).json({ error: 'Failed to process hardware order.' });
  }
});

// GET /api/store/orders/:id - Lookup order
router.get('/orders/:id', async (req: Request, res: Response) => {
  try {
    const order = await db.get<any>('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    return res.json({
      order: {
        ...order,
        shippingAddress: JSON.parse(order.shipping_address_json),
        items: JSON.parse(order.items_json),
      },
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to retrieve order.' });
  }
});

export default router;
