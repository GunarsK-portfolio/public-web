// Skill category configuration
export const SKILL_CATEGORY_CONFIG = {
  Frontend: { tagType: 'default', order: 1 },
  Backend: { tagType: 'default', order: 2 },
  'DevOps & Tools': { tagType: 'default', order: 3 },
  Practices: { tagType: 'default', order: 4 },
  'Additional Languages': { tagType: 'default', order: 5 },
  'Data & Analytics': { tagType: 'default', order: 6 },
}

// Extract category names for dropdowns/selects
export const SKILL_CATEGORIES = Object.keys(SKILL_CATEGORY_CONFIG)

// Helper function to get tag type for a category
export const getCategoryTagType = (category) => {
  return SKILL_CATEGORY_CONFIG[category]?.tagType || 'default'
}

// Helper function to get category order
export const getCategoryOrder = (category) => {
  return SKILL_CATEGORY_CONFIG[category]?.order || 999
}
