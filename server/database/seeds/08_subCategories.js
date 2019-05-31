
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('subCategories').del()
    .then(function () {
      // Inserts seed entries
      return knex('subCategories').insert([
        {subCategoryName: 'T.V', category_id: 1}, // 1
        {subCategoryName: 'Cellphone', category_id: 1}, // 2
        {subCategoryName: 'Shoes', category_id: 2}, // 3
        {subCategoryName: 'Shirts', category_id: 2}, // 4
        {subCategoryName: 'Books', category_id: 3}, // 5 
        {subCategoryName: 'E-Books', category_id: 3}, // 6
        {subCategoryName: 'Home Audio', category_id: 1}, // 7
        {subCategoryName: 'Pants', category_id: 2}, // 8
        {subCategoryName: 'Magazines', category_id: 3}, // 9
        {subCategoryName: 'Action', category_id: 4}, // 10
        {subCategoryName: 'Adventure', category_id: 4}, // 11
        {subCategoryName: 'Comedy', category_id: 4}, // 12
        {subCategoryName: 'Baby Food', category_id: 5}, // 13
        {subCategoryName: 'Beverages', category_id: 5}, // 14
        {subCategoryName: 'Produce', category_id: 5} // 15
      ]);
    });
};
