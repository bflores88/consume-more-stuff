exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('itemImages')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('itemImages').insert([
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559248281213', item_id: 1 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559248347928', item_id: 1 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559248406963', item_id: 1 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559248487173', item_id: 2 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559248574563', item_id: 2 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559248662779', item_id: 2 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559248757761', item_id: 3 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559248840284', item_id: 4 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559248943265', item_id: 5 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559249011539', item_id: 5 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559249089980', item_id: 6 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559249184028', item_id: 7 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559249274718', item_id: 8 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559249475654', item_id: 9 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559249666673', item_id: 10 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559249727875', item_id: 11 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559249786412', item_id: 12 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559263164246', item_id: 13 },  
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559263025312', item_id: 14 },
        { imageLink: "https://savannah-images.s3.us-west-2.amazonaws.com/1559264340747", item_id: 15 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559264416160', item_id: 16 },
        { imageLink: 'https://savannah-images.s3.us-west-2.amazonaws.com/1559264540392', item_id: 17 },
        { imageLink: "https://savannah-images.s3.us-west-2.amazonaws.com/1559264642294", item_id: 18 },
        { imageLink: "https://savannah-images.s3.us-west-2.amazonaws.com/1559265265055", item_id: 19 },
        { imageLink: "https://savannah-images.s3.us-west-2.amazonaws.com/1559265710362", item_id: 20 },
        { imageLink: "https://savannah-images.s3.us-west-2.amazonaws.com/1559265999607", item_id: 21 },
        { imageLink: "https://savannah-images.s3.us-west-2.amazonaws.com/1559266536182", item_id: 22 },
        { imageLink: "https://savannah-images.s3.us-west-2.amazonaws.com/1559266853736", item_id: 23 },
        { imageLink: "https://savannah-images.s3.us-west-2.amazonaws.com/1559267241357", item_id: 24 }
      ]);
    });
};
