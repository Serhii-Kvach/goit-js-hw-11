export const fetchImages = query => {
  const searchParams = new URLSearchParams({
    key: '21607463-49e6315ec3819cd7ca780513d',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  });
};
