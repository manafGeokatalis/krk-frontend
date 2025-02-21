export interface MenuItem {
  path: string,
  label: string,
  iconDefault: React.FC<{}>
  iconActive: React.FC<{}>
}

export interface ListMenuItem {
  path: string,
  label: string,
}