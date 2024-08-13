// "use client";
// import React from "react";
// import { Pagination, PaginationItem } from "@mui/material";
// import { useSearchParams } from "next/navigation";


// export default function CollectionsPagination({ movies }) {
// const searchParams = useSearchParams();
// const page = parseInt(searchParams.get("page"), 10) || 1;
// const totalCount = products; // Replace with the actual total count of collections
// const itemsPerPage = 24;
// const totalPages = Math.ceil(totalCount / itemsPerPage);
// return (
//   <div
//    style={{
//     margin: "0 auto",
//     position: "fixed",
//     bottom: 0,
//     background: "#1e1e1e",
//     width: "100vw",
//     padding: "1rem",
//    }}
//   >
//    <Pagination
//     page={page}
//     count={totalPages}
//     sx={{
//      "> ul": {
//       justifyContent: "center",
//      },
//      "* li": {
//       color: "#fff",
//       "> div": {
//        color: "#fff",
//       },
//      },
//      mx: "auto",
//     }}
//     defaultPage={1}
//     showLastButton
//     showFirstButton
//     shape="rounded"
//     renderItem={(item) => {
//      return (
//       <PaginationItem
//        sx={{ color: "#fff" }}
//        component="a"
//        href={`${process.env.CLIENT_URI}?page=${item.page}`}
//        {...item}
//       />
//      );
//     }}
//    />
//   </div>
// );
// }