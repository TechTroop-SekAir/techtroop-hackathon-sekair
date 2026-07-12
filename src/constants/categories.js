export const CATEGORIES_CONFIG = [
    { value: 'all',     label: 'all'     ,color: 'gray' },
    { value: 'studies', label: 'Studies' ,color: 'blue'},
    { value: 'social',  label: 'Social'  ,color: 'teal'},
    { value: 'humor',   label: 'Humor'   ,color: 'grape'}
  ];

export const getCategoryColor = (categoryValue) => {
  if (!categoryValue) return 'gray';

  const cleanValue = categoryValue.toLowerCase().trim();
  const category = CATEGORIES_CONFIG.find(cat => cat.value === cleanValue);

  return category ? category.color : 'gray';
};