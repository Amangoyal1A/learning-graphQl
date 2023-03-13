import React from "react";
import { GET_ALL_QUOTES } from "../Graphqloperations/queries";
import { useQuery } from "@apollo/client";
export default function Home() {
  //traditional method
  // React.useEffect(()=>{

  //     fetch('http://localhost:4000',
  //     {
  //         method:"post",
  //         headers:{
  //             "content-Type":"application/json"
  //         },
  //         body:JSON.stringify({
  //             query:`query getAllQuotes{
  //                 quotes{
  //                   quote
  //                 }
  //               }`
  //         })
  //     }).then((res)=>res.json()).then(data=>console.log(data))
  // },[])

  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) {
    return <h1>loading</h1>;
  }
  if (error) {
   console.log(error.message)
  }


  return (
    <div className="container">
        {
            data.quotes.map(quotes=>{
              return  <blockquote>
                <h6>{quotes.quote}</h6>
                <p className="right-align">~ram</p>
              </blockquote>
            })
        }
      <blockquote>
        <h6>if it works dont touch it</h6>
        <p className="right-align">~ram</p>
      </blockquote>
      <blockquote>
        <h6>if it works dont touch it</h6>
        <p className="right-align">~ram</p>
      </blockquote>
    </div>
  );
}
