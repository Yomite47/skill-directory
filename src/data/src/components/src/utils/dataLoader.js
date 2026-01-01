// Utility to load skills data
import skillsData from '../data/skills.json';

export function getAllSkills() {
  return skillsData.skills;
}

export function getSkillBySlug(slug) {
  return skillsData.skills.find(skill => skill.slug === slug);
}

export function getAllSlugs() {
  return skillsData.skills.map(skill => ({
    params: { slug: skill.slug }
  }));
}