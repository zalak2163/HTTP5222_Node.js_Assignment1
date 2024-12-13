// netlify-functions/admin.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Admin endpoint reached" }),
  };
};
