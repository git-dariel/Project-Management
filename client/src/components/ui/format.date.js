// Function to format the date into 'Month Day, Year' format
export const formatDate = (dateString) => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
