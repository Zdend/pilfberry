export const BASE_KEYWORDS = 'vegetarian restaurants in sydney, gluten free restaurants, dairy free restaurants, vegan restaurants in sydney';
export const BASE_DESCRIPTION = 'Pilfberry helps people with special dieatary requirements find their next meal.';
export const BASE_TITLE = 'Find your next meal';

export const getTitle = title => `${title || BASE_TITLE} | Pilfberry`;
export const getDescription = description => `${description || ''} ${!description || description.length < 50 ? BASE_DESCRIPTION : ''}`;
export const getKeywords = keywords => `${keywords || ''} ${!keywords || keywords.length < 50 ? BASE_KEYWORDS : ''}`;
