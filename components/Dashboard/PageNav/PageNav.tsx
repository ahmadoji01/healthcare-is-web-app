import { Pagination, Theme } from "@mui/material";

interface PageNavProps {
    count: number,
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void,
}
  

export const PageNav = ({ count, handlePageChange }: PageNavProps) => {
    return(
        <Pagination count={count} onChange={handlePageChange} size="small" color="primary" />
    )
}

export default PageNav;