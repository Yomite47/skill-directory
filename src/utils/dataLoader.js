// Utility to load skills and sectors data
import skillsData from '../data/skills.json';
import sectorsData from '../data/sectors.json';

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

export function getAllSectors() {
  return sectorsData.sectors;
}

export function getSectorBySlug(slug) {
  return sectorsData.sectors.find(s => s.slug === slug);
}

export function getAllSectorSlugs() {
  return sectorsData.sectors.map(s => ({ params: { slug: s.slug } }));
}
