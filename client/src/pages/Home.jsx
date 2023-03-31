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
    <section className=" p-4">
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
