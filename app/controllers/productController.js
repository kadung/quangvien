const mailjet = require('../services/mailjet');
const spreadsheet = require('../services/google-spreadsheet');

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
    console.log(req.app.locals.categories)
    const {page = 1} = req.query;
    const categoryId = req.params.categoryId;
    const categories = req.app.locals.categories;
    const currentCategory = categories.find(cat => cat.id == categoryId)
    const productsInCategory = req.app.locals.products.filter(product => product.categoryId == categoryId);
    const productsInCategoryPagination = productsInCategory.slice((page - 1) * PageSize, page * PageSize);

    res.render(
        'categories', 
        {
            currentCategory: currentCategory,
            categories: categories,
            currentPage: page,
            maxPage: Math.ceil(productsInCategory.length / PageSize),
            products: productsInCategoryPagination
        }
    );
}

exports.callBack = async (req, res, next) => {
    // Send email
    if (!req.body.phoneNumber){
        return res.send({
            status: 'Server error',
            errors: 'No phone number is sent.'
        })
    }

    // Save to excel
    await spreadsheet.saveData(req.body.phoneNumber, req.body.product)
    
    const mailResult = await mailjet.sendCallbackEmail(req.body.phoneNumber);
    res.send({
        ...mailResult,
        errors: ''
    });
}

exports.search = (req, res, next) => {
    const {page = 1, q} = req.query;
    const productsInSearch = req.app.locals.products.filter(product => product.slug.includes(q));
    const productsPagination = productsInSearch.slice((page - 1) * PageSize, page * PageSize);

    res.render(
        'search', 
        {
            searchKey: q,
            categories: req.app.locals.categories,
            currentPage: page,
            maxPage: Math.ceil(productsInSearch.length / PageSize),
            products: productsPagination
        }
    );
}