exports.productList = (req, res, next) => {
    let products = req.app.locals.products;
    
    res.render(
            'index',
            { 
                data: products
            }
        );
}