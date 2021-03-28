import React,{useState} from 'react';
import { useHistory } from "react-router-dom";
import SearchData from './SearchData'

function SearchBar() { 

    const [searchKey, setSearchKey] = useState('')
    console.log(searchKey);
    let history = useHistory();
    const dataRender=() =>{
        // return <Route exact path={`/search/:${searchKey}`} component={SearchData} />
        history.push(`/search/${searchKey}`)
    }
	return (
     <>
        <form action="" className="searchbar-style mt-5 mb-5">
            <div className="input-group">
                <input type="text" value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} className="form-control" placeholder="Search by keyword" />
                <span className="input-group-btn">
                    <button className="btn" type="submit" onClick={dataRender}>Search</button>
                </span>
            </div>
        </form>
     </>
    )
}

export default SearchBar;