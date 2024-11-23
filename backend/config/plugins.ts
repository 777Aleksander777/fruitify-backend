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
            accessKeyId: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleXNrc3pmd3pzZnBmamFtd3FiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTMxMDkzMSwiZXhwIjoyMDQ2ODg2OTMxfQ.aJVaXdB6CqVqz5zZaatkfIiHbU8D9R3RGkFkarfVNhE", // Supabase Service Key
            secretAccessKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleXNrc3pmd3pzZnBmamFtd3FiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTMxMDkzMSwiZXhwIjoyMDQ2ODg2OTMxfQ.aJVaXdB6CqVqz5zZaatkfIiHbU8D9R3RGkFkarfVNhE", // Może być tym samym co SUPABASE_KEY
            region: 'eu-central-1', // Supabase nie wymaga regionu, ale warto podać.
            endpoint: "https://feyskszfwzsfpfjamwqb.supabase.co/storage/v1", // Twoje API Supabase
            params: {
              Bucket: "Fruitify", // Nazwa zasobnika
            },
          },
        },
      },
    },
  });
  