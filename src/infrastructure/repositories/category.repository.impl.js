const CategoryModel = require('../models/category.model');
const CategoryRepository = require('../../domain/repositories/category.repository');

class CategoryRepositoryImpl extends CategoryRepository {
    async findOrCreate(name) {
        const [category] = await CategoryModel.findOrCreate({
            where: { name },
        });
        return category;
    }
}

module.exports = CategoryRepositoryImpl;