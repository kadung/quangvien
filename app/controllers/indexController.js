const fetchSpreadSheet = require('../services/google-spreadsheet');

exports.homepage = (req, res, next) => {
    const products = req.app.locals.products.filter(product => product.isAtHomePage == true);

    res.render(
        'index', 
        { 
            categories: req.app.locals.categories,
            products: products
        }
    );
}

exports.about = (req, res, next) => {
    res.render('about');
}

exports.contact = (req, res, next) => {
    res.render('contact');
}

exports.refresh = async (req, res, next) => {
    req.app.locals.categories = await fetchSpreadSheet("1813434113");
    req.app.locals.products = await fetchSpreadSheet("0");

    res.render('index', { categories: req.app.locals.categories });
}