const paginate = (model) => async (req, res, next) => {
  console.log('paginate -> model', model);
  const page = parseInt(req.query.page, 10) || 1;
  const size = parseInt(req.query.size, 10) || 10;

  const startIndex = page === 1 ? 0 : (page - 1) * size;
  const allItems = await model.find();

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
      const items = await model.find().limit(size).skip(startIndex);
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
