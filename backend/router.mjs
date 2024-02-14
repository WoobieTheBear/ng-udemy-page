import express from 'express';

const router = express.Router();

export default function routes( dataController, recipeController ) {
    router.get('/data', dataController.readAll.bind(dataController));
    router.post('/data', dataController.writeOne.bind(dataController));
    
    router.get('/recipes', recipeController.readAll.bind(recipeController));
    router.post('/recipes', recipeController.writeMany.bind(recipeController));
    router.delete('/recipes/:id', recipeController.deleteById.bind(recipeController));

    return router;
}