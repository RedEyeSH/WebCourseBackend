import { addCat, findCatById, listAllCats, modifyCat, removeCat, findCatByOwnerId } from "../models/cat-model.js";

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);
  if (result) {
    res.status(200);
    res.json({ message: 'Cat item updated.', result });
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);
  if (result) {
    res.status(200);
    res.json({ message: 'Cat item deleted.' });
  } else {
    res.sendStatus(404);
  }
};

const getCatByOwnerId = async (req, res) => {
  const result = await findCatByOwnerId(req.params.id);
  if (result) {
    res.status(200);
    res.json(result);
  } else {
    res.sendStatus(404);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatByOwnerId};
