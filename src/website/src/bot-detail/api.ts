export async function getStories() {
  const stories = await fetch('/api/ows/authors')
  return stories
}
