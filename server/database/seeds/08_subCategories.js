
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('subCategories').del()
    .then(function () {
      // Inserts seed entries
      return knex('subCategories').insert([
        {subCategoryName: 'T.V', category_id: 1},
        {subCategoryName: 'Cellphone', category_id: 1},
        {subCategoryName: 'Shoes', category_id: 2},
        {subCategoryName: 'Shirts', category_id: 2},
        {subCategoryName: 'Books', category_id: 3},
        {subCategoryName: 'E-Books', category_id: 3},
      ]);
    });
};
