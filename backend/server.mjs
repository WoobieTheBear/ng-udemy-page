import express from 'express';
import cors from 'cors';
import { DataController } from './controllers/data-controller.mjs';
import { RecipeController } from './controllers/recipe-controller.mjs';
import routes from './router.mjs';

const app = express();
const port = process.argv[2] || 9001;

const dataController = new DataController();
const recipeController = new RecipeController();

// [middleware] for all requests
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))

// routes
app.use('/', routes(dataController, recipeController))

// the port you want to use
app.listen(port);

console.log(`App is running on port ${port}`);

