import React, {useEffect, useState } from 'react';
import { Loader, Card, FormField } from '../components';
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from '../redux/postsSlice';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  
  useEffect(()=>{
    let getData = setTimeout(() => {
      if (postsStatus === 'idle') {
        dispatch(fetchPosts())
    }
      }, 0)
    return () => clearTimeout(getData)
  },[])

  let content;
  if (postsStatus === 'loading') {
      content = <div className="flex justify-center items-center">
        <Loader />
      </div>;
  } else if (postsStatus === 'succeeded') {
            content = posts.map((post) => <Card key={post._id} {...post} />)
  } else if (postsStatus === 'failed') {
      content = <p>{error}</p>;
  }
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = content.filter((item) => item.props.name.toLowerCase().includes(searchText.toLowerCase()) || item.props.prompt.toLowerCase().includes(searchText.toLowerCase()));
        console.log(searchText)
        console.log(searchResult)
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="sm:w-screen p-4">
       <div >
        <h1 className="font-extrabold text-white text-[32px]">Gallery</h1>
        <p className="mt-2 text-[#e5e8eb] text-[14px] max-w-[500px]">Generate visually stunning images with the DALL-E AI API and add them to the collection.</p>
      </div>

      <div className="mt-10">
        <FormField 
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {searchText && (
          <h2 className="font-medium text-[#666e75] text-xl mb-3">
            Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
          </h2>
        )}
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
          {searchText ? (
              <>{searchedResults}</>
            ) : ( 
              <>{content}</>
          )}
        </div>
      </div>
    </section>
  )
}

export default Home


////////////////////////////////////////////////////////////////////////////////////

// import React, {useState, useEffect } from 'react';
// import { Loader, Card, FormField } from '../components';

// const RenderCards = ({ data, title }) => {
//   if (data?.length > 0) {
//     return (
//       data.map((post) => <Card key={post._id} {...post} />)
//     );
//   }
//   return (
//     <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
//   );
// };

// const Home = () => {
//   const [loading, setLoading] = useState(false);
//   const [allPosts, setAllPosts] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [searchedResults, setSearchedResults] = useState(null);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       //const response = await fetch('https://bit-pic.herokuapp.com/api/v1/post', {
      
//       // dev
//       const response = await fetch('http://localhost:4000/api/v1/post', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       if (response.ok) {
//         const result = await response.json();
//         setAllPosts(result.data.reverse());
//       }
//     } catch (err) {
//       alert(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleSearchChange = (e) => {
//     clearTimeout(searchTimeout);
//     setSearchText(e.target.value);

//     setSearchTimeout(
//       setTimeout(() => {
//         const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
//         setSearchedResults(searchResult);
//       }, 500),
//     );
//   };

//   return (
//     <section className='sm:p-8 '>
//        <div>
//         <h1 className="font-extrabold text-white text-[32px]">Gallery</h1>
//         <p className="mt-2 text-[#e5e8eb] text-[14px] max-w-[500px]">Generate visually stunning images with the DALL-E AI API and add them to the collection.</p>
//       </div>

//       <div className="mt-10">
//         <FormField 
//           labelName="Search posts"
//           type="text"
//           name="text"
//           placeholder="Search something..."
//           value={searchText}
//           handleChange={handleSearchChange}
//           />
//       </div>
//       <div className="mt-10">
//         {loading ? (
//           <div className="flex justify-center items-center">
//             <Loader />
//           </div>
//         ) : (
//           <>
//             {searchText && (
//               <h2 className="font-medium text-[#666e75] text-xl mb-3">
//                 Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
//               </h2>
//             )}
//             <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
//               {searchText ? (
//                 <RenderCards
//                   data={searchedResults}
//                   title="No Search Results Found"
//                 />
//               ) : (
//                 <RenderCards
//                   data={allPosts}
//                   title="No Posts Found"
//                 />
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   )
// }

// export default Home