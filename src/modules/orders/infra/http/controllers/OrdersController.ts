import { Request, Response } from 'express';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';
import { container } from 'tsyringe';
import ListOrdersService from '../../../services/ListOrdersService';

export default class OrdersControllers {
  public async get(req: Request, res: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrdersService);
    const orders = await listOrders.execute();
    return res.json(orders);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showOrder = container.resolve(ShowOrderService);
    const order = await showOrder.execute({ id });
    return res.json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = container.resolve(CreateOrderService);
    const order = await createOrder.execute({ customer_id, products });
    return res.json(order);
  }
}
