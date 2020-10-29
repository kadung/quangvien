const fetchSpreadSheet = require('../services/google-spreadsheet');
const mailjet = require('../services/mailjet');

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

exports.contactPost = async (req, res, next) => {
    const mailResult = await mailjet.sendContactEmail(req.body);
    return res.send({
        ...mailResult,
        errors: ''
    });
    
}

exports.refresh = async (req, res, next) => {
    req.app.locals.categories = await fetchSpreadSheet.fetchCategories();
    req.app.locals.products = await fetchSpreadSheet.fetchProducts();

    return res.render('index', { categories: req.app.locals.categories });
}