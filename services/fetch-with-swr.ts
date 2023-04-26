 const fetchData = (url : string) => fetch(url).then((res) => res.json());

 export default fetchData;