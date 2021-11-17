export interface NavBarHandler {
  transitionNavBarHandler: () => void; 
}

export interface RowProp {
  title: string,
  fetchUrl: string
  isLargeRow?: boolean
}

