"use client"
import React, { useState ,useEffect} from 'react'

export default function News() {
const [Article,setArticle]=useState([])
const [articlenum ,setarticlenum]=useState(6)
console.log(Article)
useEffect(() => {
fetch(`https://saurav.tech/NewsAPI/top-headlines/category/business/us.json`).then(res=>res.json()).then(data=>setArticle(data.articles))
}, [])

  return (
<>

<div className="pb-5">
    {Article.slice(0,articlenum).map((news,index)=>(
     <div key={index} className="flex gap-4 m-2 mb-4 bg-white shadow rounded-xl">
        <a href={news.url} target='blank'>
            <img src={news.urlToImage} alt="" className='rounded-xl' />
            <div className="p-2">
                <h3  className='font-sans text-xs font-bold text-black text-start'>{news.author}</h3>
                <p className='font-sans text-xs text-black text-start' >{news.description}</p>
            </div>
        </a>
     </div>
    ))
    }
    
    <div className='flex mt-5 gap-x-6'>
    <button onClick={()=>{
      setarticlenum(articlenum - 6 )
    }} className='p-3 bg-black text-white'>previous</button>
    
    <button onClick={()=>{
      setarticlenum(articlenum + 6)
    }} className='p-3 bg-black text-white'>Next</button>
    </div>
    </div>
</>
  )
}

