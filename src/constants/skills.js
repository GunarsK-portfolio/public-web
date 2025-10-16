// Skill category configuration
export const SKILL_CATEGORY_CONFIG = {
  Frontend: { tagType: 'info', order: 1 },
  Backend: { tagType: 'success', order: 2 },
  'DevOps & Tools': { tagType: 'warning', order: 3 },
  Practices: { tagType: 'default', order: 4 },
  'Additional Languages': { tagType: 'info', order: 5 },
  'Data & Analytics': { tagType: 'success', order: 6 },
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
