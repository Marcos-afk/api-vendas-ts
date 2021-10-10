import { Request, Response } from 'express';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import ListProductsService from '../../../services/ListProductsService';
import ShowProductService from '../../../services/ShowProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import { container } from 'tsyringe';

export default class ProductsControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);
    const products = await listProducts.execute();
    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showProduct = container.resolve(ShowProductService);
    const product = await showProduct.execute({ id });
    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, amount, description } = req.body;
    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute({
      name,
      price,
      amount,
      description,
    });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price, amount, description } = req.body;
    const updateProduct = container.resolve(UpdateProductService);
    const product = await updateProduct.execute({
      id,
      name,
      price,
      amount,
      description,
    });

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id });

    return res.json([]);
  }
}
