import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

// Settings Query
export const settingsQuery = groq`*[_type == "settings"][0]`

// Projects Queries
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(date desc) {
    _id,
    title,
    slug,
    client,
    category->{title, slug},
    date,
    mainImage,
    description
  }
`

export const allProjectsQuery = groq`
  *[_type == "project"] | order(date desc) {
    _id,
    title,
    slug,
    client,
    category->{title, slug},
    date,
    mainImage,
    description,
    featured
  }
`

export const projectsByCategoryQuery = groq`
  *[_type == "project" && category->slug.current == $categorySlug] | order(date desc) {
    _id,
    title,
    slug,
    client,
    category->{title, slug},
    date,
    mainImage,
    description
  }
`

// Categories Query
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`

// Services Query
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    description,
    icon,
    order
  }
`

// Fetch functions
export async function getSettings() {
  return await client.fetch(settingsQuery)
}

export async function getFeaturedProjects() {
  return await client.fetch(featuredProjectsQuery)
}

export async function getAllProjects() {
  return await client.fetch(allProjectsQuery)
}

export async function getProjectsByCategory(categorySlug: string) {
  return await client.fetch(projectsByCategoryQuery, { categorySlug })
}

export async function getCategories() {
  return await client.fetch(categoriesQuery)
}

export async function getServices() {
  return await client.fetch(servicesQuery)
}

