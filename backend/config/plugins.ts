// module.exports = ({ env }) => ({
//     upload: {
//       config: {
//         provider: '@strapi/provider-upload-aws-s3',
//         providerOptions: {
//           accessKeyId: env('SUPABASE_KEY'), // Supabase Service Key
//           secretAccessKey: env('SUPABASE_SECRET'), // Możesz użyć tego samego klucza
//           region: 'us-east-1', // Domyślna wartość (Supabase nie wymaga regionu)
//           endpoint: env('SUPABASE_URL') + '/storage/v1', // Twoje API Supabase
//           params: {
//             Bucket: env('SUPABASE_BUCKET'), // Nazwa Twojego zasobnika
//           },
//         },
//       },
//     },
//   });
module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: '@strapi/provider-upload-aws-s3',
        providerOptions: {
          s3Options: {
            accessKeyId: env('SUPABASE_KEY'), // Supabase Service Key
            secretAccessKey: env('SUPABASE_SECRET'), // Może być tym samym co SUPABASE_KEY
            region: 'us-east-1', // Supabase nie wymaga regionu, ale warto podać.
            endpoint: env('SUPABASE_URL') + '/storage/v1', // Twoje API Supabase
            params: {
              Bucket: env('SUPABASE_BUCKET'), // Nazwa zasobnika
            },
          },
        },
      },
    },
  });
  