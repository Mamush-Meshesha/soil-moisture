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

  async createProduct(data: any) {
    const { name, category = 'Equipment', price = 0, description = '', specs = {}, imageUrl = '/images/portable-kit-system.jpg', stockQty = 50, inStock = 1 } = data;
    if (!name) {
      const err: any = new Error('Product name is required');
      err.statusCode = 400;
      throw err;
    }

    const slug = data.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(100 + Math.random() * 900);

    const product = await prisma.product.create({
      data: {
        slug,
        name,
        category,
        price: parseFloat(price) || 0,
        description,
        specsJson: typeof specs === 'string' ? specs : JSON.stringify(specs),
        imageUrl,
        inStock: inStock ? 1 : 0,
        stockQty: parseInt(stockQty, 10) || 0,
      },
    });

    return {
      ...product,
      specs: JSON.parse(product.specsJson || '{}'),
      inStock: Boolean(product.inStock),
    };
  }

  async updateProduct(id: string, data: any) {
    const existing = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!existing) {
      const err: any = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.price !== undefined) updateData.price = parseFloat(data.price) || 0;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.specs !== undefined) {
      updateData.specsJson = typeof data.specs === 'string' ? data.specs : JSON.stringify(data.specs);
    }
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.inStock !== undefined) updateData.inStock = data.inStock ? 1 : 0;
    if (data.stockQty !== undefined) updateData.stockQty = parseInt(data.stockQty, 10) || 0;

    const updated = await prisma.product.update({
      where: { id: existing.id },
      data: updateData,
    });

    return {
      ...updated,
      specs: JSON.parse(updated.specsJson || '{}'),
      inStock: Boolean(updated.inStock),
    };
  }

  async deleteProduct(id: string) {
    const existing = await prisma.product.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!existing) {
      const err: any = new Error('Product not found');
      err.statusCode = 404;
      throw err;
    }

    await prisma.product.delete({ where: { id: existing.id } });
    return { success: true, message: 'Product deleted successfully' };
  }
}

export const storeService = new StoreService();
export default storeService;

