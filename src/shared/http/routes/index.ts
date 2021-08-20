/*Declaração de variáveis */
import productsRoute from '@modules/product/Routes/ProductsRoutes';
import { Router } from 'express';

const Routes = Router();

Routes.use('/produtos', productsRoute);

export default Routes;
