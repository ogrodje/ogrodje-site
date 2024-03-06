export enum Role {
  hosted = "hosted",
  cohosted = "cohosted",
  starred = "starred",
  produced = "produced",
  designed = "designed",
  consulted = "consulted"
}

export const ALL_ROLES: Role[] = Object.keys(Role) as Role[]

const SI_ROLES: Map<Role, string> = new Map([
  [Role.hosted, "Host"],
  [Role.cohosted, "Co-host"],
  [Role.starred, "Gost"],
  [Role.produced, "Producent"],
  [Role.designed, "Oblikovalec"],
  [Role.consulted, "Svetovalec"],
])

export const localiseRole = (role: Role): string => {
  return SI_ROLES.get(role) || `x ${role}`
}
