// const aws = require('aws-sdk');

// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   region: 'us-west-2',
// });

// const s3 = new aws.S3();

// const params = {
//   Bucket: 'savannah-images',
//   Key: 'fileName',
// };
// const remove = s3.deleteObject(params, function(err, data) {
//   // error
//   if (err) {
//     console.log(err, err.stack);
//   }
//   // success
//   else {
//     console.log(data);
//   }
// });

// // try something like the following:

// // const ItemImage = require('../database/models/ItemImage');

// // module.exports = function(req, res, next) {
// //   ItemImage.where({ id: req.params.id })
// //     .fetch()
// //     .then((result) => {
// //       const itemImage = result.toJSON().fileName;
// //       // if in s3 bucket
// //       if (itemImage==='isFound') {
// //         return next();
// //       // if not
// //       } else {
// //         return res.redirect('standard deletion');
// //       }
// //     });
// // };

// module.exports = remove;
