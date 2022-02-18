import mongoose from 'mongoose';
// TODO add sortby
const paginate = (model, findBy) => async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const size = parseInt(req.query.size, 10) || 10;

  const startIndex = page === 1 ? 0 : (page - 1) * size;

  let query = {};
  if (findBy) {
    query = { [findBy]: mongoose.Types.ObjectId(req.params.id) };
  }
  const allItems = await model.find(query);

  try {
    if (allItems.length === 0) {
      res.paginatedResult = {
        items: [],
        pageInfo: {},
      };
      next();
    }

    const paginatedResult = {
      items: allItems,
      pageInfo: {
        page,
        size,
        totalItems: allItems.length,
        totalPages: Math.ceil(allItems.length / size) || 1,
      },
    };

    if (startIndex < allItems.length) {
      const items = await model.find(query).limit(size).skip(startIndex);
      paginatedResult.items = items;
    } else {
      paginatedResult.items = [];
    }

    res.paginatedResult = paginatedResult;
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default paginate;
