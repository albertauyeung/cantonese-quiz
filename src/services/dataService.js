// Dynamically import all JSON files from the data directory
const importAll = (r) => {
  return r.keys().reduce((acc, key) => {
    const data = r(key);
    acc[data.topic] = data;
    return acc;
  }, {});
};

// Import all JSON files from the data directory
const topicData = importAll(require.context('../data', false, /\.json$/));

export const getTopics = () => {
  return Object.entries(topicData).map(([name, data]) => ({
    name: data.topic,
    description: data.description
  }));
};

export const getQuestions = (topicName) => {
  const data = Object.values(topicData).find(data => data.topic === topicName);
  if (!data) {
    throw new Error(`Topic ${topicName} not found`);
  }
  return data.questions;
}; 