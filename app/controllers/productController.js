exports.productDetail = (req, res, next) => {
    console.log(req.app.locals.categories);
    const productId = req.params.productId;
    const product = req.app.locals.products.find(product => product.id == productId);
    console.log(product);
    
    res.render(
        'product-detail',
        {
            categories: req.app.locals.categories,
            product: product
        }
    );
}

exports.productCategory = (req, res, next) => {
    const categoryId = req.params.categoryId;
    const categories = req.app.locals.categories;
    const currentCategory = categories.find(cat => cat.id == categoryId)
    const products = req.app.locals.products.filter(product => product.categoryId == categoryId);

    res.render(
        'categories', 
        { 
            currentCategory: currentCategory,
            categories: categories,
            products: products
        }
    );
}
