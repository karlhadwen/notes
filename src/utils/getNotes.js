const importAll = (r) => r.keys().map(r);
export const markdownFiles = importAll(
  require.context('../../notes', true, /\.md$/)
)
  .sort()
  .reverse();
