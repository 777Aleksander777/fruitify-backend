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
    provider: 'supabase',
    providerOptions: {
      apiUrl: env('SUPABASE_API_URL'),
      apiKey: env('SUPABASE_API_KEY'),
      bucket: env('SUPABASE_BUCKET'),
      directory: env('SUPABASE_DIRECTORY', 'uploads'), // Opcjonalnie
      options: {}, // Możesz dodać dodatkowe opcje, np. kontrolę uprawnień
    },
  },
});
