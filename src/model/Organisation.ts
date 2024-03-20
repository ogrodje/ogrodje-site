import slugify from "@sindresorhus/slugify";

export interface Organisation {
  id: string
  name: string
  avatar: { url: string }
  bio?: string
}

export const organisationPath = (organisation: Organisation): string => slugify(organisation.name)
