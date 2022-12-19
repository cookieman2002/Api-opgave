import ItemModel from "../../models/ItemModel.js";
import { unlink } from "node:fs/promises";
import { Schema } from "mongoose";

export default async function updateItems(req, res) {
  try {
    let document = {};
    let oldResult;
    if (!req.file) {
      document = { ...req.body };
    } else {
      document = {
        ...req.body,
        image: { ...req.file },
      };
      const oldResult = await ItemModel.findById(req.params.id);
      await unlink(oldResult.image.path);
    }

    const result = await ItemModel.findByIdAndUpdate(req.params.id, document, {
      returnOriginal: false,
    });

    res.status(200);
    res.json(result);
    res.end();
  } catch (error) {
    console.log(error);
    res.status(500);
    res.end();
  }
}