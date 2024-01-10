import { Pagination, Theme } from "@mui/material";

interface PageNavProps {
    count: number,
}
  

export const PageNav = ({ count }: PageNavProps) => {
    return(
        <Pagination count={count} size="small" color="primary" />
    )
}

export default PageNav;