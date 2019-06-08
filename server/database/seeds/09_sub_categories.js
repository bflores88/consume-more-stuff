exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sub_categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('sub_categories').insert([
        { sub_category_name: 'T.V', category_id: 1 }, // 1
        { sub_category_name: 'Cellphone', category_id: 1 }, // 2
        { sub_category_name: 'Shoes', category_id: 2 }, // 3
        { sub_category_name: 'Shirts', category_id: 2 }, // 4
        { sub_category_name: 'Books', category_id: 3 }, // 5
        { sub_category_name: 'E-Books', category_id: 3 }, // 6
        { sub_category_name: 'Home Audio', category_id: 1 }, // 7
        { sub_category_name: 'Pants', category_id: 2 }, // 8
        { sub_category_name: 'Magazines', category_id: 3 }, // 9
        { sub_category_name: 'Action', category_id: 4 }, // 10
        { sub_category_name: 'Adventure', category_id: 4 }, // 11
        { sub_category_name: 'Comedy', category_id: 4 }, // 12
        { sub_category_name: 'Baby Food', category_id: 5 }, // 13
        { sub_category_name: 'Beverages', category_id: 5 }, // 14
        { sub_category_name: 'Produce', category_id: 5 }, // 15
      ]);
    });
};
