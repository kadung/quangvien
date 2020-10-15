const PageSize = 5;

exports.productDetail = (req, res, next) => {
    const productId = req.params.productId;
    const product = req.app.locals.products.find(product => product.id == productId);
    
    res.render(
        'product-detail',
        {
            categories: req.app.locals.categories,
            product: product
        }
    );
}

exports.productCategory = (req, res, next) => {
    const {page = 1} = req.query;
    const categoryId = req.params.categoryId;
    const categories = req.app.locals.categories;
    const currentCategory = categories.find(cat => cat.id == categoryId)
    const productsInCategory = req.app.locals.products.filter(product => product.categoryId == categoryId);
    const productsPagination = productsInCategory.slice((page - 1) * PageSize, page * PageSize);

    res.render(
        'categories', 
        {
            currentCategory: currentCategory,
            categories: categories,
            currentPage: page,
            maxPage: Math.ceil(productsInCategory.length / PageSize),
            products: productsPagination
        }
    );
}
