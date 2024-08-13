export const parseJobListings = (comments) => {
  return comments.map(comment => {
    const { text, time, id } = comment;
    const company = extractCompany(text);
    const remote = isRemote(text);
    
    return {
      id,
      company,
      text,
      remote,
      date: new Date(time * 1000),
      url: `https://news.ycombinator.com/item?id=${id}`
    };
  });
};

const extractCompany = (text) => {
  const match = text.match(/^([^|]+)/);
  return match ? match[1].trim() : 'Unknown Company';
};

const isRemote = (text) => {
  return text.toLowerCase().includes('remote');
};