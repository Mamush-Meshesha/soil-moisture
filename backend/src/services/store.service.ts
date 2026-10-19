import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';
import { db } from '../db';

export class StoreService {
  async getProducts(category?: string) {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    query += ' ORDER BY price DESC';

    const products = await db.all<any>(query, params);
    return products.map((p) => ({
      ...p,
      specs: JSON.parse(p.specs_json || '{}'),
      inStock: Boolean(p.in_stock),
    }));
  }

  async getProductBySlug(slug: string) {
    const product = await db.get<any>('SELECT * FROM products WHERE slug = ?', [slug]);
    if (!product) {
      const err: any = new Error('Product not found.');
      err.statusCode = 404;
      throw err;
    }

    return {
      ...product,
      specs: JSON.parse(product.specs_json || '{}'),
      inStock: Boolean(product.in_stock),
    };
  }

  async checkout(data: any) {
    const { customerEmail, customerName, shippingAddress, items, totalAmount } = data;
    if (!customerEmail || !customerName || !shippingAddress || !items || !Array.isArray(items)) {
      const err: any = new Error('Customer email, name, shipping address, and items are required.');
      err.statusCode = 400;
      throw err;
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
    return {
      order: {
        ...order,
        shippingAddress: JSON.parse(order.shipping_address_json),
        items: JSON.parse(order.items_json),
      },
      paymentMode: 'SANDBOX_TEST_INTEGRATION',
      message: 'Hardware order successfully registered in test sandbox environment.',
    };
  }

  async getOrderById(id: string) {
    const order = await db.get<any>('SELECT * FROM orders WHERE id = ?', [id]);
    if (!order) {
      const err: any = new Error('Order not found.');
      err.statusCode = 404;
      throw err;
    }

    return {
      ...order,
      shippingAddress: JSON.parse(order.shipping_address_json),
      items: JSON.parse(order.items_json),
    };
  }
}

export const storeService = new StoreService();
export default storeService;
