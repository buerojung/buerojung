import project from './project'
import category from './category'
import service from './service'
import settings from './settings'

export const schemaTypes = [project, category, service, settings]
export const schema = { types: schemaTypes }