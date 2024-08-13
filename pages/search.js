// import { useRouter } from 'next/router'
// import { useContext } from 'react';
// import { Store }

// const page = 2;

// const note = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// export default function Search(props) {
//     const router = useRouter()

//     const { title = 'all', fullplot = 'all', rated = 'all', year = 'all', type = 'all' } = router.query;

//     const { titles, fullplots, rateds, years, types } = props

//     const filterSearch = ({
//         title, fullplot, rated, year, type,
//     }) => {
//         const { query } = router
//         if (title) query.title = title;
//         if (fullplot) query.fullplot = fullplot;
//         if (rated) query.rated = rated;
//         if (year) query.year = year;
//         if (type) query.type = type;

//         router.push({
//             pathname: router.pathname,
//             query: query,
//         })
//     }

//     const titleHandler = (e) => {
//         filterSearch({title: e.target.value})
//     };
//     const fullplotHandler = (e) => {
//         filterSearch({fullplot: e.target.value})
//     };
//     const ratedHandler = (e) => {
//         filterSearch({rated: e.target.value})
//     };
//     const yearHandler = (e) => {
//         filterSearch({year: e.target.value})
//     };
//     const typeHandler = (e) => {
//         filterSearch({type: e.target.value})
//     };
// }